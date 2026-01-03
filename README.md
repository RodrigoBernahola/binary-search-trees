# Template de Desarrollo Web Moderno

Plantilla preconfigurada con Webpack, ESLint, Prettier y herramientas de desarrollo modernas.

## 🚀 Características

- ⚡ **Webpack 5** - Empaquetado y optimización de código
- 🎨 **CSS Loader** - Soporte para estilos CSS
- 🔍 **ESLint** - Análisis de código y detección de errores
- 💅 **Prettier** - Formateo automático de código
- 🔥 **Hot Reload** - Recarga automática en desarrollo
- 📦 **Optimización para producción** - Código minificado y optimizado

## 📋 Requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Entrar al directorio
cd practica-npm-config

# Instalar dependencias
npm install
```

## 🎯 Comandos disponibles

### Desarrollo

```bash
npm run dev           # Inicia servidor de desarrollo en http://localhost:8080
```

### Producción

```bash
npm run build         # Genera build optimizado en carpeta dist/
```

### Calidad de código

```bash
npm run lint          # Analiza todo el código con ESLint
npm run lint:fix      # Corrige errores automáticamente
npm run lint:src      # Analiza solo carpeta src/
npm run lint:src:fix  # Corrige errores solo en src/
```

### Formateo

```bash
npm run format        # Formatea todo el código con Prettier
npm run format:check  # Verifica formato sin modificar
npm run format:src    # Formatea solo carpeta src/
```

## 📁 Estructura del proyecto

```
proyecto/
├── src/                    # Código fuente
│   ├── index.js           # Punto de entrada JavaScript
│   ├── styles.css         # Estilos principales
│   └── template.html      # Plantilla HTML
├── dist/                   # Build generado (no versionar)
├── node_modules/          # Dependencias (no versionar)
├── webpack.common.js      # Configuración compartida de Webpack
├── webpack.dev.js         # Configuración para desarrollo
├── webpack.prod.js        # Configuración para producción
├── eslint.config.js       # Configuración de ESLint
├── .prettierrc.json       # Configuración de Prettier
├── .prettierignore        # Archivos ignorados por Prettier
├── .gitignore             # Archivos ignorados por Git
└── package.json           # Dependencias y scripts
```

## 🔧 Configuración

### Webpack

- `webpack.common.js`: Configuración base compartida
- `webpack.dev.js`: Modo desarrollo con source maps
- `webpack.prod.js`: Modo producción con optimizaciones

### ESLint

Configurado con:

- Reglas recomendadas de ESLint
- Integración con Prettier
- Soporte para ES2024

### Prettier

Configurado con:

- Punto y coma al final
- Comillas simples
- 80 caracteres por línea
- 2 espacios de indentación

## 📝 Flujo de trabajo recomendado

1. **Desarrollo**: `npm run dev`
2. **Escribir código** en `src/`
3. **Guardar cambios** (auto-formato con editor)
4. **Revisar código**: `npm run lint`
5. **Build producción**: `npm run build`

## 📄 Licencia

ISC

## ✍️ Autor

Rodrigo Bernahola
