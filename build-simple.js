const fs = require('fs');

// Función para leer un archivo
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// Función para extraer el contenido de las funciones exportadas
function extractExportedFunctions(content) {
    const lines = content.split('\n');
    const functions = [];
    let currentFunction = '';
    let inFunction = false;
    let braceCount = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Buscar funciones exportadas
        if (line.includes('export function') || line.includes('export const')) {
            inFunction = true;
            currentFunction = line + '\n';
            braceCount = 0;
            continue;
        }
        
        if (inFunction) {
            currentFunction += line + '\n';
            
            // Contar llaves para saber cuándo termina la función
            for (let j = 0; j < line.length; j++) {
                if (line[j] === '{') braceCount++;
                if (line[j] === '}') braceCount--;
            }
            
            // Si las llaves están balanceadas, la función terminó
            if (braceCount === 0) {
                functions.push(currentFunction);
                currentFunction = '';
                inFunction = false;
            }
        }
    }
    
    return functions;
}

// Función principal de build
function buildNinjaJs() {
    console.log('🚀 Iniciando build de ninja.js...');
    
    // Leer el archivo original
    const originalContent = readFile('ninja.js');
    console.log('📄 Archivo original:', (originalContent.length / 1024).toFixed(2), 'KB,', originalContent.split('\n').length, 'líneas');
    
    // Leer todos los módulos
    const modules = [
        'modules/assets.ts',
        'modules/utils.ts', 
        'modules/spawners.ts',
        'modules/animations.ts'
    ];
    
    let modularFunctions = '';
    
    // Procesar cada módulo
    for (const modulePath of modules) {
        console.log(`📦 Procesando: ${modulePath}`);
        
        if (fs.existsSync(modulePath)) {
            const content = readFile(modulePath);
            
            // Extraer funciones exportadas
            const functions = extractExportedFunctions(content);
            console.log(`   - Encontradas ${functions.length} funciones`);
            
            // Agregar comentario del módulo
            const moduleName = modulePath.split('/')[1].replace('.ts', '');
            modularFunctions += `// === ${moduleName.toUpperCase()} MODULE ===\n`;
            
            // Agregar funciones
            for (const func of functions) {
                // Remover 'export ' de las funciones
                const cleanFunc = func.replace(/export /g, '');
                modularFunctions += cleanFunc + '\n';
            }
            
            modularFunctions += '\n';
        } else {
            console.warn(`⚠️  Módulo no encontrado: ${modulePath}`);
        }
    }
    
    // Crear el contenido final
    let finalContent = '/****\n';
    finalContent += '* Ninja Game - Built from modular source\n';
    finalContent += '* Generated automatically - Do not edit directly\n';
    finalContent += '****/\n\n';
    
    // Agregar las funciones modulares
    finalContent += modularFunctions;
    
    // Buscar el punto donde terminan los assets en el archivo original
    // Buscar después de la última línea de música
    const musicLines = originalContent.split('\n').filter(line => line.includes('LK.init.music'));
    if (musicLines.length > 0) {
        const lastMusicLine = musicLines[musicLines.length - 1];
        const lastMusicIndex = originalContent.lastIndexOf(lastMusicLine);
        
        if (lastMusicIndex !== -1) {
            // Buscar el final de esa línea
            const endOfMusicLine = originalContent.indexOf('\n', lastMusicIndex);
            if (endOfMusicLine !== -1) {
                const afterAssets = originalContent.substring(endOfMusicLine + 1);
                finalContent += afterAssets;
                console.log('📄 Agregando contenido después de assets...');
            } else {
                finalContent += originalContent.substring(lastMusicIndex);
            }
        } else {
            finalContent += originalContent;
        }
    } else {
        // Si no encuentra música, agregar todo el contenido
        finalContent += originalContent;
    }
    
    // Escribir el archivo combinado
    fs.writeFileSync('ninja.js', finalContent);
    console.log('✅ Build completado: ninja.js generado exitosamente');
    console.log('📊 Tamaño del archivo:', (finalContent.length / 1024).toFixed(2), 'KB');
    console.log('📄 Líneas totales:', finalContent.split('\n').length);
}

// Ejecutar build
buildNinjaJs();
