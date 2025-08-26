import React from 'react';
import { RobotComponent } from '../types';
import { useTranslation } from '../contexts/LanguageContext';

interface ComponentCardProps {
  component: RobotComponent;
  onSelect: (component: RobotComponent) => void;
  onDeselect: (component: RobotComponent) => void;
  isSelected: boolean;
  canSelect: boolean;
}

const categoryColors: { [key: string]: string } = {
  Chassis: 'border-sky-500',
  Weapon: 'border-red-500',
  'Defense Module': 'border-green-500',
  'Utility Module': 'border-yellow-500',
};

export const ComponentCard: React.FC<ComponentCardProps> = ({ component, onSelect, onDeselect, isSelected, canSelect }) => {
  const { t } = useTranslation();
  const borderColor = categoryColors[component.category] || 'border-gray-500';

  return (
    <div className={`bg-gray-800 border-t-4 ${borderColor} rounded-lg p-4 flex flex-col h-full transition-all duration-200 ${!canSelect && !isSelected ? 'opacity-50' : ''}`}>
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-white">{t(component.name)}</h3>
            <span className="text-cyan-400 font-mono bg-gray-900 px-2 py-1 rounded-md text-sm">{component.epCost} EP</span>
        </div>
         <div className="w-full h-24 bg-gray-900 rounded-md flex items-center justify-center mb-4">
            <img src={component.imageUrl} alt={t(component.name)} className="w-20 h-20" />
        </div>
        <p className="text-sm text-gray-400 mt-2 mb-4 h-16">{t(component.description)}</p>
        <div className="space-y-1 text-sm">
          {Object.entries(component.stats).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-400">{t(key)}:</span>
              <span className="text-white font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        {isSelected ? (
          <button
            onClick={() => onDeselect(component)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {t('button_deselect')}
          </button>
        ) : (
          <button
            onClick={() => onSelect(component)}
            disabled={!canSelect}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {t('button_select')}
          </button>
        )}
      </div>
    </div>
  );
};