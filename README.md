# Personal Task Manager

Una aplicación moderna de gestión de tareas construida con React, TypeScript y Vite. Esta aplicación permite a los usuarios crear, gestionar y organizar sus tareas de manera eficiente con una interfaz de usuario intuitiva y responsive.

## 🚀 Características

- **Gestión de Tareas**: Crear, editar y eliminar tareas
- **Filtrado Inteligente**: Filtrar tareas por estado (todas, completadas)
- **Interfaz Virtualizada**: Lista de tareas optimizada para grandes volúmenes de datos
- **Estado Global**: Gestión de estado centralizada con React Context
- **Diseño Responsive**: Interfaz adaptativa para diferentes dispositivos
- **Manejo de Errores**: Sistema robusto de manejo de errores con Error Boundaries
- **Testing**: Configuración completa de testing con Vitest y Testing Library

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19.1.0**: Biblioteca de interfaz de usuario
- **TypeScript 5.8.3**: Tipado estático para JavaScript
- **Vite 7.0.4**: Herramienta de construcción y desarrollo
- **Ant Design 5.26.7**: Biblioteca de componentes UI
- **Axios 1.11.0**: Cliente HTTP para llamadas a API
- **rc-virtual-list 3.19.1**: Virtualización para listas grandes

### Desarrollo y Testing
- **ESLint 9.30.1**: Linter para JavaScript/TypeScript
- **Vitest 3.2.4**: Framework de testing
- **Testing Library**: Utilidades para testing de componentes React
- **jsdom 26.1.0**: Entorno DOM para testing

## 📁 Estructura del Proyecto

```
personal-task-manager/
├── public/                          # Archivos públicos
│   └── vite.svg
├── src/
│   ├── assets/                      # Recursos estáticos
│   │   └── react.svg
│   ├── components/                  # Componentes React
│   │   ├── common/                  # Componentes reutilizables
│   │   │   ├── __tests__/          # Tests de componentes
│   │   │   │   └── TaskCard.test.tsx
│   │   │   ├── ErrorBoundary.tsx   # Manejo de errores
│   │   │   ├── FilterButtons.tsx   # Botones de filtrado
│   │   │   ├── Header.tsx          # Encabezado de la aplicación
│   │   │   ├── LoadingSpinner.tsx  # Indicador de carga
│   │   │   ├── TaskCard.tsx        # Tarjeta de tarea individual
│   │   │   ├── TaskInput.tsx       # Formulario de entrada de tareas
│   │   │   └── TaskSummary.tsx     # Resumen de tareas
│   │   ├── layout/                  # Componentes de layout
│   │   │   └── AppLayout.tsx       # Layout principal de la aplicación
│   │   └── TaskList/               # Componentes de lista de tareas
│   │       └── VirtualizedTaskList.tsx  # Lista virtualizada
│   ├── context/                     # Contextos de React
│   │   └── TaskContext.tsx         # Contexto global de tareas
│   ├── hooks/                       # Hooks personalizados
│   │   └── useTaskContext.ts       # Hook para usar el contexto de tareas
│   ├── services/                    # Servicios y API
│   │   ├── api/                    # Cliente API y servicios
│   │   │   ├── axiosClient.ts      # Configuración de Axios
│   │   │   └── taskService.ts      # Servicios de tareas
│   │   └── types/                  # Tipos TypeScript
│   │       └── task.types.ts       # Interfaces de tareas
│   ├── styles/                      # Estilos CSS
│   │   └── components/             # Estilos por componente
│   │       ├── AppLayout.css
│   │       ├── FilterButtons.css
│   │       ├── Header.css
│   │       ├── LoadingSpinner.css
│   │       ├── TaskCard.css
│   │       ├── TaskInput.css
│   │       ├── TaskList.css
│   │       ├── TaskSummary.css
│   │       └── VirtualizedTaskList.css
│   ├── utils/                       # Utilidades y helpers
│   │   ├── constants.ts            # Constantes de la aplicación
│   │   └── helpers.ts              # Funciones auxiliares
│   ├── App.css                     # Estilos globales de la aplicación
│   ├── App.tsx                     # Componente raíz
│   ├── index.css                   # Estilos globales
│   ├── main.tsx                    # Punto de entrada
│   └── setupTests.ts               # Configuración de tests
├── .eslintrc.js                    # Configuración de ESLint
├── index.html                      # HTML principal
├── package.json                    # Dependencias y scripts
├── tsconfig.json                   # Configuración de TypeScript
├── tsconfig.app.json               # Configuración específica de la app
├── tsconfig.node.json              # Configuración para Node.js
├── vite.config.ts                  # Configuración de Vite
└── README.md                       # Documentación del proyecto
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js**: Versión 18 o superior
- **npm**: Gestor de paquetes de Node.js

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd personal-task-manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto:
   ```env
   VITE_APP_TITLE=Personal Task Manager
   VITE_BASE_URL=https://api.example.com
   VITE_API_KEY=your-api-key-here
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- **`npm run dev`**: Inicia el servidor de desarrollo
- **`npm run build`**: Construye la aplicación para producción
- **`npm run preview`**: Previsualiza la build de producción
- **`npm run lint`**: Ejecuta el linter para verificar el código
- **`npm run test`**: Ejecuta los tests en modo watch
- **`npm run test:ui`**: Ejecuta los tests con interfaz gráfica
- **`npm run test:run`**: Ejecuta los tests una sola vez

