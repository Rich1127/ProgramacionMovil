// Capa de servicio (lógica de datos) de Artisan Auction.
// Aquí viven los datos y la forma de obtenerlos. La UI NO debe
// importar estos arreglos directamente: lo hace a través del hook.

// Tipos del dominio
export interface Artesano {
  id: number;
  nombre: string;
  especialidad: string;
  ubicacion: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  artesanoId: number; // referencia al artesano que lo creó
}

// "Base de datos" simulada de artesanos
const artesanos: Artesano[] = [
  { id: 1, nombre: 'María López', especialidad: 'Cerámica', ubicacion: 'Oaxaca' },
  { id: 2, nombre: 'Juan Pérez', especialidad: 'Textiles', ubicacion: 'Chiapas' },
  { id: 3, nombre: 'Ana García', especialidad: 'Joyería', ubicacion: 'Taxco' },
];

// "Base de datos" simulada de productos en subasta
const productos: Producto[] = [
  { id: 1, nombre: 'Jarrón de barro negro', descripcion: 'Pieza hecha a mano en barro negro pulido.', precio: 850, artesanoId: 1 },
  { id: 2, nombre: 'Plato decorativo', descripcion: 'Plato de cerámica pintado a mano.', precio: 600, artesanoId: 1 },
  { id: 3, nombre: 'Rebozo bordado', descripcion: 'Rebozo de algodón con bordado tradicional.', precio: 1200, artesanoId: 2 },
  { id: 4, nombre: 'Collar de plata', descripcion: 'Collar artesanal de plata .925.', precio: 2300, artesanoId: 3 },
];

// Simula una petición a un servidor (devuelve una promesa con un pequeño retraso).
export function obtenerProductos(): Promise<Producto[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(productos), 1500);
  });
}

// Devuelve la lista completa de artesanos (datos de referencia).
export function obtenerArtesanos(): Artesano[] {
  return artesanos;
}
