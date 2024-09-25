# HP Weather App

## Descripción

**HP Weather App** es una aplicación web que permite a los usuarios consultar el clima actual de diferentes ciudades del mundo. Además, proporciona información detallada sobre el país correspondiente y un historial de las ciudades consultadas recientemente. Los usuarios pueden iniciar sesión con su cuenta de Google y disfrutar de una interfaz limpia y responsiva.

## Características

- **Inicio de sesión con Google**: Autenticación segura utilizando Google OAuth.
- **Búsqueda de clima**: Permite buscar el clima de cualquier ciudad a nivel mundial mediante la API de OpenWeather.
- **Información detallada del país**: Al hacer clic en el nombre del país, se despliega información sobre su capital, población y moneda.
- **Historial de búsqueda**: Guarda automáticamente las últimas cinco ciudades buscadas para su fácil acceso.
- **Sugerencias de ciudades populares**: Presenta una lista de ciudades populares para consultas rápidas.
- **Cierre de sesión**: Los usuarios pueden cerrar sesión de manera segura, eliminando toda la información del estado de la sesión.
- **Loader visual**: Loader interactivo que se muestra durante la autenticación y la carga de datos, mejorando la experiencia de usuario.

## Tecnologías Utilizadas

- **React con TypeScript**: Framework para la construcción de interfaces dinámicas y con tipado seguro.
- **Tailwind CSS**: Framework de CSS para diseñar una UI limpia y responsiva.
- **Notiflix**: Para mostrar notificaciones y loaders animados.
- **OpenWeather API**: API que proporciona datos meteorológicos en tiempo real.
- **RestCountries API**: API que proporciona información detallada de los países.
- **Google OAuth**: Autenticación segura para los usuarios.
- **Vite**: Herramienta de desarrollo rápida para proyectos basados en React.

## Instalación

### Requisitos Previos

- Node.js >= 20.15.0
- Cuenta en Google Cloud para configurar OAuth 2.0.
- Cuenta en OpenWeather para obtener una API key.

### Pasos para la instalación:

1. **Clonar el repositorio:**

   ```bash
    git clone https://github.com/usuario/hp-weather-app.git
   
2. **Instalar dependencias:**
   ```bash
    npm install
3. **Configurar variables de entorno:**
Se puede encontrar un ejemplo de como tiene que ser el archivo .env en [.env](env-example.txt)
   ```env
    VITE_OWEATHER_API_KEY=tu_openweather_api_key
    VITE_GOOGLE_CLIENT_ID=tu_google_client_id
  * VITE_OWEATHER_API_KEY: Tu clave API de OpenWeather.
  * VITE_GOOGLE_CLIENT_ID: El client ID de OAuth 2.0 de Google.


4. **Iniciar la aplicación en modo desarrollo:**
   ```bash
     npm run dev
   
## Despliegue
Corriendo el siguiente comando se hara build del proyecto, una vez ejecutado dicho comando se generará la carpeta dist, la cual contiene los archivos listos para "producción" (Vercel, Netlify, etc)
  ```bash
     npm run build
