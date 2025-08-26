import React from 'react';
import { RobotState } from '../types';

interface RobotProps {
  robotState: RobotState;
}

const Robot: React.FC<RobotProps> = ({ robotState }) => {
  const { position, health, maxHealth, isShieldActive, id, build } = robotState;
  const healthPercentage = (health / maxHealth) * 100;
  
  const isPlayer = id === 'player';

  return (
    <div
      className="absolute transition-all duration-1000 ease-linear"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        width: '12%', 
        aspectRatio: '1 / 1',
      }}
    >
      {/* Robot Body and Image */}
      <div className={`w-full h-full rounded-full flex items-center justify-center relative ${isPlayer ? 'bg-cyan-900' : 'bg-red-900'}`}>
         {isShieldActive && (
             <div className="absolute inset-0 rounded-full border-4 border-blue-400 animate-pulse"></div>
         )}
        <img
          src={build.chassis?.imageUrl}
          alt="chassis"
          className={`w-3/4 h-3/4 transition-transform duration-200 ${isPlayer ? '' : 'scale-x-[-1]'}`}
        />
      </div>

      {/* Health Bar */}
      <div className="absolute -bottom-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${healthPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Robot;