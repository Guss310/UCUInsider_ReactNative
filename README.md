# UCUInsider

## Descripción
UCUInsider es una aplicación móvil desarrollada con React Native que permite a los usuarios compartir publicaciones, comentar y votar contenido, similar a una plataforma de red social. La aplicación está diseñada con una interfaz intuitiva y moderna, utilizando un sistema de navegación por pestañas.

## Requisitos Previos
- Node.js (versión 12 o superior)
- npm o yarn
- Expo CLI
- Un dispositivo Android o un emulador
- Expo Go app instalada en el dispositivo (si se usa un dispositivo físico)

## Instalación

1. Instala Expo CLI globalmente:
   ```bash
   npm install -g expo-cli
   ```

2. Clona el repositorio:
   ```bash
   git clone https://github.com/Guss310/UCUInsider_ReactNative.git
   cd ucuinsider
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   expo start
   ```

5. Escanea el código QR con la app Expo Go en tu dispositivo Android o ejecuta en un emulador.

## Estructura del Proyecto

```
ucuinsider/
├── components/
│   ├── Feed/
│   │   └── Feed.js         # Componente principal del feed
│   ├── Profile/
│   │   └── Profile.js      # Perfil del usuario
│   ├── Info/
│   │   └── Info.js         # Información de la aplicación
│   └── Contexts/
│       └── AuthContext.js  # Contexto de autenticación
└── App.js                  # Punto de entrada y navegación
```

## Características Principales

- **Feed de Publicaciones**: Los usuarios pueden crear, ver y votar publicaciones.
- **Sistema de Comentarios**: Capacidad para comentar en publicaciones y votar comentarios.
- **Perfil de Usuario**: Visualización de información del usuario.
- **Navegación por Pestañas**: Interfaz intuitiva con navegación inferior.
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla.

## Arquitectura

La aplicación está construida siguiendo una arquitectura basada en componentes con las siguientes características:

- **Navegación**: Utiliza React Navigation para la gestión de rutas y navegación.
- **Estado Global**: Implementa Context API para la gestión del estado de autenticación.
- **Componentes Reutilizables**: Diseño modular para mayor mantenibilidad.
- **Comunicación API**: Utiliza Axios para las peticiones HTTP.

## Tecnologías Utilizadas

- React Native
- Expo
- React Navigation
- Context API
- Axios
- Feather Icons

## Configuración del Backend

Para conectar con el backend, modifica la variable `ipadress` en el archivo `Feed.js`:

```javascript
const ipadress = '192.168.1.9' // Cambia esto por la IP de tu servidor
```

## Contribución

1. Haz un Fork del proyecto
2. Crea una rama (`git checkout -b [Rama]`)
3. Commit tus cambios (`git commit -m '[Commentario]'`)
4. Push a la rama (`git push origin [Rama]]`)
5. Abre un Pull Request

## Autor

Gustavo González

## Derechos

Universidad Catolica del Uruguay - UCU.
