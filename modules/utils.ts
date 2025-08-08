/****
* Utils Module
****/

export function getCurrentDifficultyLevel() {
    return Math.min(casaNinjaVisitCount + 1, 4);
}

export function isFeatureUnlocked(feature: string) {
    var currentPhase = getCurrentDifficultyLevel();
    
    switch (feature) {
        case 'enemies':
            return currentPhase >= 1;
        case 'enemy2':
            return currentPhase >= 2;
        case 'enemy3':
            return currentPhase >= 3;
        case 'toris':
            return currentPhase >= 2;
        case 'clouds':
            return currentPhase >= 3;
        case 'airplanes':
            return currentPhase >= 3;
        case 'archers':
            return currentPhase >= 4;
        case 'sun':
            return currentPhase >= 3;
        default:
            return false;
    }
}

export function showCurrentPhase() {
    var currentPhase = getCurrentDifficultyLevel();
    var phaseText = 'FASE ' + currentPhase;

    // Si no existe el display de fase, lo creamos una sola vez
    if (!game.phaseDisplay) {
        game.phaseDisplay = new Text2(phaseText, {
            size: 82,
            fill: 0xFFD700,
            font: "'Arial Black', 'Impact', 'Helvetica Bold', sans-serif"
        });
        game.phaseDisplay.anchor.set(0.5, 0.5);

        // Posicionar centrado horizontal y arriba del score
        game.phaseDisplay.x = 1024; // centro horizontal (2048/2)
        game.phaseDisplay.y = 80;   // arriba del score, cerca del borde superior

        // Inicializar estilo si no existe
        if (!game.phaseDisplay.style) {
            game.phaseDisplay.style = {};
        }
        // Sombra y efecto 3D igual que el score
        game.phaseDisplay.style.dropShadow = true;
        game.phaseDisplay.style.dropShadowColor = "#000000";
        game.phaseDisplay.style.dropShadowDistance = 4;
        game.phaseDisplay.style.dropShadowAngle = Math.PI / 4;

        // Agregar al juego en una posición alta para que esté por encima de otros elementos
        game.addChild(game.phaseDisplay);
    }

    // Actualizar el texto siempre para asegurar que esté sincronizado
    game.phaseDisplay.setText(phaseText);
}

export function showPhaseInfo() {
    if (!isInCasaNinja || !casaNinja) {
        return;
    }
    var currentPhase = getCurrentDifficultyLevel();
    var message = '';
    switch (currentPhase) {
        case 1:
            message = 'PHASE 1: Basic enemies and obstacles';
            break;
        case 2:
            message = 'PHASE 2: TORIS will appear\nDon\'t jump to pass without damage!';
            break;
        case 3:
            message = 'PHASE 3: Electric clouds and airplanes\nBeware of lightning!';
            break;
        case 4:
            message = 'PHASE 4: Ninja archers\nKill them before they shoot or jump the arrow!';
            break;
    }
    
    // Crear el fondo de indicaciones (60% del ancho y 50% del alto de la pantalla)
    var backgroundWidth = 2048 * 0.6; // 60% del ancho de pantalla
    var backgroundHeight = 2732 * 0.5; // 50% del alto de pantalla
    var backgroundX = 1024; // Centrado horizontalmente
    var backgroundY = 1366 + 200; // Centrado verticalmente pero más abajo
    
    // Crear el fondo usando el asset "indicaciones"
    var backgroundImage = LK.getAsset('indicaciones', {
        anchorX: 0.5,
        anchorY: 0.5,
        x: backgroundX,
        y: backgroundY,
        scaleX: backgroundWidth / 100, // Asumiendo que el asset original tiene 100px de ancho
        scaleY: backgroundHeight / 100  // Asumiendo que el asset original tiene 100px de alto
    });
    
    // Calcular el área de texto disponible dentro del fondo (con 5% de margen)
    var textAreaWidth = backgroundWidth * 0.9; // 90% del ancho del fondo (5% margen en cada lado)
    var textAreaHeight = backgroundHeight * 0.9; // 90% del alto del fondo (5% margen en cada lado)
    
    // Mantener el tamaño actual del texto (76px) ya que el fondo es más ancho
    var textSize = 76; // Tamaño fijo del texto
    
    // Create phase info text with dark color for better readability
    var phaseInfo = new Text2(message, {
        size: textSize,
        fill: 0x1a1a1a, // Color oscuro (casi negro)
        font: "'Arial Black', 'Impact', 'Helvetica Bold', sans-serif"
    });
    phaseInfo.anchor.set(0.5, 0.5);
    phaseInfo.x = backgroundX; // Centrado sobre el fondo
    phaseInfo.y = backgroundY; // Centrado sobre el fondo
    
    // Initialize style object if it doesn't exist
    if (!phaseInfo.style) {
        phaseInfo.style = {};
    }
    // Add 3D bold effects with enhanced drop shadow (same as score)
    phaseInfo.style.dropShadow = true;
    phaseInfo.style.dropShadowColor = "#000000";
    phaseInfo.style.dropShadowDistance = 4;
    phaseInfo.style.dropShadowAngle = Math.PI / 4;
    
    // Agregar primero el fondo y luego el texto
    game.addChild(backgroundImage);
    game.addChild(phaseInfo);
    
    // Remove after 10 seconds
    LK.setTimeout(function () {
        if (phaseInfo && phaseInfo.parent) {
            phaseInfo.destroy();
        }
        if (backgroundImage && backgroundImage.parent) {
            backgroundImage.destroy();
        }
    }, 10000);
}

export function showAlert() {
    if (!ninja) {
        return;
    }
    var alert = new Alert();
    alert.x = ninja.x;
    alert.y = ninja.y - 900; // Position above ninja head
    alerts.push(alert);
    game.addChild(alert);
    // Play alert sound
    try {
        LK.getSound('alert-sound').play();
    } catch (e) {
        // Fallback sound if alert-sound doesn't work
        LK.getSound('jump').play();
    }
}

export function updateScore() {
    if (game.scoreDisplay) {
        game.scoreDisplay.setText('Score: ' + LK.getScore());
    }
}

export function sortObjectsByDepth() {
    // Sort game children by z-index for proper layering
    var children = game.children.slice();
    children.sort(function(a, b) {
        return (a.z || 0) - (b.z || 0);
    });
    
    // Re-add children in sorted order
    for (var i = 0; i < children.length; i++) {
        game.addChildAt(children[i], i);
    }
}




