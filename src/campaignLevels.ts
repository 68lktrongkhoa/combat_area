import { CampaignLevel, RobotBuild, RobotComponent } from "./types";
import { AVAILABLE_COMPONENTS } from "./constants";

const find = (id: string) => AVAILABLE_COMPONENTS.find(c => c.id === id) as RobotComponent;

// --- Opponent Builds Definition ---

const level1Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_laser'),
    defense: null,
    utility: null,
};

const level2Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_plasma'),
    defense: null,
    utility: find('utility_booster'),
};

const level3Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_missile'),
    defense: find('defense_shield'),
    utility: null,
};

const level4Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_laser'),
    defense: find('defense_repair'),
    utility: null,
};

const level5Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_missile'),
    defense: null,
    utility: find('utility_scanner'),
};

const level6Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_plasma'),
    defense: null,
    utility: null,
};

const level7Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_laser'),
    defense: find('defense_stealth'),
    utility: null,
};

const level8Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_missile'),
    defense: null,
    utility: find('utility_emp'),
};

const level9Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_laser'),
    defense: find('defense_repair'),
    utility: find('utility_scanner'),
};

const level10Opponent: RobotBuild = { // Boss 1
    chassis: find('chassis_medium'),
    weapon: find('weapon_plasma'),
    defense: find('defense_shield'),
    utility: find('utility_booster'),
};

const level11Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_laser'),
    defense: find('defense_stealth'),
    utility: find('utility_booster'),
};

const level12Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_missile'),
    defense: find('defense_repair'),
    utility: find('utility_emp'),
};

const level13Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_laser'),
    defense: find('defense_shield'),
    utility: find('utility_scanner'),
};

const level14Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_plasma'),
    defense: find('defense_shield'),
    utility: null,
};

const level15Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_laser'),
    defense: find('defense_stealth'),
    utility: null,
};

const level16Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_missile'),
    defense: find('defense_repair'),
    utility: find('utility_booster'),
};

const level17Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_laser'),
    defense: null,
    utility: find('utility_emp'),
};

const level18Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_plasma'),
    defense: find('defense_shield'),
    utility: find('utility_scanner'),
};

const level19Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_missile'),
    defense: find('defense_stealth'),
    utility: find('utility_emp'),
};

const level20Opponent: RobotBuild = { // Boss 2
    chassis: find('chassis_heavy'),
    weapon: find('weapon_missile'),
    defense: find('defense_stealth'),
    utility: find('utility_booster'),
};

const level21Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_plasma'),
    defense: find('defense_repair'),
    utility: find('utility_scanner'),
};

const level22Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_laser'),
    defense: find('defense_shield'),
    utility: find('utility_emp'),
};

const level23Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_laser'),
    defense: find('defense_repair'),
    utility: null,
};

const level24Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_missile'),
    defense: find('defense_stealth'),
    utility: find('utility_scanner'),
};

const level25Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_plasma'),
    defense: find('defense_repair'),
    utility: find('utility_emp'),
};

const level26Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_missile'),
    defense: find('defense_shield'),
    utility: find('utility_booster'),
};

const level27Opponent: RobotBuild = {
    chassis: find('chassis_light'),
    weapon: find('weapon_laser'),
    defense: find('defense_shield'),
    utility: find('utility_booster'),
};

const level28Opponent: RobotBuild = {
    chassis: find('chassis_medium'),
    weapon: find('weapon_missile'),
    defense: find('defense_stealth'),
    utility: find('utility_scanner'),
};

const level29Opponent: RobotBuild = {
    chassis: find('chassis_heavy'),
    weapon: find('weapon_plasma'),
    defense: find('defense_repair'),
    utility: find('utility_emp'),
};

const level30Opponent: RobotBuild = { // Final Boss (of 30)
    chassis: find('chassis_heavy'),
    weapon: find('weapon_plasma'),
    defense: find('defense_stealth'),
    utility: find('utility_emp'),
};

