/****
* Spawners Module
****/

export function spawnEnemy() {
    var enemy = new Enemy();
    enemy.x = Math.random() * 800 + 600; // Spawn between 600-1400
    enemy.y = horizonY;
    enemy.z = 2000 + Math.random() * 1000; // Spawn at distance 2000-3000
    enemy.baseX = enemy.x;
    enemy.speed = 2 + Math.random() * 2; // Speed between 2-4
    enemies.push(enemy);
    game.addChild(enemy);
    showAlert();
}

export function spawnEnemy2() {
    var enemy2 = new Enemy2();
    enemy2.x = Math.random() * 800 + 600;
    enemy2.y = horizonY;
    enemy2.z = 2000 + Math.random() * 1000;
    enemy2.baseX = enemy2.x;
    enemy2.speed = 2.5 + Math.random() * 2;
    enemies2.push(enemy2);
    game.addChild(enemy2);
    showAlert();
}

export function spawnEnemyArcher() {
    var archer = new EnemyArcher();
    archer.x = Math.random() * 800 + 600;
    archer.y = horizonY - 200; // Spawn higher than ground
    archer.z = 2000 + Math.random() * 1000;
    archer.baseX = archer.x;
    archer.speed = 1.5 + Math.random() * 1;
    enemyArchers.push(archer);
    game.addChild(archer);
    showAlert();
}

export function spawnEnemy3() {
    var enemy3 = new Enemy3();
    enemy3.x = Math.random() * 800 + 600;
    enemy3.y = horizonY;
    enemy3.z = 2000 + Math.random() * 1000;
    enemy3.baseX = enemy3.x;
    enemy3.speed = 3 + Math.random() * 2;
    enemies3.push(enemy3);
    game.addChild(enemy3);
    showAlert();
}

export function spawnObstacle() {
    var obstacleType = Math.random();
    var obstacle;
    if (obstacleType < 0.4) {
        obstacle = new Obstacle();
    } else if (obstacleType < 0.7) {
        obstacle = new RockObstacle();
    } else {
        obstacle = new SpikeObstacle();
    }
    obstacle.x = Math.random() * 800 + 600;
    obstacle.y = horizonY;
    obstacle.z = 2000 + Math.random() * 1000;
    obstacle.baseX = obstacle.x;
    obstacle.speed = 2 + Math.random() * 2;
    obstacles.push(obstacle);
    game.addChild(obstacle);
    showAlert();
}

export function spawnCloud() {
    var cloudType = Math.random();
    var cloud;
    if (cloudType < 0.7) {
        cloud = new Cloud();
    } else if (cloudType < 0.85) {
        cloud = new electroCloud();
    } else {
        cloud = new CloudType3();
    }
    cloud.x = Math.random() * 1200 + 400;
    cloud.y = horizonY - 50 + Math.random() * 100 - 50;
    cloud.baseY = cloud.y;
    cloud.z = 2000 + Math.random() * 1000;
    clouds.push(cloud);
    game.addChild(cloud);
}

export function spawnTori() {
    var tori = new Tori();
    tori.x = Math.random() * 800 + 600;
    tori.y = horizonY;
    tori.z = 2000 + Math.random() * 1000;
    tori.baseX = tori.x;
    tori.speed = 2 + Math.random() * 2;
    toris.push(tori);
    game.addChild(tori);
    showAlert();
}

export function spawnTrees() {
    // Left side tree
    var leftTreeType = Math.random();
    var leftTree;
    if (leftTreeType < 0.33) {
        leftTree = new Tree();
    } else if (leftTreeType < 0.66) {
        leftTree = new TreeType2();
    } else {
        leftTree = new TreeType3();
    }
    leftTree.x = 1024;
    leftTree.y = horizonY;
    leftTree.z = 2000 + Math.random() * 1000;
    leftTree.side = -1;
    trees.push(leftTree);
    game.addChild(leftTree);
    
    // Right side tree
    var rightTreeType = Math.random();
    var rightTree;
    if (rightTreeType < 0.33) {
        rightTree = new Tree();
    } else if (rightTreeType < 0.66) {
        rightTree = new TreeType2();
    } else {
        rightTree = new TreeType3();
    }
    rightTree.x = 1024;
    rightTree.y = horizonY;
    rightTree.z = 2500 + Math.random() * 1000;
    rightTree.side = 1;
    trees.push(rightTree);
    game.addChild(rightTree);
}

export function spawnAirplane() {
    var airplane = new Airplane();
    airplane.x = Math.random() * 800 + 600;
    airplane.y = horizonY - 300 + Math.random() * 200;
    airplane.z = 2000 + Math.random() * 1000;
    airplane.baseX = airplane.x;
    airplane.speed = 3 + Math.random() * 2;
    airplanes.push(airplane);
    game.addChild(airplane);
    showAlert();
}

export function dropPowerUp(airplane: any) {
    var powerUpType = Math.random() < 0.5 ? 1 : 2;
    var powerUp = new PowerUp(powerUpType);
    powerUp.x = airplane.x;
    powerUp.y = airplane.y;
    powerUp.z = airplane.z;
    powerUp.baseX = powerUp.x;
    powerUp.speed = 1;
    powerUps.push(powerUp);
    game.addChild(powerUp);
}

export function spawnWoodenPlanks() {
    var plank = new WoodenPlank();
    plank.x = 1024;
    plank.y = horizonY;
    plank.z = 2000 + Math.random() * 1000;
    plank.baseX = plank.x;
    plank.speed = 2 + Math.random() * 2;
    woodenPlanks.push(plank);
    game.addChild(plank);
}

export function throwNinjaStar(targetX: number, targetY: number) {
    var star = new NinjaStar();
    star.x = ninja.x;
    star.y = ninja.y - 250; // Position above ninja head instead of below
    // Calculate direction
    var dx = targetX - star.x;
    var dy = targetY - star.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    // Normalize and set velocity
    star.velocityX = dx / distance * star.speed;
    star.velocityY = dy / distance * star.speed;
    ninjaStars.push(star);
    // Add ninja star behind ninja so it appears from behind his body
    var ninjaIndex = game.children.indexOf(ninja);
    if (ninjaIndex !== -1) {
        game.addChildAt(star, ninjaIndex);
    } else {
        game.addChild(star);
    }
    LK.getSound('throw').play();
}




