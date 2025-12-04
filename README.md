# TPI E-commerce — Arcadia Store

## Breve descripción

Proyecto de e‑commerce creado con React + Vite. Implementa un catálogo de productos, página de detalle, carrito de compras y panel de administración (productos y categorías). Usa una API externa para obtener y modificar datos.

## Integrantes y roles

- Sebastian Martinez — Desarrollador
- Elias Gonzalo Gatica — Desarrollador

## Ejecución local

1. Clonar el repositorio.
2. Copiar/crear archivo de variables de entorno:

- Crear un archivo `.env` en la raíz con:
  ```
  VITE_API_URL=http://161.35.104.211:8000
  VITE_BEARER_TOKEN=elias
  ```
- o renombrar archivo `.env.example` a `.env`

3. Instalar dependencias:
   ```
   npm install
   ```
4. Ejecutar en modo desarrollo:
   ```
   npm run dev
   ```
5. Para construir para producción:
   ```
   npm run build
   ```
6. Vista previa del build:
   ```
   npm run preview
   ```

## Dependencias principales

Las dependencias se encuentran en [package.json](package.json).

- React / React DOM
- Vite
- Tailwind CSS
- styled-components
- react-router-dom
- @headlessui/react, @heroicons/react
- react-hook-form
- swiper
- react-icons

## Variables de entorno

- VITE_API_URL — URL base de la API externa.
- VITE_BEARER_TOKEN — Token de autorización.

## Estructura y puntos de interés

- Entrypoint: [src/main.jsx](src/main.jsx)
- Rutas: [src/routes/appRoutes.jsx](src/routes/appRoutes.jsx)
- Admin panel: [src/pages/Admin.jsx](src/pages/Admin.jsx)
- Componentes: [src/components](src/components)
- Context: [src/context](src/context)
- Hooks: [src/hooks](src/hooks)
- Utils: [src/utils](src/utils)

## Notas

- El token de autorización se injecta actualmente en llamadas fetch como `"Bearer elias"`; ajustar según el backend.
- Es necesario utilizar el token 'elias' para respetar el contexto de la web.

## Contacto

- sebaamartinez54@gmail.com - [Github](https://github.com/SebaaM)
- gonzaelias95@gmail.com - [Github](https://github.com/eliasgatica1995)
