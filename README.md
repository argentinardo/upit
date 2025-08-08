# Ninja Game - Proyecto Modular

Este proyecto ha sido modularizado para mejor organización y mantenimiento, pero mantiene compatibilidad con el sistema de deploy que requiere un archivo único.

## 📁 Estructura del Proyecto

```
upit/
├── modules/           # Módulos del código fuente
│   ├── assets.ts      # Inicialización de assets (imágenes, sonidos, música)
│   ├── utils.ts       # Funciones utilitarias (fases, UI, utilidades)
│   ├── spawners.ts    # Funciones de generación de objetos del juego
│   ├── animations.ts  # Animaciones y efectos visuales
│   └── index.ts       # Módulo principal que exporta todas las funciones
├── ninja.js          # Archivo único para deploy (generado automáticamente)
├── build.js          # Script de build que combina los módulos
├── build-simple.js   # Script de build simplificado
└── README.md         # Este archivo
```

## 🚀 Cómo Funciona

### Desarrollo
- **Edita los módulos** en la carpeta `modules/`
- Cada módulo tiene una responsabilidad específica
- Usa imports/exports de TypeScript para organización

### Deploy
- **Ejecuta el build**: `node build.js` o `node build-simple.js`
- El script combina todos los módulos en `ninja.js`
- El archivo `ninja.js` resultante es compatible con el sistema de deploy

## 📦 Módulos

### `assets.ts`
- Inicialización de todas las imágenes, sonidos y música
- Configuración de assets del framework LK

### `utils.ts`
- `getCurrentDifficultyLevel()`: Calcula la fase actual
- `isFeatureUnlocked()`: Verifica si una característica está desbloqueada
- `showCurrentPhase()`: Muestra el texto de fase actual
- `showPhaseInfo()`: Muestra información de fase con fondo
- `showAlert()`: Muestra alertas sobre el ninja
- `updateScore()`: Actualiza el display de puntuación
- `sortObjectsByDepth()`: Ordena objetos por profundidad

### `spawners.ts`
- Funciones para generar enemigos, obstáculos, nubes, etc.
- `spawnEnemy()`, `spawnEnemy2()`, `spawnEnemy3()`
- `spawnObstacle()`, `spawnCloud()`, `spawnTori()`
- `spawnTrees()`, `spawnAirplane()`, `spawnWoodenPlanks()`
- `throwNinjaStar()`: Lanza estrellas ninja

### `animations.ts`
- `animateGrassBackground()`: Animación del fondo de césped
- `updateWeaponIndicator()`: Actualiza indicadores de armas
- Efectos visuales y animaciones

## 🔧 Comandos

```bash
# Generar ninja.js para deploy (script completo)
node build.js

# Generar ninja.js para deploy (script simplificado)
node build-simple.js

# Verificar que el build fue exitoso
ls -la ninja.js
```

## 📝 Notas Importantes

1. **No edites `ninja.js` directamente** - Se regenera automáticamente
2. **Siempre edita los módulos** en la carpeta `modules/`
3. **Ejecuta el build** antes de hacer deploy
4. **El archivo `ninja.js`** debe mantenerse como un archivo único para el sistema de deploy

## 🎯 Beneficios de la Modularización

- ✅ **Mejor organización**: Código separado por responsabilidades
- ✅ **Mantenimiento fácil**: Cambios específicos en módulos específicos
- ✅ **Reutilización**: Funciones organizadas y reutilizables
- ✅ **Compatibilidad**: Mantiene el archivo único para deploy
- ✅ **Escalabilidad**: Fácil agregar nuevos módulos

## 🔄 Flujo de Trabajo

1. **Desarrollo**: Edita módulos en `modules/`
2. **Testing**: Prueba los cambios
3. **Build**: Ejecuta `node build.js` o `node build-simple.js`
4. **Deploy**: Usa el `ninja.js` generado

¡El proyecto está ahora modularizado pero mantiene la compatibilidad con tu sistema de deploy!
