# Consultar Clima

Aplicación web moderna para consultar el clima en tiempo real de cualquier ciudad del mundo.

## Características

- Búsqueda de clima por nombre de ciudad
- Interfaz moderna y responsive con gradientes atractivos
- Muestra múltiples datos meteorológicos:
  - Temperatura actual
  - Sensación térmica
  - Temperatura mínima y máxima
  - Humedad
  - Velocidad del viento
  - Presión atmosférica
  - Visibilidad
  - Nubosidad
  - Hora de amanecer y atardecer
  - Coordenadas geográficas
  - Icono del clima actual

## Configuración

### 1. Obtener API Key de OpenWeatherMap

1. Visita [OpenWeatherMap](https://openweathermap.org/api)
2. Crea una cuenta gratuita
3. Ve a tu perfil y copia tu API Key
4. Pega la API Key en el archivo `src/App.jsx` en la línea 11:

```javascript
const API_KEY = "TU_API_KEY_AQUI"; // Reemplazar con tu API key
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Ejecutar la aplicación

```bash
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

## Uso

1. Ingresa el nombre de una ciudad en el campo de búsqueda
2. Presiona el botón "Buscar" o Enter
3. Visualiza toda la información del clima de esa ciudad

## Tecnologías utilizadas

- React 17
- OpenWeatherMap API
- CSS3 (Gradientes, Flexbox, Grid, Animaciones)
- Fetch API

## Características de la interfaz

- Header con gradiente morado moderno
- Campo de búsqueda con diseño redondeado y sombras
- Tarjeta principal con temperatura grande y destacada
- Grid responsive de tarjetas con detalles del clima
- Efectos hover en las tarjetas
- Animaciones suaves de entrada
- Diseño completamente responsive para móviles

## Scripts disponibles

### `npm start`

Ejecuta la aplicación en modo desarrollo.

### `npm test`

Lanza el test runner.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.

## Licencia

Este proyecto es de código abierto.