// --- Levels 31-100 ---
const level31Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: find('defense_stealth'), utility: null };
const level32Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_emp') };
const level33Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: find('utility_scanner') };
const level34Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: null, utility: find('utility_booster') };
const level35Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: find('defense_stealth'), utility: find('utility_scanner') };
const level36Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: null };
const level37Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_emp') };
const level38Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: null };
const level39Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: null, utility: find('utility_booster') };
const level40Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: find('utility_booster') }; // Boss
const level41Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: null };
const level42Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: find('defense_stealth'), utility: find('utility_scanner') };
const level43Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_repair'), utility: find('utility_emp') };
const level44Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: find('utility_emp') };
const level45Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: null, utility: find('utility_booster') };
const level46Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: find('defense_stealth'), utility: find('utility_scanner') };
const level47Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_repair'), utility: find('utility_booster') };
const level48Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: null };
const level49Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: null, utility: find('utility_emp') };
const level50Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_emp') }; // Boss
const level51Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: null };
const level52Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: find('defense_stealth'), utility: null };
const level53Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: find('utility_scanner') };
const level54Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_booster') };
const level55Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: null, utility: find('utility_emp') };
const level56Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_stealth'), utility: find('utility_booster') };
const level57Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_repair'), utility: find('utility_scanner') };
const level58Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_emp') };
const level59Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: null };
const level60Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_stealth'), utility: find('utility_booster') }; // Boss
const level61Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: find('utility_emp') };
const level62Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_scanner') };
const level63Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: null };
const level64Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_stealth'), utility: find('utility_booster') };
const level65Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: null, utility: find('utility_emp') };
const level66Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: find('defense_repair'), utility: find('utility_scanner') };
const level67Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: find('utility_booster') };
const level68Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_stealth'), utility: null };
const level69Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: find('utility_emp') };
const level70Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: find('utility_scanner') }; // Boss
const level71Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_booster') };
const level72Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: find('defense_stealth'), utility: find('utility_emp') };
const level73Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: null };
const level74Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: null, utility: find('utility_scanner') };
const level75Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: null };
const level76Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: find('defense_stealth'), utility: find('utility_booster') };
const level77Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: find('utility_scanner') };
const level78Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_emp') };
const level79Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_stealth'), utility: null };
const level80Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_emp') }; // Boss
const level81Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: find('utility_booster') };
const level82Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_stealth'), utility: find('utility_scanner') };
const level83Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_repair'), utility: find('utility_emp') };
const level84Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: find('utility_scanner') };
const level85Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_repair'), utility: find('utility_booster') };
const level86Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_stealth'), utility: null };
const level87Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: find('utility_emp') };
const level88Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_plasma'), defense: null, utility: find('utility_scanner') };
const level89Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_booster') };
// Fix: 'utility_stealth' does not exist. Replaced with 'utility_emp' for a challenging boss encounter.
const level90Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_emp') }; // Boss
const level91Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: find('utility_scanner') };
const level92Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: find('utility_booster') };
const level93Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_emp') };
const level94Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_laser'), defense: find('defense_stealth'), utility: null };
const level95Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: find('defense_repair'), utility: find('utility_emp') };
const level96Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_laser'), defense: find('defense_shield'), utility: find('utility_booster') };
const level97Opponent: RobotBuild = { chassis: find('chassis_medium'), weapon: find('weapon_missile'), defense: find('defense_stealth'), utility: find('utility_scanner') };
const level98Opponent: RobotBuild = { chassis: find('chassis_light'), weapon: find('weapon_plasma'), defense: find('defense_shield'), utility: find('utility_emp') };
const level99Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_repair'), utility: find('utility_booster') };
// Fix: 'utility_stealth' does not exist. Replaced with 'utility_emp' for a challenging final boss encounter.
const level100Opponent: RobotBuild = { chassis: find('chassis_heavy'), weapon: find('weapon_missile'), defense: find('defense_shield'), utility: find('utility_emp') }; // ULTIMATE BOSS


// --- Campaign Levels Array ---

