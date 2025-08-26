import React from 'react';
import { RobotBuild, RobotComponent, ComponentCategory, GameMode, Winner } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface AnalysisProps {
  gameMode: GameMode;
  winner: Winner;
  build1: RobotBuild;
  build2?: RobotBuild; 
  onRestart: () => void;
  onReviseCode?: () => void;
  // Campaign specific actions
  onNextLevel?: () => void;
  onRetryLevel?: () => void;
  onBackToCampaignMap?: () => void;
}

export const Analysis: React.FC<AnalysisProps> = ({ 
    gameMode, winner, build1, build2, onRestart, onReviseCode,
    onNextLevel, onRetryLevel, onBackToCampaignMap 
}) => {
  const { t } = useTranslation();

  const getWinnerText = () => {
    if (gameMode === 'pve' || gameMode === 'campaign') {
      return winner === 'player1' ? t('analysis_stat_result_victory') : t('analysis_stat_result_defeat');
    }
    if (winner === 'player1') return t('analysis_winner_p1');
    if (winner === 'player2') return t('analysis_winner_p2');
    return t('analysis_stat_result_draw');
  };

  const winnerColor = winner === 'player1' ? 'text-green-400' : 'text-red-400';

  const renderNextStepButtons = () => {
    if (gameMode === 'campaign') {
        return (
            <>
                {winner === 'player1' && onNextLevel && (
                    <button onClick={onNextLevel} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                        {t('analysis_button_next_level')}
                    </button>
                )}
                 {winner !== 'player1' && onRetryLevel && (
                    <button onClick={onRetryLevel} className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                        {t('analysis_button_retry_level')}
                    </button>
                )}
                {onBackToCampaignMap && (
                    <button onClick={onBackToCampaignMap} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                        {t('analysis_button_back_to_map')}
                    </button>
                )}
            </>
        )
    }

    return (
        <>
            <button onClick={onRestart} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                {gameMode === 'pvp' ? t('analysis_button_play_again') : t('analysis_button_new_build')}
            </button>
            {gameMode === 'pve' && onReviseCode && (
                    <button onClick={onReviseCode} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-lg">
                    {t('analysis_button_revise_code')}
                </button>
            )}
                <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-lg disabled:opacity-50" disabled>
                {t('analysis_button_replay')}
            </button>
        </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="w-full max-w-5xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-cyan-400">{t('analysis_title')}</h1>
          <p className="text-gray-400 mt-2">{t('analysis_subtitle')}</p>
        </header>

        <main className="grid md:grid-cols-2 gap-8">
          {/* Match Stats */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 md:col-span-2">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{t('analysis_stats_title')}</h2>
            <div className="space-y-3 text-lg">
              <StatRow label={t('analysis_stat_result')} value={getWinnerText()} valueColor={winnerColor} />
              <StatRow label={t('analysis_stat_time')} value="1m 24s" />
              <StatRow label={t('analysis_stat_damage_dealt')} value="650" />
              <StatRow label={t('analysis_stat_damage_taken')} value="180" />
            </div>
          </div>
          
          {/* Builds */}
          <BuildPanel build={build1} title={gameMode === 'pvp' ? t('analysis_build_p1') : t('analysis_build_title')} />
          {build2 && (
            <BuildPanel build={build2} title={gameMode === 'pvp' ? t('analysis_build_p2') : t('opponent_ai_name')} />
          )}

        </main>
        
        <footer className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">{t('analysis_next_steps_title')}</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                {renderNextStepButtons()}
            </div>
        </footer>
      </div>
    </div>
  );
};

const BuildPanel: React.FC<{build: RobotBuild, title: string}> = ({ build, title }) => {
    const { t } = useTranslation();
    return (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">{title}</h2>
            <div className="space-y-4">
                <BuildRow label={t(ComponentCategory.Chassis)} component={build.chassis} />
                <BuildRow label={t(ComponentCategory.Weapon)} component={build.weapon} />
                <BuildRow label={t(ComponentCategory.Defense)} component={build.defense} />
                <BuildRow label={t(ComponentCategory.Utility)} component={build.utility} />
            </div>
        </div>
    );
};

const StatRow: React.FC<{label: string; value: string | number; valueColor?: string;}> = ({ label, value, valueColor = 'text-white' }) => (
    <div className="flex justify-between border-b border-gray-700 pb-2">
        <span className="text-gray-400">{label}:</span>
        <span className={`font-semibold ${valueColor}`}>{value}</span>
    </div>
);

const BuildRow: React.FC<{label: string; component: RobotComponent | null;}> = ({ label, component }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between border-b border-gray-700 pb-2">
      <span className="text-gray-400 text-lg">{label}:</span>
      {component ? (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-700 rounded-md flex items-center justify-center">
                <img src={component.imageUrl} alt={t(component.name)} className="w-8 h-8"/>
            </div>
            <span className="font-semibold text-white text-lg">{t(component.name)}</span>
        </div>
      ) : (
        <span className="font-semibold text-gray-500 text-lg">{t('analysis_build_none')}</span>
      )}
    </div>
  );
};