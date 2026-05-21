# CafeDirecto Sacramento Frontend

Frontend React para la plataforma de comercializacion directa de cafe entre productores de Sacramento y compradores finales.

## Modelo de usuario

- Hay una sola cuenta por persona.
- La misma cuenta puede comprar y vender.
- El usuario no elige "consumidor" o "productor" al registrarse.
- Cuando entra a vender por primera vez, completa su perfil productor y registra al menos una finca.

## Scripts

```bash
npm start
npm run build
```

## Variable de entorno

Crea un archivo `.env` local si quieres apuntar al backend fuera de `localhost`:

```bash
REACT_APP_API_URL=http://localhost:8080
```

## Render

Este repo ya incluye:

- `render.yaml`
- `public/_redirects`
- PWA base con `manifest.json`, `service-worker.js` y `offline.html`

En Render:

1. Crea un `Static Site`.
2. Conecta este repositorio.
3. Usa `render.yaml` o configura manualmente:

```bash
Build Command: npm install && npm run build
Publish Directory: build
```

4. Configura la variable:

```bash
REACT_APP_API_URL=https://TU-BACKEND.onrender.com
```

## Estado actual

- Catalogo conectado al backend.
- Detalle de producto conectado al backend.
- Perfil publico del productor conectado al backend.
- Registro e inicio de sesion conectados al backend.
- Activacion de perfil productor conectada al backend.
- Publicacion de lotes conectada al backend.
- Mis lotes conectados al backend.
