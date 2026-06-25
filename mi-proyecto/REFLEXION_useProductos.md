# Reflexión: Custom Hook `useProductos`

## ¿Qué se hizo?

Se encapsuló toda la lógica de datos y estado de los productos de **Artisan Auction**
en un Custom Hook (`src/hooks/useProductos.ts`), separándola de la capa de presentación
(`screens/HomeScreen.tsx`).

- **`useState` (productos):** almacena la lista de productos que se muestra en pantalla.
- **`useState` (cargando):** controla el indicador de carga (es `true` mientras se traen los datos).
- **`useEffect`:** se ejecuta una sola vez al montar el componente para cargar los datos
  iniciales desde el servicio.
- **`getArtesano(artesanoId)`:** función auxiliar que devuelve el artesano correspondiente a un producto.
- **Retorno del hook:** un objeto `{ productos, cargando, getArtesano }`.

## Ventajas de los Custom Hooks

1. **Separación de responsabilidades:** la pantalla solo se ocupa de *mostrar* datos;
   el cómo se obtienen y se gestionan vive en el hook. `HomeScreen` ya no importa el
   servicio directamente.
2. **Reutilización:** el mismo hook puede usarse en otras pantallas (detalle, búsqueda, etc.)
   sin duplicar la lógica de carga ni el manejo del estado.
3. **Código más limpio y legible:** el componente queda corto y declarativo, sin `useEffect`
   ni `useState` mezclados con el JSX.
4. **Mantenimiento más fácil:** si cambia el origen de datos (por ejemplo, pasar de datos
   locales a una API real), solo se modifica el servicio/hook, no las pantallas.
5. **Testeo aislado:** la lógica de negocio puede probarse por separado de la UI.

## Cómo ejecutar y tomar las evidencias (capturas)

```bash
cd mi-proyecto
npm install   # solo la primera vez
npm start     # abre Expo; usa la app Expo Go o un emulador
```

Capturas sugeridas:
1. El archivo `src/hooks/useProductos.ts`.
2. El uso del hook dentro de `screens/HomeScreen.tsx`
   (`const { productos, cargando, getArtesano } = useProductos();`).
3. La app funcionando: primero el indicador de carga y luego la lista de productos
   con su artesano.
