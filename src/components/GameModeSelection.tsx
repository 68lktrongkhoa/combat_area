import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';
import { GameMode } from '../types';

interface GameModeSelectionProps {
  onModeSelect: (mode: GameMode) => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onModeSelect }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-cyan-400 tracking-wider">{t('gamemode_selection_title')}</h1>
        <p className="text-gray-400 text-xl mt-2">{t('gamemode_selection_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Campaign Card */}
        <ModeCard 
            title={t('gamemode_campaign')}
            description={t('gamemode_campaign_desc')}
            onClick={() => onModeSelect('campaign')}
            borderColor="border-yellow-500"
        />

        {/* PVE Card */}
        <ModeCard 
            title={t('gamemode_pve')}
            description={t('gamemode_pve_desc')}
            onClick={() => onModeSelect('pve')}
            borderColor="border-cyan-500"
        />

        {/* PVP Card */}
        <ModeCard 
            title={t('gamemode_pvp')}
            description={t('gamemode_pvp_desc')}
            onClick={() => onModeSelect('pvp')}
            borderColor="border-red-500"
        />
      </div>
    </div>
  );
};

interface ModeCardProps {
    title: string;
    description: string;
    onClick: () => void;
    borderColor: string;
}

const ModeCard: React.FC<ModeCardProps> = ({ title, description, onClick, borderColor }) => (
    <div
        onClick={onClick}
        className={`bg-gray-800 rounded-lg p-8 border-2 border-transparent hover:${borderColor} cursor-pointer transition-all duration-300 transform hover:scale-105`}
    >
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-gray-400">{description}</p>
    </div>
);


export default GameModeSelection;