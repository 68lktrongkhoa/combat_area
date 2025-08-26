import React from 'react';
import { useTranslation } from '../contexts/LanguageContext';

interface PlayerHandoffProps {
  nextPlayer: number;
  onContinue: () => void;
}

const PlayerHandoff: React.FC<PlayerHandoffProps> = ({ nextPlayer, onContinue }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-8">
      <div className="text-center bg-gray-800 p-10 rounded-lg shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">{t('handoff_title')}</h1>
        <p className="text-gray-400 text-lg mb-2">{t('handoff_subtitle')}</p>
        <p className="text-xl text-white mb-8">{t('handoff_instruction', { num: nextPlayer })}</p>
        <button
          onClick={onContinue}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105"
        >
          {t('handoff_button')}
        </button>
      </div>
    </div>
  );
};

export default PlayerHandoff;