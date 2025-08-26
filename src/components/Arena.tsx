import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { CombatState, RobotBuild, RobotState, GameMode } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import Robot from './Robot';
import Projectile from './Projectile';

interface ArenaProps {
  build1: RobotBuild;
  build2: RobotBuild;
  onCombatEnd: (winner: 'player1' | 'player2') => void;
  gameMode: GameMode;
}

const ARENA_WIDTH = 100;
const ARENA_HEIGHT = 100;
const TICK_RATE = 1000; // ms per game tick

type Action = { type: 'MOVE'; to: { x: number, y: number } } | { type: 'FIRE' };

const initialCombatState: CombatState = {
    player: { id: 'player', build: { chassis: null, weapon: null, defense: null, utility: null }, position: { x: -100, y: -100 }, health: 0, maxHealth: 1, isShieldActive: false, isVisible: false },
    enemy: { id: 'enemy', build: { chassis: null, weapon: null, defense: null, utility: null }, position: { x: -100, y: -100 }, health: 0, maxHealth: 1, isShieldActive: false, isVisible: false },
    projectiles: [],
};

function combatReducer(state: CombatState, action: any): CombatState {
    switch (action.type) {
        case 'SPAWN': {
            const { target, build, position } = action.payload;
            const maxHealth = build.chassis?.stats?.Health as number || 1;
            return { ...state, [target]: { ...state[target], build, position, maxHealth, health: maxHealth, isVisible: true } };
        }
        case 'MOVE': {
            const { target, to } = action.payload;
            return { ...state, [target]: { ...state[target], position: to } };
        }
        case 'SET_HEALTH': {
            const { target, health } = action.payload;
            return { ...state, [target]: { ...state[target], health: Math.max(0, health) } };
        }
        case 'ADD_PROJECTILE':
            return { ...state, projectiles: [...state.projectiles, action.payload.projectile] };
        case 'REMOVE_PROJECTILE':
            return { ...state, projectiles: state.projectiles.filter(p => p.id !== action.payload.id) };
        default:
            return state;
    }
}