export const campaignLevels: CampaignLevel[] = [
    { level: 1, titleKey: 'campaign_level_1_title', descriptionKey: 'campaign_level_1_desc', opponentBuild: level1Opponent },
    { level: 2, titleKey: 'campaign_level_2_title', descriptionKey: 'campaign_level_2_desc', opponentBuild: level2Opponent },
    { level: 3, titleKey: 'campaign_level_3_title', descriptionKey: 'campaign_level_3_desc', opponentBuild: level3Opponent, playerMaxEp: 90 },
    { level: 4, titleKey: 'campaign_level_4_title', descriptionKey: 'campaign_level_4_desc', opponentBuild: level4Opponent },
    { level: 5, titleKey: 'campaign_level_5_title', descriptionKey: 'campaign_level_5_desc', opponentBuild: level5Opponent },
    { level: 6, titleKey: 'campaign_level_6_title', descriptionKey: 'campaign_level_6_desc', opponentBuild: level6Opponent, playerMaxEp: 95 },
    { level: 7, titleKey: 'campaign_level_7_title', descriptionKey: 'campaign_level_7_desc', opponentBuild: level7Opponent },
    { level: 8, titleKey: 'campaign_level_8_title', descriptionKey: 'campaign_level_8_desc', opponentBuild: level8Opponent },
    { level: 9, titleKey: 'campaign_level_9_title', descriptionKey: 'campaign_level_9_desc', opponentBuild: level9Opponent, playerMaxEp: 100 },
    { level: 10, titleKey: 'campaign_level_10_title', descriptionKey: 'campaign_level_10_desc', opponentBuild: level10Opponent },
    { level: 11, titleKey: 'campaign_level_11_title', descriptionKey: 'campaign_level_11_desc', opponentBuild: level11Opponent },
    { level: 12, titleKey: 'campaign_level_12_title', descriptionKey: 'campaign_level_12_desc', opponentBuild: level12Opponent, playerMaxEp: 90 },
    { level: 13, titleKey: 'campaign_level_13_title', descriptionKey: 'campaign_level_13_desc', opponentBuild: level13Opponent },
    { level: 14, titleKey: 'campaign_level_14_title', descriptionKey: 'campaign_level_14_desc', opponentBuild: level14Opponent },
    { level: 15, titleKey: 'campaign_level_15_title', descriptionKey: 'campaign_level_15_desc', opponentBuild: level15Opponent, playerMaxEp: 85 },
    { level: 16, titleKey: 'campaign_level_16_title', descriptionKey: 'campaign_level_16_desc', opponentBuild: level16Opponent },
    { level: 17, titleKey: 'campaign_level_17_title', descriptionKey: 'campaign_level_17_desc', opponentBuild: level17Opponent },
    { level: 18, titleKey: 'campaign_level_18_title', descriptionKey: 'campaign_level_18_desc', opponentBuild: level18Opponent, playerMaxEp: 95 },
    { level: 19, titleKey: 'campaign_level_19_title', descriptionKey: 'campaign_level_19_desc', opponentBuild: level19Opponent },
    { level: 20, titleKey: 'campaign_level_20_title', descriptionKey: 'campaign_level_20_desc', opponentBuild: level20Opponent },
    { level: 21, titleKey: 'campaign_level_21_title', descriptionKey: 'campaign_level_21_desc', opponentBuild: level21Opponent, playerMaxEp: 80 },
    { level: 22, titleKey: 'campaign_level_22_title', descriptionKey: 'campaign_level_22_desc', opponentBuild: level22Opponent },
    { level: 23, titleKey: 'campaign_level_23_title', descriptionKey: 'campaign_level_23_desc', opponentBuild: level23Opponent },
    { level: 24, titleKey: 'campaign_level_24_title', descriptionKey: 'campaign_level_24_desc', opponentBuild: level24Opponent, playerMaxEp: 90 },
    { level: 25, titleKey: 'campaign_level_25_title', descriptionKey: 'campaign_level_25_desc', opponentBuild: level25Opponent },
    { level: 26, titleKey: 'campaign_level_26_title', descriptionKey: 'campaign_level_26_desc', opponentBuild: level26Opponent },
    { level: 27, titleKey: 'campaign_level_27_title', descriptionKey: 'campaign_level_27_desc', opponentBuild: level27Opponent, playerMaxEp: 85 },
    { level: 28, titleKey: 'campaign_level_28_title', descriptionKey: 'campaign_level_28_desc', opponentBuild: level28Opponent },
    { level: 29, titleKey: 'campaign_level_29_title', descriptionKey: 'campaign_level_29_desc', opponentBuild: level29Opponent },
    { level: 30, titleKey: 'campaign_level_30_title', descriptionKey: 'campaign_level_30_desc', opponentBuild: level30Opponent, playerMaxEp: 100 },
    { level: 31, titleKey: 'campaign_level_31_title', descriptionKey: 'campaign_level_31_desc', opponentBuild: level31Opponent, playerMaxEp: 95 },
    { level: 32, titleKey: 'campaign_level_32_title', descriptionKey: 'campaign_level_32_desc', opponentBuild: level32Opponent },
    { level: 33, titleKey: 'campaign_level_33_title', descriptionKey: 'campaign_level_33_desc', opponentBuild: level33Opponent },
    { level: 34, titleKey: 'campaign_level_34_title', descriptionKey: 'campaign_level_34_desc', opponentBuild: level34Opponent, playerMaxEp: 90 },
    { level: 35, titleKey: 'campaign_level_35_title', descriptionKey: 'campaign_level_35_desc', opponentBuild: level35Opponent },
    { level: 36, titleKey: 'campaign_level_36_title', descriptionKey: 'campaign_level_36_desc', opponentBuild: level36Opponent },
    { level: 37, titleKey: 'campaign_level_37_title', descriptionKey: 'campaign_level_37_desc', opponentBuild: level37Opponent, playerMaxEp: 95 },
    { level: 38, titleKey: 'campaign_level_38_title', descriptionKey: 'campaign_level_38_desc', opponentBuild: level38Opponent },
    { level: 39, titleKey: 'campaign_level_39_title', descriptionKey: 'campaign_level_39_desc', opponentBuild: level39Opponent },
    { level: 40, titleKey: 'campaign_level_40_title', descriptionKey: 'campaign_level_40_desc', opponentBuild: level40Opponent },
    { level: 41, titleKey: 'campaign_level_41_title', descriptionKey: 'campaign_level_41_desc', opponentBuild: level41Opponent, playerMaxEp: 85 },
    { level: 42, titleKey: 'campaign_level_42_title', descriptionKey: 'campaign_level_42_desc', opponentBuild: level42Opponent },
    { level: 43, titleKey: 'campaign_level_43_title', descriptionKey: 'campaign_level_43_desc', opponentBuild: level43Opponent },
    { level: 44, titleKey: 'campaign_level_44_title', descriptionKey: 'campaign_level_44_desc', opponentBuild: level44Opponent },
    { level: 45, titleKey: 'campaign_level_45_title', descriptionKey: 'campaign_level_45_desc', opponentBuild: level45Opponent, playerMaxEp: 90 },
    { level: 46, titleKey: 'campaign_level_46_title', descriptionKey: 'campaign_level_46_desc', opponentBuild: level46Opponent },
    { level: 47, titleKey: 'campaign_level_47_title', descriptionKey: 'campaign_level_47_desc', opponentBuild: level47Opponent },
    { level: 48, titleKey: 'campaign_level_48_title', descriptionKey: 'campaign_level_48_desc', opponentBuild: level48Opponent, playerMaxEp: 95 },
    { level: 49, titleKey: 'campaign_level_49_title', descriptionKey: 'campaign_level_49_desc', opponentBuild: level49Opponent },
    { level: 50, titleKey: 'campaign_level_50_title', descriptionKey: 'campaign_level_50_desc', opponentBuild: level50Opponent },
    { level: 51, titleKey: 'campaign_level_51_title', descriptionKey: 'campaign_level_51_desc', opponentBuild: level51Opponent, playerMaxEp: 80 },
    { level: 52, titleKey: 'campaign_level_52_title', descriptionKey: 'campaign_level_52_desc', opponentBuild: level52Opponent },
    { level: 53, titleKey: 'campaign_level_53_title', descriptionKey: 'campaign_level_53_desc', opponentBuild: level53Opponent },
    { level: 54, titleKey: 'campaign_level_54_title', descriptionKey: 'campaign_level_54_desc', opponentBuild: level54Opponent },
    { level: 55, titleKey: 'campaign_level_55_title', descriptionKey: 'campaign_level_55_desc', opponentBuild: level55Opponent, playerMaxEp: 90 },
    { level: 56, titleKey: 'campaign_level_56_title', descriptionKey: 'campaign_level_56_desc', opponentBuild: level56Opponent },
    { level: 57, titleKey: 'campaign_level_57_title', descriptionKey: 'campaign_level_57_desc', opponentBuild: level57Opponent },
    { level: 58, titleKey: 'campaign_level_58_title', descriptionKey: 'campaign_level_58_desc', opponentBuild: level58Opponent, playerMaxEp: 95 },
    { level: 59, titleKey: 'campaign_level_59_title', descriptionKey: 'campaign_level_59_desc', opponentBuild: level59Opponent },
    { level: 60, titleKey: 'campaign_level_60_title', descriptionKey: 'campaign_level_60_desc', opponentBuild: level60Opponent },
    { level: 61, titleKey: 'campaign_level_61_title', descriptionKey: 'campaign_level_61_desc', opponentBuild: level61Opponent, playerMaxEp: 85 },
    { level: 62, titleKey: 'campaign_level_62_title', descriptionKey: 'campaign_level_62_desc', opponentBuild: level62Opponent },
    { level: 63, titleKey: 'campaign_level_63_title', descriptionKey: 'campaign_level_63_desc', opponentBuild: level63Opponent },
    { level: 64, titleKey: 'campaign_level_64_title', descriptionKey: 'campaign_level_64_desc', opponentBuild: level64Opponent },
    { level: 65, titleKey: 'campaign_level_65_title', descriptionKey: 'campaign_level_65_desc', opponentBuild: level65Opponent, playerMaxEp: 90 },
    { level: 66, titleKey: 'campaign_level_66_title', descriptionKey: 'campaign_level_66_desc', opponentBuild: level66Opponent },
    { level: 67, titleKey: 'campaign_level_67_title', descriptionKey: 'campaign_level_67_desc', opponentBuild: level67Opponent },
    { level: 68, titleKey: 'campaign_level_68_title', descriptionKey: 'campaign_level_68_desc', opponentBuild: level68Opponent, playerMaxEp: 95 },
    { level: 69, titleKey: 'campaign_level_69_title', descriptionKey: 'campaign_level_69_desc', opponentBuild: level69Opponent },
    { level: 70, titleKey: 'campaign_level_70_title', descriptionKey: 'campaign_level_70_desc', opponentBuild: level70Opponent },
    { level: 71, titleKey: 'campaign_level_71_title', descriptionKey: 'campaign_level_71_desc', opponentBuild: level71Opponent, playerMaxEp: 80 },
    { level: 72, titleKey: 'campaign_level_72_title', descriptionKey: 'campaign_level_72_desc', opponentBuild: level72Opponent },
    { level: 73, titleKey: 'campaign_level_73_title', descriptionKey: 'campaign_level_73_desc', opponentBuild: level73Opponent },
    { level: 74, titleKey: 'campaign_level_74_title', descriptionKey: 'campaign_level_74_desc', opponentBuild: level74Opponent },
    { level: 75, titleKey: 'campaign_level_75_title', descriptionKey: 'campaign_level_75_desc', opponentBuild: level75Opponent, playerMaxEp: 90 },
    { level: 76, titleKey: 'campaign_level_76_title', descriptionKey: 'campaign_level_76_desc', opponentBuild: level76Opponent },
    { level: 77, titleKey: 'campaign_level_77_title', descriptionKey: 'campaign_level_77_desc', opponentBuild: level77Opponent },
    { level: 78, titleKey: 'campaign_level_78_title', descriptionKey: 'campaign_level_78_desc', opponentBuild: level78Opponent, playerMaxEp: 95 },
    { level: 79, titleKey: 'campaign_level_79_title', descriptionKey: 'campaign_level_79_desc', opponentBuild: level79Opponent },
    { level: 80, titleKey: 'campaign_level_80_title', descriptionKey: 'campaign_level_80_desc', opponentBuild: level80Opponent },
    { level: 81, titleKey: 'campaign_level_81_title', descriptionKey: 'campaign_level_81_desc', opponentBuild: level81Opponent, playerMaxEp: 85 },
    { level: 82, titleKey: 'campaign_level_82_title', descriptionKey: 'campaign_level_82_desc', opponentBuild: level82Opponent },
    { level: 83, titleKey: 'campaign_level_83_title', descriptionKey: 'campaign_level_83_desc', opponentBuild: level83Opponent },
    { level: 84, titleKey: 'campaign_level_84_title', descriptionKey: 'campaign_level_84_desc', opponentBuild: level84Opponent },
    { level: 85, titleKey: 'campaign_level_85_title', descriptionKey: 'campaign_level_85_desc', opponentBuild: level85Opponent, playerMaxEp: 90 },
    { level: 86, titleKey: 'campaign_level_86_title', descriptionKey: 'campaign_level_86_desc', opponentBuild: level86Opponent },
    { level: 87, titleKey: 'campaign_level_87_title', descriptionKey: 'campaign_level_87_desc', opponentBuild: level87Opponent },
    { level: 88, titleKey: 'campaign_level_88_title', descriptionKey: 'campaign_level_88_desc', opponentBuild: level88Opponent, playerMaxEp: 95 },
    { level: 89, titleKey: 'campaign_level_89_title', descriptionKey: 'campaign_level_89_desc', opponentBuild: level89Opponent },
    { level: 90, titleKey: 'campaign_level_90_title', descriptionKey: 'campaign_level_90_desc', opponentBuild: level90Opponent },
    { level: 91, titleKey: 'campaign_level_91_title', descriptionKey: 'campaign_level_91_desc', opponentBuild: level91Opponent, playerMaxEp: 80 },
    { level: 92, titleKey: 'campaign_level_92_title', descriptionKey: 'campaign_level_92_desc', opponentBuild: level92Opponent },
    { level: 93, titleKey: 'campaign_level_93_title', descriptionKey: 'campaign_level_93_desc', opponentBuild: level93Opponent },
    { level: 94, titleKey: 'campaign_level_94_title', descriptionKey: 'campaign_level_94_desc', opponentBuild: level94Opponent },
    { level: 95, titleKey: 'campaign_level_95_title', descriptionKey: 'campaign_level_95_desc', opponentBuild: level95Opponent, playerMaxEp: 90 },
    { level: 96, titleKey: 'campaign_level_96_title', descriptionKey: 'campaign_level_96_desc', opponentBuild: level96Opponent },
    { level: 97, titleKey: 'campaign_level_97_title', descriptionKey: 'campaign_level_97_desc', opponentBuild: level97Opponent },
    { level: 98, titleKey: 'campaign_level_98_title', descriptionKey: 'campaign_level_98_desc', opponentBuild: level98Opponent, playerMaxEp: 95 },
    { level: 99, titleKey: 'campaign_level_99_title', descriptionKey: 'campaign_level_99_desc', opponentBuild: level99Opponent },
    { level: 100, titleKey: 'campaign_level_100_title', descriptionKey: 'campaign_level_100_desc', opponentBuild: level100Opponent },
];