## 🏗️ Arquitectura del Proyecto

### Patrón de Arquitectura

El proyecto sigue una arquitectura modular basada en componentes con las siguientes características:

1. **Separación de Responsabilidades**: Cada componente tiene una responsabilidad específica
2. **Estado Global**: Uso de React Context para gestión centralizada del estado
3. **Servicios**: Capa de servicios para comunicación con APIs
4. **Tipado Fuerte**: TypeScript para mayor seguridad y mantenibilidad
5. **Testing**: Cobertura de tests para componentes críticos

### Flujo de Datos

```
TaskContext (Estado Global)
    ↓
TaskService (API Layer)
    ↓
Components (UI Layer)
    ↓
User Interactions
```

### Componentes Principales

- **`AppLayout`**: Layout principal que orquesta todos los componentes
- **`TaskContext`**: Contexto global para gestión de estado de tareas
- **`VirtualizedTaskList`**: Lista optimizada para grandes volúmenes de datos
- **`TaskCard`**: Componente individual para mostrar una tarea
- **`TaskInput`**: Formulario para crear nuevas tareas
- **`FilterButtons`**: Controles para filtrar tareas
- **`TaskSummary`**: Resumen estadístico de las tareas

## 🧪 Testing

El proyecto incluye una configuración completa de testing con:

- **Vitest**: Framework de testing moderno y rápido
- **Testing Library**: Utilidades para testing de componentes React
- **jsdom**: Entorno DOM para testing
- **Cobertura de Tests**: Tests unitarios para componentes críticos

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests con interfaz gráfica
npm run test:ui

# Ejecutar tests una sola vez
npm run test:run
```

## 🔧 Configuración

### TypeScript

- Configuración estricta habilitada
- Target: ES2022
- JSX: react-jsx
- Módulos: ESNext

### ESLint

- Configuración moderna con `@eslint/js`
- Plugins para React y React Hooks
- Reglas estrictas para calidad de código

### Vite

- Plugin React configurado
- Testing con Vitest integrado
- Hot Module Replacement (HMR)

## 📦 Dependencias Principales

### Dependencias de Producción
- `react`: Biblioteca de interfaz de usuario
- `react-dom`: Renderizado de React para DOM
- `antd`: Biblioteca de componentes UI
- `axios`: Cliente HTTP
- `rc-virtual-list`: Virtualización de listas

### Dependencias de Desarrollo
- `typescript`: Compilador de TypeScript
- `vite`: Herramienta de construcción
- `vitest`: Framework de testing
- `eslint`: Linter de código
- `@testing-library/*`: Utilidades de testing

## 🌐 Variables de Entorno

| Variable | Descripción | Requerida |
|----------|-------------|-----------|
| `VITE_APP_TITLE` | Título de la aplicación | No |
| `VITE_BASE_URL` | URL base de la API | Sí |
| `VITE_API_KEY` | Clave de API | Sí |

## 🚀 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos de producción se generarán en la carpeta `dist/`.

### Servidor de Producción

```bash
npm run preview
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollo inicial* - [TuUsuario](https://github.com/TuUsuario)

## 🙏 Agradecimientos

- React Team por la excelente documentación
- Vite por la herramienta de construcción rápida
- Ant Design por los componentes UI de calidad
- Vitest por el framework de testing moderno