export const Arena: React.FC<ArenaProps> = ({ build1, build2, onCombatEnd, gameMode }) => {
  const { t } = useTranslation();
  const [log, setLog] = useState<string[]>([]);
  const [combatState, dispatch] = useReducer(combatReducer, initialCombatState);
  const [isFinished, setIsFinished] = useState(false);
  
  const player1Name = useMemo(() => t('player_number', { num: 1 }), [t]);
  const player2Name = useMemo(() => gameMode === 'pve' ? t('opponent_ai_name') : t('player_number', { num: 2 }), [t, gameMode]);


  const addLog = useCallback((message: string) => {
    setLog(prev => [...prev, message]);
  }, []);

  const endCombat = useCallback((winner: 'player1' | 'player2') => {
      if (isFinished) return;
      setIsFinished(true);
      addLog(t('log_sim_complete'));
      setTimeout(() => onCombatEnd(winner), 2000);
  }, [isFinished, addLog, t, onCombatEnd]);


  useEffect(() => {
    addLog(t('log_sim_start'));
    dispatch({ type: 'SPAWN', payload: { target: 'player', build: build1, position: { x: 20, y: 50 } } });
    addLog(t('log_robot_enters', { name: player1Name }));
    dispatch({ type: 'SPAWN', payload: { target: 'enemy', build: build2, position: { x: 80, y: 50 } } });
    addLog(t('log_robot_enters', { name: player2Name }));
  }, [addLog, build1, build2, player1Name, player2Name, t]);


  useEffect(() => {
      if (isFinished || !combatState.player.isVisible) return;

      const getNextAction = (robot: RobotState, enemy: RobotState): Action => {
          const distance = Math.hypot(robot.position.x - enemy.position.x, robot.position.y - enemy.position.y);
          const attackRange = 40; // Simplified range in arena units
          const moveStep = 10;

          if (distance > attackRange) {
              const dx = enemy.position.x - robot.position.x;
              const dy = enemy.position.y - robot.position.y;
              const newX = robot.position.x + (dx / distance) * moveStep;
              const newY = robot.position.y + (dy / distance) * moveStep;
              return { type: 'MOVE', to: { x: newX, y: newY } };
          } else {
              if (Math.random() > 0.3) { // 70% chance to fire
                  return { type: 'FIRE' };
              } else { // 30% chance to move randomly
                  const angle = Math.random() * 2 * Math.PI;
                  const newX = robot.position.x + Math.cos(angle) * moveStep;
                  const newY = robot.position.y + Math.sin(angle) * moveStep;
                  return { type: 'MOVE', to: { 
                      x: Math.max(5, Math.min(ARENA_WIDTH - 5, newX)), 
                      y: Math.max(5, Math.min(ARENA_HEIGHT - 5, newY)) 
                  }};
              }
          }
      };

      const processAction = (sourceId: 'player' | 'enemy', action: Action) => {
          const source = sourceId === 'player' ? combatState.player : combatState.enemy;
          const target = sourceId === 'player' ? combatState.enemy : combatState.player;
          const sourceName = sourceId === 'player' ? player1Name : player2Name;
          const targetName = sourceId === 'player' ? player2Name : player1Name;

          if (source.health <= 0) return;

          if (action.type === 'MOVE') {
              dispatch({ type: 'MOVE', payload: { target: sourceId, to: action.to } });
              addLog(t('log_robot_moves', { name: sourceName }));
          } else if (action.type === 'FIRE') {
              if (!source.build.weapon) return;
              const weaponName = t(source.build.weapon.name);
              addLog(t('log_robot_fires', { name: sourceName, weapon: weaponName, target: targetName }));
              
              const projectileId = `${sourceId}-${Date.now()}`;
              dispatch({type: 'ADD_PROJECTILE', payload: { projectile: {
                  id: projectileId,
                  weaponType: 'laser',
                  startX: source.position.x,
                  startY: source.position.y,
                  endX: target.position.x,
                  endY: target.position.y,
              }}});

              setTimeout(() => {
                  dispatch({type: 'REMOVE_PROJECTILE', payload: {id: projectileId}});
                  const damage = parseInt(source.build.weapon?.stats?.Damage as string) || 10;
                  addLog(t('log_robot_hit', { target: targetName, damage: damage }));
                  dispatch({type: 'SET_HEALTH', payload: {target: target.id, health: target.health - damage }});
              }, 900);
          }
      };

      const gameTick = () => {
          if (combatState.player.health <= 0) {
              endCombat('player2');
              return;
          }
          if (combatState.enemy.health <= 0) {
              endCombat('player1');
              return;
          }
          
          const playerAction = getNextAction(combatState.player, combatState.enemy);
          processAction('player', playerAction);

          setTimeout(() => {
              const enemyAction = getNextAction(combatState.enemy, combatState.player);
              processAction('enemy', enemyAction);
          }, TICK_RATE / 2);
      };

      const interval = setInterval(gameTick, TICK_RATE);
      return () => clearInterval(interval);

  }, [combatState, isFinished, addLog, endCombat, player1Name, player2Name, t]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-2">{t('arena_title')}</h1>
      <p className="text-gray-400 mb-6 text-center">{t('arena_subtitle')}</p>
      
      <div className="w-full max-w-4xl aspect-video bg-gray-900 rounded-lg border-2 border-cyan-500 shadow-lg shadow-cyan-500/20 p-4 relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(49,46,129,0.4)_0%,_rgba(17,24,39,0.9)_70%)]">
        {/* Decorative Zones */}
        <div className="absolute top-[10%] left-[10%] w-[8%] h-[8%] bg-cyan-500/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[8%] h-[8%] bg-red-500/20 rounded-full animate-pulse"></div>

        {/* Robots and Projectiles */}
        {combatState.player.isVisible && <Robot robotState={combatState.player} />}
        {combatState.enemy.isVisible && <Robot robotState={combatState.enemy} />}
        {combatState.projectiles.map(p => <Projectile key={p.id} projectileState={p} />)}
      </div>

       <div className="w-full max-w-4xl h-32 mt-4 bg-gray-800 rounded-lg p-3 overflow-y-auto font-mono text-sm text-green-400 border border-gray-700">
         {log.map((entry, index) => (
             <p key={index} className="whitespace-nowrap">{`[LOG ${index+1}] > ${entry}`}</p>
         ))}
      </div>

       {isFinished && (
            <div className="mt-4 text-2xl font-bold text-yellow-400 animate-pulse">
                {t('arena_match_over')}
            </div>
        )}
    </div>
  );
};