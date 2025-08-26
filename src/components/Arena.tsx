import React, { useState, useEffect, useReducer, useCallback, useMemo, useRef } from 'react';
import { CombatState, RobotBuild, RobotState, GameMode } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import Robot from './Robot';
import Projectile from './Projectile';

interface ArenaProps {
  build1: RobotBuild;
  code1: string;
  build2: RobotBuild;
  code2: string;
  onCombatEnd: (winner: 'player1' | 'player2') => void;
  gameMode: GameMode;
}

const ARENA_WIDTH = 100;
const ARENA_HEIGHT = 100;
const TICK_RATE = 1000; // ms per game tick

const initialRobotState: Omit<RobotState, 'id' | 'build'> = {
    position: { x: -100, y: -100 },
    health: 0,
    maxHealth: 1,
    isShieldActive: false,
    isVisible: false,
    moduleCooldowns: { defense: 0, utility: 0 },
};

const initialCombatState: CombatState = {
    player: { ...initialRobotState, id: 'player', build: { chassis: null, weapon: null, defense: null, utility: null } },
    enemy: { ...initialRobotState, id: 'enemy', build: { chassis: null, weapon: null, defense: null, utility: null } },
    projectiles: [],
};


function combatReducer(state: CombatState, action: any): CombatState {
    switch (action.type) {
        case 'SPAWN': {
            const { target, build, position } = action.payload;
            const maxHealth = build.chassis?.stats?.Health as number || 1;
            const newRobotState = { ...state[target], build, position, maxHealth, health: maxHealth, isVisible: true, moduleCooldowns: { defense: 0, utility: 0 }};
            return { ...state, [target]: newRobotState };
        }
        case 'MOVE': {
            const { target, to } = action.payload;
            const clampedTo = {
                x: Math.max(5, Math.min(ARENA_WIDTH - 5, to.x)),
                y: Math.max(5, Math.min(ARENA_HEIGHT - 5, to.y))
            };
            return { ...state, [target]: { ...state[target], position: clampedTo } };
        }
        case 'SET_HEALTH': {
            const { target, health } = action.payload;
            return { ...state, [target]: { ...state[target], health: Math.max(0, health) } };
        }
        case 'SET_SHIELD_STATE': {
            const { target, isActive } = action.payload;
             return { ...state, [target]: { ...state[target], isShieldActive: isActive } };
        }
        case 'SET_MODULE_COOLDOWN': {
            const { target, moduleType, tick } = action.payload;
            const newCooldowns = { ...state[target].moduleCooldowns, [moduleType]: tick };
            return { ...state, [target]: { ...state[target], moduleCooldowns: newCooldowns }};
        }
        case 'ADD_PROJECTILE':
            return { ...state, projectiles: [...state.projectiles, action.payload.projectile] };
        case 'REMOVE_PROJECTILE':
            return { ...state, projectiles: state.projectiles.filter(p => p.id !== action.payload.id) };
        default:
            return state;
    }
}

const getSimpleAIAction = (robot: RobotState, enemy: RobotState): any => {
    const distance = Math.hypot(robot.position.x - enemy.position.x, robot.position.y - enemy.position.y);
    const attackRange = 40;
    const moveStep = 10;

    if (distance > attackRange) {
        const dx = enemy.position.x - robot.position.x;
        const dy = enemy.position.y - robot.position.y;
        const newX = robot.position.x + (dx / distance) * moveStep;
        const newY = robot.position.y + (dy / distance) * moveStep;
        return { type: 'MOVE', payload: { to: { x: newX, y: newY } } };
    } else {
        if (Math.random() > 0.3) { // 70% chance to fire
            return { type: 'FIRE', payload: { at: enemy.position } };
        } else { // 30% chance to move randomly
            const angle = Math.random() * 2 * Math.PI;
            const newX = robot.position.x + Math.cos(angle) * moveStep;
            const newY = robot.position.y + Math.sin(angle) * moveStep;
            return { type: 'MOVE', payload: { to: { x: newX, y: newY } } };
        }
    }
};

