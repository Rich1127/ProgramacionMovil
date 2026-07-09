# TikTok Clone — React Native + Expo (SDK 54)

Clon funcional de **TikTok** desarrollado con React Native y Expo. Reproduce el
flujo principal de la app: el **scroll vertical de videos a pantalla completa**
(feed "Para ti") con reproducción automática del video visible, además de las
interacciones características (me gusta, comentarios, seguir).

## 🎯 Funcionalidad central

- **Scroll vertical de videos** con `FlatList` + `pagingEnabled` (una publicación
  por pantalla). El video visible se reproduce automáticamente y el resto se
  pausa, usando `expo-video` y la detección de `onViewableItemsChanged`.
- **Doble tap para dar me gusta** y tap simple para pausar/reanudar (gestos de TikTok).
- **Comentarios interactivos**: hoja inferior donde puedes leer y **publicar**
  comentarios nuevos.
- **Me gusta y seguir** con estado global que **persiste** (AsyncStorage): al
  cerrar y reabrir la app se conservan los likes, los seguidos y los comentarios.
- **Buscador** en la pestaña Descubrir que filtra los videos en tiempo real.

## 🧭 Navegación (5 pantallas · React Navigation)

Bottom tabs al estilo TikTok con botón central `+`:

1. **Inicio** — feed vertical de videos (funcionalidad central).
2. **Descubrir** — buscador + cuadrícula de tendencias.
3. **Subir** — pantalla de cámara (placeholder).
4. **Bandeja** — notificaciones/actividad.
5. **Perfil** — perfil del usuario; la pestaña "Me gusta" refleja los videos con like.

## 🎨 Identidad visual

Fondo negro, tipografía en blanco, acentos **rosa `#FE2C55`** y **cian `#25F4EE`**,
botón `+` con el degradado característico, columna de acciones a la derecha e
información del autor/música abajo.

## 🛠️ Tecnologías

- Expo SDK 54 · React Native 0.81 · React 19
- `expo-video` (reproducción de video)
- `@react-navigation/native` + `bottom-tabs`
- `@react-native-async-storage/async-storage` (persistencia)
- Estado con hooks (`useState`, `useEffect`, `useCallback`, `useContext`)

## ▶️ Cómo ejecutar (Expo Go)

```bash
cd tiktok-clone
npm install
npx expo start
```

Escanea el código QR con la app **Expo Go** en tu dispositivo físico.
> Nota: los videos se cargan por streaming desde internet, así que se necesita
> conexión para verlos.

## 📁 Estructura

```
tiktok-clone/
├── App.tsx                    # Navegación (bottom tabs) + providers
├── src/
│   ├── components/
│   │   ├── VideoItem.tsx      # Video a pantalla completa + acciones
│   │   └── CommentsModal.tsx  # Hoja de comentarios interactiva
│   ├── context/
│   │   └── AppContext.tsx     # Estado global + persistencia (AsyncStorage)
│   ├── data/
│   │   ├── videos.ts          # Datos mock del feed
│   │   └── comments.ts        # Comentarios iniciales
│   ├── screens/
│   │   ├── FeedScreen.tsx     # Scroll vertical (pantalla principal)
│   │   ├── DiscoverScreen.tsx
│   │   ├── UploadScreen.tsx
│   │   ├── InboxScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── theme/colors.ts        # Paleta de la marca TikTok
│   └── utils/format.ts        # Formato de números (1.2K, 3.4M)
```
