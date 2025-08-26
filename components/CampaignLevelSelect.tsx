import React from 'react';
import { CampaignLevel } from '../types';
import { useTranslation } from '../contexts/LanguageContext';
import { campaignLevels } from '../campaignLevels';

interface CampaignLevelSelectProps {
  unlockedLevel: number;
  onSelectLevel: (level: CampaignLevel) => void;
  onBackToMenu: () => void;
}

const CampaignLevelSelect: React.FC<CampaignLevelSelectProps> = ({ unlockedLevel, onSelectLevel, onBackToMenu }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-yellow-400 tracking-wider">{t('campaign_select_title')}</h1>
        <p className="text-gray-400 text-xl mt-2">{t('campaign_select_subtitle')}</p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaignLevels.map((level) => {
          const isUnlocked = level.level <= unlockedLevel;
          const isCompleted = level.level < unlockedLevel;

          return (
            <div
              key={level.level}
              onClick={() => isUnlocked && onSelectLevel(level)}
              className={`p-6 rounded-lg border-2 transition-all duration-300 
                ${isUnlocked
                  ? 'bg-gray-800 border-gray-700 hover:border-yellow-500 hover:scale-105 cursor-pointer'
                  : 'bg-gray-800/50 border-gray-700/50 text-gray-500'
                }`
              }
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className={`text-2xl font-bold ${isUnlocked ? 'text-white' : ''}`}>
                  {t('campaign_level_n', { level: level.level })}
                </h2>
                {isCompleted && (
                  <span className="text-sm font-bold text-green-400 bg-green-900/50 px-3 py-1 rounded-full">
                    {t('campaign_status_completed')}
                  </span>
                )}
                {!isUnlocked && (
                    <span className="text-sm font-bold text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">
                    {t('campaign_status_locked')}
                  </span>
                )}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${isUnlocked ? 'text-yellow-400' : ''}`}>
                {t(level.titleKey)}
              </h3>
              <p className={`text-sm ${isUnlocked ? 'text-gray-400' : ''}`}>
                {t(level.descriptionKey)}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-12">
          <button
            onClick={onBackToMenu}
            className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
              {t('campaign_back_to_menu')}
          </button>
      </div>
    </div>
  );
};

export default CampaignLevelSelect;
