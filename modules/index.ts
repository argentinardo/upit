/****
* Main Module - Exports all functions from other modules
****/

// Import all modules
import { initAssets } from './assets';
import { 
    getCurrentDifficultyLevel, 
    isFeatureUnlocked, 
    showCurrentPhase, 
    showPhaseInfo, 
    showAlert, 
    updateScore, 
    sortObjectsByDepth 
} from './utils';
import {
    spawnEnemy,
    spawnEnemy2,
    spawnEnemyArcher,
    spawnEnemy3,
    spawnObstacle,
    spawnCloud,
    spawnTori,
    spawnTrees,
    spawnAirplane,
    dropPowerUp,
    spawnWoodenPlanks,
    throwNinjaStar
} from './spawners';
import {
    animateGrassBackground,
    updateWeaponIndicator
} from './animations';

// Export all functions
export {
    // Assets
    initAssets,
    
    // Utils
    getCurrentDifficultyLevel,
    isFeatureUnlocked,
    showCurrentPhase,
    showPhaseInfo,
    showAlert,
    updateScore,
    sortObjectsByDepth,
    
    // Spawners
    spawnEnemy,
    spawnEnemy2,
    spawnEnemyArcher,
    spawnEnemy3,
    spawnObstacle,
    spawnCloud,
    spawnTori,
    spawnTrees,
    spawnAirplane,
    dropPowerUp,
    spawnWoodenPlanks,
    throwNinjaStar,
    
    // Animations
    animateGrassBackground,
    updateWeaponIndicator
};