export const Arena: React.FC<ArenaProps> = ({ build1, code1, build2, code2, onCombatEnd, gameMode }) => {
    const { t } = useTranslation();
    const [log, setLog] = useState<string[]>([]);
    const [combatState, dispatch] = useReducer(combatReducer, initialCombatState);
    const [isFinished, setIsFinished] = useState(false);
    const [gameTick, setGameTick] = useState(0);

    const player1Name = useMemo(() => t('player_number', { num: 1 }), [t]);
    const player2Name = useMemo(() => (gameMode === 'pve' || gameMode === 'campaign') ? t('opponent_ai_name') : t('player_number', { num: 2 }), [t, gameMode]);

    const player1Worker = useMemo(() => new Worker(new URL('../services/robotExecutor.ts', import.meta.url), { type: 'module' }), []);
    const player2Worker = useMemo(() => {
        if (gameMode === 'pvp') {
            return new Worker(new URL('../services/robotExecutor.ts', import.meta.url), { type: 'module' });
        }
        return null;
    }, [gameMode]);

    const player1Memory = useRef({});
    const player2Memory = useRef({});

    const addLog = useCallback((message: string) => {
        setLog(prev => [message, ...prev].slice(0, 100)); // Keep last 100 logs
    }, []);

    const endCombat = useCallback((winner: 'player1' | 'player2') => {
        if (isFinished) return;
        setIsFinished(true);
        addLog(t('log_sim_complete'));
        setTimeout(() => onCombatEnd(winner), 2000);
    }, [isFinished, addLog, t, onCombatEnd]);
    
    const processAction = useCallback((sourceId: 'player' | 'enemy', command: any) => {
        const source = sourceId === 'player' ? combatState.player : combatState.enemy;
        const target = sourceId === 'player' ? combatState.enemy : combatState.player;
        const sourceName = sourceId === 'player' ? player1Name : player2Name;
        const targetName = sourceId === 'player' ? player2Name : player1Name;
    
        if (source.health <= 0 || !command) return;
    
        switch (command.type) {
            case 'MOVE':
                dispatch({ type: 'MOVE', payload: { target: sourceId, to: command.payload.to } });
                break;
            case 'FIRE':
                if (!source.build.weapon) return;
                const weaponName = t(source.build.weapon.name);
                addLog(t('log_robot_fires', { name: sourceName, weapon: weaponName, target: targetName }));
                
                const projectileId = `${sourceId}-${Date.now()}`;
                dispatch({type: 'ADD_PROJECTILE', payload: { projectile: {
                    id: projectileId,
                    weaponType: 'laser',
                    startX: source.position.x,
                    startY: source.position.y,
                    endX: command.payload.at.x,
                    endY: command.payload.at.y,
                }}});
    
                setTimeout(() => {
                    dispatch({type: 'REMOVE_PROJECTILE', payload: {id: projectileId}});
                    const damage = parseInt(source.build.weapon?.stats?.Damage as string) || 10;
                    if (target.isShieldActive) {
                         addLog(t('log_shield_absorb', { name: targetName }));
                         return;
                    }
                    addLog(t('log_robot_hit', { target: targetName, damage: damage }));
                    dispatch({type: 'SET_HEALTH', payload: {target: target.id, health: target.health - damage }});
                }, 900);
                break;
            case 'USE_DEFENSE_MODULE': {
                if (!source.build.defense || source.moduleCooldowns.defense > gameTick) return;
                const module = source.build.defense;
                addLog(t('log_defense_activate', { name: sourceName, module_name: t(module.name) }));


                const cooldown = parseInt(module.stats.Cooldown as string) || 20;
                dispatch({ type: 'SET_MODULE_COOLDOWN', payload: { target: sourceId, moduleType: 'defense', tick: gameTick + cooldown } });

                if (module.id === 'defense_shield') {
                    dispatch({ type: 'SET_SHIELD_STATE', payload: { target: sourceId, isActive: true } });
                    const duration = 8000; // 8 seconds, should come from stats later
                    setTimeout(() => {
                        dispatch({ type: 'SET_SHIELD_STATE', payload: { target: sourceId, isActive: false } });
                    }, duration);
                }
                break;
            }
             case 'USE_UTILITY_MODULE': {
                if (!source.build.utility || source.moduleCooldowns.utility > gameTick) return;
                 const module = source.build.utility;
                 addLog(t('log_utility_activate', { name: sourceName, module_name: t(module.name) }));

                const cooldown = parseInt(module.stats.Cooldown as string) || 25;
                dispatch({ type: 'SET_MODULE_COOLDOWN', payload: { target: sourceId, moduleType: 'utility', tick: gameTick + cooldown } });
                // Add specific effects for utility modules here
                break;
            }
            case 'LOG':
                addLog(`[${sourceName}] ${command.payload.message}`);
                break;
        }
    }, [combatState, addLog, t, player1Name, player2Name, gameTick]);

    const processActionRef = useRef(processAction);
    useEffect(() => {
        processActionRef.current = processAction;
    }, [processAction]);


    useEffect(() => {
        addLog(t('log_sim_start'));
        dispatch({ type: 'SPAWN', payload: { target: 'player', build: build1, position: { x: 20, y: 50 } } });
        addLog(t('log_robot_enters', { name: player1Name }));
        dispatch({ type: 'SPAWN', payload: { target: 'enemy', build: build2, position: { x: 80, y: 50 } } });
        addLog(t('log_robot_enters', { name: player2Name }));

        player1Worker.onmessage = (e) => {
            const { commands, memory } = e.data;
            player1Memory.current = memory;
            commands.forEach((cmd: any) => processActionRef.current('player', cmd));
        };
    
        if (player2Worker) {
            player2Worker.onmessage = (e) => {
                const { commands, memory } = e.data;
                player2Memory.current = memory;
                commands.forEach((cmd: any) => processActionRef.current('enemy', cmd));
            };
        }

        return () => {
            player1Worker.terminate();
            player2Worker?.terminate();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    useEffect(() => {
        if (isFinished || !combatState.player.isVisible || !combatState.enemy.isVisible) return;

        const gameLoop = () => {
            setGameTick(t => t + 1);

            if (combatState.player.health <= 0) {
                endCombat('player2');
                return;
            }
            if (combatState.enemy.health <= 0) {
                endCombat('player1');
                return;
            }
            
            const playerWorldState = { 
                enemies: [{ 
                    ...combatState.enemy, 
                    distance: Math.hypot(combatState.player.position.x - combatState.enemy.position.x, combatState.player.position.y - combatState.enemy.position.y) 
                }] 
            };
            player1Worker.postMessage({
                code: code1,
                currentRobotState: combatState.player,
                currentWorldState: playerWorldState,
                memory: player1Memory.current,
            });

            setTimeout(() => {
                if (gameMode === 'pvp' && player2Worker) {
                    const enemyWorldState = { 
                        enemies: [{ 
                            ...combatState.player, 
                            distance: Math.hypot(combatState.enemy.position.x - combatState.player.position.x, combatState.enemy.position.y - combatState.player.position.y)
                        }]
                    };
                    player2Worker.postMessage({
                        code: code2,
                        currentRobotState: combatState.enemy,
                        currentWorldState: enemyWorldState,
                        memory: player2Memory.current,
                    });
                } else {
                    const aiAction = getSimpleAIAction(combatState.enemy, combatState.player);
                    processAction('enemy', aiAction);
                }
            }, TICK_RATE / 2);
        };

        const interval = setInterval(gameLoop, TICK_RATE);
        return () => clearInterval(interval);

    }, [combatState, isFinished, endCombat, gameMode, code1, code2, processAction, player1Worker, player2Worker]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 md:p-8">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2">{t('arena_title')}</h1>
            <p className="text-gray-400 mb-6 text-center">{t('arena_subtitle')}</p>
            
            <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg border-2 border-cyan-500 shadow-lg shadow-cyan-500/20 p-4 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(49,46,129,0.4)_0%,_rgba(17,24,39,0.9)_70%)]">
                <div className="absolute top-[10%] left-[10%] w-[8%] h-[8%] bg-cyan-500/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[8%] h-[8%] bg-red-500/20 rounded-full animate-pulse"></div>
                {combatState.player.isVisible && <Robot robotState={combatState.player} />}
                {combatState.enemy.isVisible && <Robot robotState={combatState.enemy} />}
                {combatState.projectiles.map(p => <Projectile key={p.id} projectileState={p} />)}
            </div>

            <div className="w-full max-w-4xl h-32 mt-4 bg-gray-800 rounded-lg p-3 overflow-y-auto font-mono text-sm text-green-400 border border-gray-700 flex flex-col-reverse">
                <div>
                    {log.map((entry, index) => (
                        <p key={index} className="whitespace-nowrap">{`> ${entry}`}</p>
                    ))}
                </div>
            </div>

            {isFinished && (
                <div className="mt-4 text-2xl font-bold text-yellow-400 animate-pulse">
                    {t('arena_match_over')}
                </div>
            )}
        </div>
    );
};