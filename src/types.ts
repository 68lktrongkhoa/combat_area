export enum GamePhase {
  GAME_MODE_SELECTION = 'GAME_MODE_SELECTION',
  CAMPAIGN_LEVEL_SELECT = 'CAMPAIGN_LEVEL_SELECT',
  Build = 'BUILD',
  Code = 'CODE',
  PLAYER_TRANSITION = 'PLAYER_TRANSITION',
  Combat = 'COMBAT',
  Analysis = 'ANALYSIS',
}

export type GameMode = 'pve' | 'pvp' | 'campaign';
export type Winner = 'player1' | 'player2' | 'ai' | null;

export enum ComponentCategory {
  Chassis = 'Chassis',
  Weapon = 'Weapon',
  Defense = 'Defense Module',
  Utility = 'Utility Module',
}

export interface RobotComponent {
  id: string;
  name: string; // This will now serve as a key for translation
  category: ComponentCategory;
  epCost: number;
  stats: {
    [key: string]: string | number;
  };
  description: string; // This will also be a key for translation
  imageUrl: string;
}

export interface RobotBuild {
  chassis: RobotComponent | null;
  weapon: RobotComponent | null;
  defense: RobotComponent | null;
  utility: RobotComponent | null;
}

// Type for a single campaign level
export interface CampaignLevel {
  level: number;
  titleKey: string;
  descriptionKey: string;
  opponentBuild: RobotBuild;
  playerMaxEp?: number; // Optional EP limit for the player
}


// Types for Animated Combat
export type CombatTarget = 'player' | 'enemy';

export interface CombatState {
  player: RobotState;
  enemy: RobotState;
  projectiles: ProjectileState[];
}

export interface RobotState {
  id: CombatTarget;
  build: RobotBuild;
  position: { x: number; y: number };
  health: number;
  maxHealth: number;
  isShieldActive: boolean;
  isVisible: boolean;
}

export interface ProjectileState {
  id: string;
  weaponType: 'laser' | 'plasma' | 'missile';
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type CombatEvent =
  | { type: 'LOG'; key: string; }
  | { type: 'SPAWN'; target: CombatTarget; position: { x: number; y: number } }
  | { type: 'MOVE'; target: CombatTarget; to: { x: number; y: number } }
  | { type: 'FIRE'; source: CombatTarget; weaponType: 'laser' | 'plasma' | 'missile', logKey: string }
  | { type: 'DAMAGE'; target: CombatTarget; amount: number; isHit: boolean; logKey: string, logKeyMiss?: string }
  | { type: 'SHIELD_ON'; target: CombatTarget; logKey: string }
  | { type: 'SHIELD_OFF'; target: CombatTarget; logKey: string }
  | { type: 'DESTROY'; target: CombatTarget; logKey: string }
  | { type: 'VICTORY'; target: CombatTarget; logKey: string }
  | { type: 'END' };