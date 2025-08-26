import React, { useEffect, useState } from 'react';
import { ProjectileState } from '../types';

interface ProjectileProps {
  projectileState: ProjectileState;
}

const Projectile: React.FC<ProjectileProps> = ({ projectileState }) => {
  const { startX, startY, endX, endY, weaponType } = projectileState;
  const [pos, setPos] = useState({ x: startX, y: startY });

  useEffect(() => {
    // This timeout triggers the animation to the end position
    const timer = setTimeout(() => {
      setPos({ x: endX, y: endY });
    }, 20); // A small delay to ensure the initial state is rendered first

    return () => clearTimeout(timer);
  }, [endX, endY]);

  const projectileStyles: React.CSSProperties = {
    position: 'absolute',
    left: `${pos.x}%`,
    top: `${pos.y}%`,
    transition: 'left 0.8s ease-out, top 0.8s ease-out',
    transform: 'translate(-50%, -50%)',
  };

  const renderProjectileType = () => {
    switch (weaponType) {
      case 'laser':
        return <div className="w-4 h-1 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>;
      case 'plasma':
        return <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50 animate-pulse"></div>;
      case 'missile':
        return <div className="w-5 h-2 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>;
      default:
        return null;
    }
  };

  return <div style={projectileStyles}>{renderProjectileType()}</div>;
};

export default Projectile;
