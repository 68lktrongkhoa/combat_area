import { ComponentCategory, RobotComponent, CombatEvent } from './types';

export const MAX_EP = 100;

// Component data is now language-agnostic. Names and descriptions are translation keys.
export const AVAILABLE_COMPONENTS: RobotComponent[] = [
  // Chassis
  {
    id: 'chassis_light',
    name: 'component_chassis_light_name',
    category: ComponentCategory.Chassis,
    epCost: 20,
    stats: { Health: 250, Armor: 10, Speed: '8 m/s', 'Module Slots': 2 },
    description: 'component_chassis_light_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 L85 85 H15 Z' fill='none' stroke='%2300BCD4' stroke-width='4'/%3E%3Cpath d='M50 10 L70 50 L30 50 Z' fill='%2300BCD4'/%3E%3C/svg%3E`
  },
  {
    id: 'chassis_medium',
    name: 'component_chassis_medium_name',
    category: ComponentCategory.Chassis,
    epCost: 30,
    stats: { Health: 400, Armor: 20, Speed: '6 m/s', 'Module Slots': 3 },
    description: 'component_chassis_medium_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='20' y='20' width='60' height='60' rx='5' fill='none' stroke='%2300BCD4' stroke-width='4'/%3E%3Crect x='35' y='35' width='30' height='30' fill='%2300BCD4'/%3E%3C/svg%3E`
  },
  {
    id: 'chassis_heavy',
    name: 'component_chassis_heavy_name',
    category: ComponentCategory.Chassis,
    epCost: 40,
    stats: { Health: 600, Armor: 35, Speed: '4 m/s', 'Module Slots': 4 },
    description: 'component_chassis_heavy_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 30 H90 V90 H10 Z' fill='none' stroke='%2300BCD4' stroke-width='4'/%3E%3Cpath d='M20 10 H80 V30 H20 Z' fill='%2300BCD4'/%3E%3C/svg%3E`
  },
  // Weapons
  {
    id: 'weapon_laser',
    name: 'component_weapon_laser_name',
    category: ComponentCategory.Weapon,
    epCost: 25,
    stats: { Damage: '30', Range: '800m', 'Fire Rate': '2/s', Type: 'Energy' },
    description: 'component_weapon_laser_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M10 45 H70 L90 50 L70 55 H10 Z' fill='%23F44336'/%3E%3C/svg%3E`
  },
  {
    id: 'weapon_plasma',
    name: 'component_weapon_plasma_name',
    category: ComponentCategory.Weapon,
    epCost: 35,
    stats: { Damage: '100 (AoE)', Range: '300m', 'Fire Rate': '0.5/s', Type: 'Splash' },
    description: 'component_weapon_plasma_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='40' cy='50' r='30' fill='%23F44336'/%3E%3Ccircle cx='40' cy='50' r='15' fill='white'/%3E%3C/svg%3E`
  },
  {
    id: 'weapon_missile',
    name: 'component_weapon_missile_name',
    category: ComponentCategory.Weapon,
    epCost: 30,
    stats: { Damage: '60', Range: '1000m', 'Fire Rate': '0.8/s', Type: 'Homing' },
    description: 'component_weapon_missile_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M20 40 L60 40 L80 50 L60 60 L20 60 L30 50 Z' fill='%23F44336'/%3E%3C/svg%3E`
  },
  // Defense Modules
  {
    id: 'defense_shield',
    name: 'component_defense_shield_name',
    category: ComponentCategory.Defense,
    epCost: 20,
    stats: { 'Shield HP': 150, 'Cooldown': '20s' },
    description: 'component_defense_shield_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 C 20 10, 10 40, 10 50 H 90 C 90 40, 80 10, 50 10 Z' fill='%234CAF50'/%3E%3C/svg%3E`
  },
  {
    id: 'defense_repair',
    name: 'component_defense_repair_name',
    category: ComponentCategory.Defense,
    epCost: 15,
    stats: { 'Heal/s': 10, 'Duration': '10s', 'Cooldown': '30s' },
    description: 'component_defense_repair_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 20 L60 45 H80 L65 60 L70 85 L50 70 L30 85 L35 60 L20 45 H40 Z' fill='%234CAF50'/%3E%3C/svg%3E`
  },
  {
    id: 'defense_stealth',
    name: 'component_defense_stealth_name',
    category: ComponentCategory.Defense,
    epCost: 25,
    stats: { Duration: '8s', 'Cooldown': '40s' },
    description: 'component_defense_stealth_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 20 C 80 20, 80 80, 50 80 S 20 80, 20 50 S 20 20, 50 20' fill='none' stroke='%234CAF50' stroke-width='4' stroke-dasharray='10 5'/%3E%3C/svg%3E`
  },
  // Utility Modules
  {
    id: 'utility_booster',
    name: 'component_utility_booster_name',
    category: ComponentCategory.Utility,
    epCost: 15,
    stats: { 'Speed Buff': '+50%', 'Duration': '5s', 'Cooldown': '25s' },
    description: 'component_utility_booster_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M30 20 L70 50 L30 80 Z' fill='%23FFC107'/%3E%3Cpath d='M50 20 L90 50 L50 80 Z' fill='%23FFC107' opacity='0.6'/%3E%3C/svg%3E`
  },
  {
    id: 'utility_scanner',
    name: 'component_utility_scanner_name',
    category: ComponentCategory.Utility,
    epCost: 10,
    stats: { 'Scan Range': '+30%', 'Effect': 'Passive' },
    description: 'component_utility_scanner_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='none' stroke='%23FFC107' stroke-width='4'/%3E%3Cpath d='M50 50 L85 15' stroke='%23FFC107' stroke-width='4'/%3E%3C/svg%3E`
  },
  {
    id: 'utility_emp',
    name: 'component_utility_emp_name',
    category: ComponentCategory.Utility,
    epCost: 20,
    stats: { 'Effect': 'Disables modules', 'Radius': '150m', 'Cooldown': '50s' },
    description: 'component_utility_emp_description',
    imageUrl: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='%23FFC107' stroke-width='4'/%3E%3Cpath d='M50 20 V0 M50 80 V100 M20 50 H0 M80 50 H100' stroke='%23FFC107' stroke-width='4'/%3E%3C/svg%3E`
  },
];


export const ROBOT_API_DOCS_EN = `
/* Robot API Documentation (JavaScript) */

/* Sensing - Getting info about the world */
self.scan_enemies(): Array<{id: string, position: {x, y}, distance: number}>; // Returns a list of enemies in view.
self.get_enemy_details(enemy_id: string): object | null; // Returns detailed stats of a specific enemy.
self.get_self_stats(): object; // Returns your own robot's current status.
self.get_map_info(): object; // Returns info about map obstacles.

/* Movement - Controlling your robot's position */
self.move_to(x: number, y: number): void; // Move to a specific coordinate.
self.set_velocity(direction: {x, y}, speed: number): void; // Move continuously in a vector direction.
self.rotate_towards(target: {x, y}): void; // Rotate your chassis to face a target coordinate.

/* Combat & Abilities - Using weapons and modules */
self.fire_at(target: {x, y}): void; // Fire your main weapon at a target coordinate.
self.use_defense_module(): void; // Activate your equipped defense module.
self.use_utility_module(target?: {x, y}): void; // Activate your equipped utility module.

/* Debug & Data - Logging and state persistence */
self.log(message: string): void; // Print a message to the robot's console.
self.memory: object; // A persistent object to store data between AI ticks.
`;

export const ROBOT_API_DOCS_VI = `
/* Tài liệu API Robot (JavaScript) */

/* Cảm biến - Thu thập thông tin về môi trường */
self.scan_enemies(): Array<{id: string, position: {x, y}, distance: number}>; // Trả về danh sách các kẻ địch trong tầm nhìn.
self.get_enemy_details(enemy_id: string): object | null; // Trả về thông số chi tiết của một kẻ địch.
self.get_self_stats(): object; // Trả về trạng thái hiện tại của robot của bạn.
self.get_map_info(): object; // Trả về thông tin về các chướng ngại vật.

/* Di chuyển - Điều khiển vị trí của robot */
self.move_to(x: number, y: number): void; // Di chuyển đến một tọa độ cụ thể.
self.set_velocity(direction: {x, y}, speed: number): void; // Di chuyển liên tục theo một hướng vector.
self.rotate_towards(target: {x, y}): void; // Xoay thân robot để đối mặt với một mục tiêu.

/* Chiến đấu & Kỹ năng - Sử dụng vũ khí và module */
self.fire_at(target: {x, y}): void; // Bắn vũ khí chính vào một mục tiêu.
self.use_defense_module(): void; // Kích hoạt module phòng thủ.
self.use_utility_module(target?: {x, y}): void; // Kích hoạt module tiện ích.

/* Gỡ lỗi & Dữ liệu - Ghi log và lưu trữ trạng thái */
self.log(message: string): void; // In một thông điệp ra console của robot.
self.memory: object; // Một đối tượng bền bỉ để lưu trữ dữ liệu giữa các lần cập nhật AI.
`;