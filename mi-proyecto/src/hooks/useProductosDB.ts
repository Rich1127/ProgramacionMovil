import { useState, useEffect, useCallback } from 'react';
import {
  ProductoDB,
  ProductoInput,
  initDB,
  listarProductos,
  insertarProducto,
  actualizarProducto,
  eliminarProducto,
} from '../services/productosDB';

// Custom Hook: encapsula el estado y las operaciones CRUD contra SQLite.
// La pantalla solo "consume" estos datos y funciones, sin saber que por
// debajo hay una base de datos (separación de responsabilidades).
export function useProductosDB() {
  const [productos, setProductos] = useState<ProductoDB[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  // Relee todos los productos desde la base de datos y refresca la UI.
  const refrescar = useCallback(async () => {
    const datos = await listarProductos();
    setProductos(datos);
  }, []);

  // Al montar: crea la base de datos/tabla (si no existen) y carga los datos.
  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await refrescar();
      } finally {
        setCargando(false);
      }
    })();
  }, [refrescar]);

  // CREATE
  const agregar = useCallback(
    async (p: ProductoInput) => {
      await insertarProducto(p);
      await refrescar();
    },
    [refrescar]
  );

  // UPDATE
  const editar = useCallback(
    async (id: number, p: ProductoInput) => {
      await actualizarProducto(id, p);
      await refrescar();
    },
    [refrescar]
  );

  // DELETE
  const borrar = useCallback(
    async (id: number) => {
      await eliminarProducto(id);
      await refrescar();
    },
    [refrescar]
  );

  return { productos, cargando, agregar, editar, borrar, refrescar };
}
