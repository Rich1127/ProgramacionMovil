import { useState, useEffect } from 'react';
import {
  Producto,
  Artesano,
  obtenerProductos,
  obtenerArtesanos,
} from '../services/productosService';

// Custom Hook: encapsula toda la lógica de datos/estado de los productos.
// Así la pantalla (capa de presentación) solo "consume" datos y no sabe
// de dónde vienen ni cómo se cargan (separación de responsabilidades).
export function useProductos() {
  // useState -> guarda la lista de productos que se mostrará en la UI.
  const [productos, setProductos] = useState<Producto[]>([]);

  // useState -> controla el estado de carga (true mientras se traen los datos).
  const [cargando, setCargando] = useState<boolean>(true);

  // useEffect -> se ejecuta una sola vez al montar el componente ([] como
  // dependencias) para cargar los datos iniciales desde el servicio.
  useEffect(() => {
    obtenerProductos()
      .then((datos) => setProductos(datos)) // guardamos los productos recibidos
      .finally(() => setCargando(false)); // al terminar, apagamos el "cargando"
  }, []);

  // Función auxiliar: recibe un artesanoId y devuelve el artesano correspondiente
  // (o undefined si no existe). Mantiene la búsqueda fuera de la pantalla.
  const getArtesano = (artesanoId: number): Artesano | undefined => {
    return obtenerArtesanos().find((a) => a.id === artesanoId);
  };

  // El hook devuelve un objeto con: la lista de productos, el estado de carga
  // y la función para resolver el artesano de cada producto.
  return { productos, cargando, getArtesano };
}
