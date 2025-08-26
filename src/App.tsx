import React, { useState, useCallback, useMemo } from 'react';
import { GamePhase, RobotBuild, RobotComponent, GameMode, Winner, CampaignLevel } from './types';
import { Garage } from './components/Garage';
import { Ide } from './components/Ide';
import { Arena } from './components/Arena';
import { Analysis } from './components/Analysis';
import { useTranslation } from './contexts/LanguageContext';
import { AVAILABLE_COMPONENTS } from './constants';
import LanguageSwitcher from './components/LanguageSwitcher';
import GameModeSelection from './components/GameModeSelection';
import PlayerHandoff from './components/PlayerHandoff';
import CampaignLevelSelect from './components/CampaignLevelSelect';
import { campaignLevels } from './campaignLevels';


const initialBuild: RobotBuild = {
  chassis: null,
  weapon: null,
  defense: null,
  utility: null,
};

interface PlayerState {
  build: RobotBuild;
  epSpent: number;
  code: string;
}

function App() {
  const { t } = useTranslation();

  const initialCode = useMemo(() => `/**
 * ${t('initial_code_comment_1')}
 * ${t('initial_code_comment_2')}
 */
function update() {
    const enemies = self.scan_enemies();
    if (enemies.length > 0) {
        const closestEnemy = enemies[0];
        self.rotate_towards(closestEnemy.position);
        self.fire_at(closestEnemy.position);
    }
}
`, [t]);

  const [phase, setPhase] = useState<GamePhase>(GamePhase.GAME_MODE_SELECTION);
  const [gameMode, setGameMode] = useState<GameMode>('pve');
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [winner, setWinner] = useState<Winner>(null);

  // Campaign State
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const [currentLevel, setCurrentLevel] = useState<CampaignLevel | null>(null);

  const [player1State, setPlayer1State] = useState<PlayerState>({
    build: initialBuild,
    epSpent: 0,
    code: initialCode,
  });

  const [player2State, setPlayer2State] = useState<PlayerState>({
    build: initialBuild,
    epSpent: 0,
    code: initialCode,
  });

  const aiBuild = useMemo((): RobotBuild => ({
    chassis: AVAILABLE_COMPONENTS.find(c => c.id === 'chassis_heavy') as RobotComponent,
    weapon: AVAILABLE_COMPONENTS.find(c => c.id === 'weapon_missile') as RobotComponent,
    defense: AVAILABLE_COMPONENTS.find(c => c.id === 'defense_repair') as RobotComponent,
    utility: AVAILABLE_COMPONENTS.find(c => c.id === 'utility_scanner') as RobotComponent,
  }), []);

  const resetPlayerStates = useCallback(() => {
    setPlayer1State({ build: initialBuild, epSpent: 0, code: initialCode });
    setPlayer2State({ build: initialBuild, epSpent: 0, code: initialCode });
  }, [initialCode]);

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    resetPlayerStates();
    if (mode === 'campaign') {
      setPhase(GamePhase.CAMPAIGN_LEVEL_SELECT);
    } else {
      setCurrentPlayer(1);
      setPhase(GamePhase.Build);
    }
  };

  const handleLevelSelect = (level: CampaignLevel) => {
    setCurrentLevel(level);
    resetPlayerStates();
    setPhase(GamePhase.Build);
  };
  
  const handleBackToCampaignMap = () => {
    setCurrentLevel(null);
    setPhase(GamePhase.CAMPAIGN_LEVEL_SELECT);
  };

  const handleFinalizeBuild = () => {
    setPhase(GamePhase.Code);
  };

  const handleBackToGarage = () => {
    setPhase(GamePhase.Build);
  };

  const handleStartCombat = () => {
    if (gameMode === 'pvp' && currentPlayer === 1) {
      setPhase(GamePhase.PLAYER_TRANSITION);
    } else {
      setPhase(GamePhase.Combat);
    }
  };
  
  const handleHandoffComplete = () => {
    setCurrentPlayer(2);
    setPhase(GamePhase.Build);
  };
  
  const handleCombatEnd = (combatWinner: 'player1' | 'player2') => {
    const isPlayer1Winner = combatWinner === 'player1';
    
    if (gameMode === 'campaign' && isPlayer1Winner && currentLevel) {
        if (unlockedLevel === currentLevel.level) {
            setUnlockedLevel(prev => prev + 1);
        }
    }

    setWinner(gameMode === 'pve' || gameMode === 'campaign'
        ? (isPlayer1Winner ? 'player1' : 'ai')
        : combatWinner);

    setPhase(GamePhase.Analysis);
  };

  const handleReviseCode = () => {
    setPhase(GamePhase.Code);
  };

  const handleRestart = () => {
    setPhase(GamePhase.GAME_MODE_SELECTION);
  };

  const handleRetryLevel = () => {
    if (!currentLevel) return;
    resetPlayerStates();
    setPhase(GamePhase.Build);
  };

  const handleNextLevel = () => {
    const nextLevelNumber = (currentLevel?.level || 0) + 1;
    const nextLevelData = campaignLevels.find(l => l.level === nextLevelNumber);
    if (nextLevelData) {
        handleLevelSelect(nextLevelData);
    } else {
        handleBackToCampaignMap(); // No more levels, go back to map
    }
  };

  const renderPhase = () => {
    const currentState = currentPlayer === 1 ? player1State : player2State;
    const setState = currentPlayer === 1 ? setPlayer1State : setPlayer2State;

    switch (phase) {
      case GamePhase.GAME_MODE_SELECTION:
        return <GameModeSelection onModeSelect={handleModeSelect} />;
      case GamePhase.CAMPAIGN_LEVEL_SELECT:
        return <CampaignLevelSelect 
                    unlockedLevel={unlockedLevel} 
                    onSelectLevel={handleLevelSelect} 
                    onBackToMenu={handleRestart}
                />;
      case GamePhase.Build:
        return (
          <Garage
            robotBuild={currentState.build}
            setRobotBuild={(build) => setState(s => ({ ...s, build }))}
            epSpent={currentState.epSpent}
            setEpSpent={(ep) => setState(s => ({ ...s, epSpent: ep }))}
            onFinalize={handleFinalizeBuild}
            playerName={gameMode === 'pvp' ? t('player_number', { num: currentPlayer }) : undefined}
            maxEp={gameMode === 'campaign' ? currentLevel?.playerMaxEp : undefined}
          />
        );
      case GamePhase.Code:
        return (
          <Ide
            robotCode={currentState.code}
            setRobotCode={(code) => setState(s => ({ ...s, code: typeof code === 'function' ? code(s.code) : code }))}
            onStartCombat={handleStartCombat}
            onBackToGarage={handleBackToGarage}
            playerName={gameMode === 'pvp' ? t('player_number', { num: currentPlayer }) : undefined}
          />
        );
      case GamePhase.PLAYER_TRANSITION:
        return <PlayerHandoff nextPlayer={2} onContinue={handleHandoffComplete} />;
      case GamePhase.Combat:
        const enemyBuild = gameMode === 'pvp' ? player2State.build :
                           gameMode === 'campaign' ? currentLevel!.opponentBuild : aiBuild;
        return <Arena 
                  build1={player1State.build} 
                  build2={enemyBuild} 
                  onCombatEnd={handleCombatEnd}
                  gameMode={gameMode}
                />;
      case GamePhase.Analysis:
        return <Analysis 
                  gameMode={gameMode}
                  winner={winner}
                  build1={player1State.build}
                  build2={gameMode === 'pve' ? aiBuild : gameMode === 'campaign' ? currentLevel!.opponentBuild : player2State.build}
                  onRestart={handleRestart} 
                  onReviseCode={gameMode !== 'pvp' ? handleReviseCode : undefined}
                  // Campaign specific actions
                  onRetryLevel={gameMode === 'campaign' ? handleRetryLevel : undefined}
                  onNextLevel={gameMode === 'campaign' && winner === 'player1' ? handleNextLevel : undefined}
                  onBackToCampaignMap={gameMode === 'campaign' ? handleBackToCampaignMap : undefined}
                />;
      default:
        return <div>Unknown Phase</div>;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <LanguageSwitcher />
      {renderPhase()}
    </div>
  );
}

export default App;
