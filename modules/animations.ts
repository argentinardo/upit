/****
* Animations Module
****/

export function animateGrassBackground() {
    // Stop background animation when ninja is in casa ninja
    if (isInCasaNinja) {
        // Continue animation loop but don't update positions
        tween({}, {}, {
            duration: 16,
            // ~60fps update rate
            easing: tween.linear,
            onFinish: function onFinish() {
                animateGrassBackground();
            }
        });
        return;
    }
    
    // Update background animation timer
    grassAnimationTimer++;
    
    // Enhanced forward motion effect - move tiles faster for ninja advancement illusion
    for (var i = 0; i < greenBackgrounds.length; i++) {
        var tile = greenBackgrounds[i];
        // Move tiles forward with perspective-based speed
        tile.z -= tile.perspectiveScale * 0.5; // Faster movement based on perspective scale
        
        // Reset tile when it goes off-screen
        if (tile.z < -500) {
            tile.z = 3000 + Math.random() * 1000; // Reset to far distance
            tile.x = tile.originalX + (Math.random() - 0.5) * 200; // Slight horizontal variation
        }
        
        // Update Y position for forward motion effect
        var progress = (tile.z - 3000) / (0 - 3000); // Progress from far to near
        tile.y = tile.originalY + progress * 100; // Move down as it gets closer
        
        // Update X position for slight horizontal movement
        tile.x = tile.originalX + Math.sin(grassAnimationTimer * 0.01 + tile.rowIndex) * 10;
    }
    
    // Continue animation loop
    tween({}, {}, {
        duration: 16,
        // ~60fps update rate
        easing: tween.linear,
        onFinish: function onFinish() {
            animateGrassBackground();
        }
    });
}

export function updateWeaponIndicator() {
    if (hasWoodenStarPower) {
        // Show wooden star indicator
        if (!game.woodenStarIndicator) {
            game.woodenStarIndicator = LK.getAsset('wooden-start', {
                anchorX: 0.5,
                anchorY: 0.5,
                x: 1900,
                y: 200,
                scaleX: 0.8,
                scaleY: 0.8
            });
            game.addChild(game.woodenStarIndicator);
        }
        
        // Start spinning animation
        if (!game.woodenStarIndicator.isSpinning) {
            game.woodenStarIndicator.isSpinning = true;
            startWoodenStarSpinning();
        }
    } else {
        // Hide wooden star indicator
        if (game.woodenStarIndicator) {
            game.woodenStarIndicator.destroy();
            game.woodenStarIndicator = null;
        }
    }
    
    if (hasIcePower) {
        // Show ice power indicator
        if (!game.icePowerIndicator) {
            game.icePowerIndicator = LK.getAsset('Ice-horiuken', {
                anchorX: 0.5,
                anchorY: 0.5,
                x: 1900,
                y: 300,
                scaleX: 0.8,
                scaleY: 0.8
            });
            game.addChild(game.icePowerIndicator);
        }
    } else {
        // Hide ice power indicator
        if (game.icePowerIndicator) {
            game.icePowerIndicator.destroy();
            game.icePowerIndicator = null;
        }
    }
}

function startWoodenStarSpinning() {
    if (!game.woodenStarIndicator || !game.woodenStarIndicator.isSpinning) {
        return;
    }
    
    tween(game.woodenStarIndicator, {
        rotation: game.woodenStarIndicator.rotation + Math.PI * 2
    }, {
        duration: 1000,
        easing: tween.linear,
        onFinish: function onFinish() {
            if (game.woodenStarIndicator && game.woodenStarIndicator.isSpinning) {
                startWoodenStarSpinning();
            }
        }
    });
}




