import React from 'react';
import { RobotBuild, RobotComponent, ComponentCategory } from '../types';
import { AVAILABLE_COMPONENTS, MAX_EP as GLOBAL_MAX_EP } from '../constants';
import { ComponentCard } from './ComponentCard';
import { useTranslation } from '../contexts/LanguageContext';


interface GarageProps {
  robotBuild: RobotBuild;
  setRobotBuild: (build: RobotBuild) => void;
  epSpent: number;
  setEpSpent: (ep: number) => void;
  onFinalize: () => void;
  playerName?: string;
  maxEp?: number; // Optional max EP for campaign levels
}

export const Garage: React.FC<GarageProps> = ({ robotBuild, setRobotBuild, epSpent, setEpSpent, onFinalize, playerName, maxEp }) => {
  const { t } = useTranslation();
  const currentMaxEp = maxEp ?? GLOBAL_MAX_EP;

  const handleSelect = (component: RobotComponent) => {
    const newBuild = { ...robotBuild };
    let newEpSpent = epSpent;

    const deselectIfExists = (comp: RobotComponent | null) => {
        if (comp) newEpSpent -= comp.epCost;
    }

    switch (component.category) {
      case ComponentCategory.Chassis:
        deselectIfExists(newBuild.chassis);
        newBuild.chassis = component;
        break;
      case ComponentCategory.Weapon:
        deselectIfExists(newBuild.weapon);
        newBuild.weapon = component;
        break;
      case ComponentCategory.Defense:
        deselectIfExists(newBuild.defense);
        newBuild.defense = component;
        break;
      case ComponentCategory.Utility:
        deselectIfExists(newBuild.utility);
        newBuild.utility = component;
        break;
    }
    newEpSpent += component.epCost;
    setRobotBuild(newBuild);
    setEpSpent(newEpSpent);
  };
  
  const handleDeselect = (component: RobotComponent) => {
    const newBuild = { ...robotBuild };
    let newEpSpent = epSpent;

    switch (component.category) {
        case ComponentCategory.Chassis: newBuild.chassis = null; break;
        case ComponentCategory.Weapon: newBuild.weapon = null; break;
        case ComponentCategory.Defense: newBuild.defense = null; break;
        case ComponentCategory.Utility: newBuild.utility = null; break;
    }
    newEpSpent -= component.epCost;
    setRobotBuild(newBuild);
    setEpSpent(newEpSpent);
  };

  const renderComponentSection = (category: ComponentCategory) => {
    const components = AVAILABLE_COMPONENTS.filter(c => c.category === category);
    const selectedComponentId = 
        category === ComponentCategory.Chassis ? robotBuild.chassis?.id :
        category === ComponentCategory.Weapon ? robotBuild.weapon?.id :
        category === ComponentCategory.Defense ? robotBuild.defense?.id :
        robotBuild.utility?.id;

    return (
      <div key={category}>
        <h2 className="text-2xl font-bold text-cyan-400 mb-4 border-b-2 border-gray-700 pb-2">{t(category)}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map(comp => {
            const isSelected = selectedComponentId === comp.id;
            const canSelect = epSpent - (isSelected ? comp.epCost : 0) + comp.epCost <= currentMaxEp;

            return (
              <ComponentCard
                key={comp.id}
                component={comp}
                isSelected={isSelected}
                canSelect={canSelect}
                onSelect={handleSelect}
                onDeselect={handleDeselect}
              />
            );
          })}
        </div>
      </div>
    );
  };
  
  const isBuildComplete = robotBuild.chassis && robotBuild.weapon;
  const progressPercentage = (epSpent / currentMaxEp) * 100;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="bg-gray-800 rounded-lg p-6 shadow-2xl sticky top-4 z-10 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-white">{playerName ? `${playerName}: ${t('garage_title')}`: t('garage_title')}</h1>
                <p className="text-gray-400">{t('garage_subtitle', { max_ep: currentMaxEp })}</p>
            </div>
            <div className="w-full md:w-1/3">
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-cyan-400">{t('garage_ep_spent')}</span>
                    <span className="text-sm font-medium text-cyan-400">{epSpent} / {currentMaxEp}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                    <div className="bg-cyan-600 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>
            <button 
                onClick={onFinalize}
                disabled={!isBuildComplete}
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed">
                {t('garage_finalize_button')}
            </button>
        </div>
      </div>
      
      <div className="space-y-12">
        {Object.values(ComponentCategory).map(category => renderComponentSection(category))}
      </div>
    </div>
  );
};