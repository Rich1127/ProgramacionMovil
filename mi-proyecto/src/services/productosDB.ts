// Capa de acceso a datos con SQLite (base de datos LOCAL del dispositivo).
// Aquí se crea la base de datos, se crea la tabla y viven las operaciones
// CRUD (Create, Read, Update, Delete). La UI nunca habla con SQLite
// directamente: lo hace a través del hook useProductosDB.
//
// API usada: expo-sqlite (SDK 54) -> openDatabaseAsync, execAsync,
// runAsync, getAllAsync. Documentación oficial:
// https://docs.expo.dev/versions/v54.0.0/sdk/sqlite/

import * as SQLite from 'expo-sqlite';

// Nombre del archivo físico de la base de datos en el dispositivo.
// Al persistir en disco, los datos sobreviven al cerrar y abrir la app.
const DB_NAME = 'artesanias.db';

// Tipo del dominio. La tabla tiene la llave primaria (id) + 4 campos.
export interface ProductoDB {
  id: number; // llave primaria (autoincremental)
  nombre: string; // campo 1
  descripcion: string; // campo 2
  precio: number; // campo 3
  categoria: string; // campo 4
}

// Datos para crear/actualizar (sin el id, que lo genera la base de datos).
export type ProductoInput = Omit<ProductoDB, 'id'>;

// Guardamos una sola conexión reutilizable (patrón singleton).
let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

// Abre la base de datos (una sola vez) y garantiza que la tabla exista.
function getDB(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      // Creamos la tabla solo si no existe todavía.
      // Llave primaria + 4 campos (nombre, descripcion, precio, categoria).
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS productos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT NOT NULL,
          descripcion TEXT NOT NULL,
          precio REAL NOT NULL,
          categoria TEXT NOT NULL
        );
      `);
      return db;
    })();
  }
  return dbPromise;
}

// Inicializa la base de datos (se llama al arrancar la pantalla).
export async function initDB(): Promise<void> {
  await getDB();
}

// READ -> Devuelve todos los productos almacenados, del más nuevo al más viejo.
export async function listarProductos(): Promise<ProductoDB[]> {
  const db = await getDB();
  return db.getAllAsync<ProductoDB>('SELECT * FROM productos ORDER BY id DESC');
}

// CREATE -> Inserta un producto y devuelve el id generado por SQLite.
export async function insertarProducto(p: ProductoInput): Promise<number> {
  const db = await getDB();
  const result = await db.runAsync(
    'INSERT INTO productos (nombre, descripcion, precio, categoria) VALUES (?, ?, ?, ?)',
    p.nombre,
    p.descripcion,
    p.precio,
    p.categoria
  );
  return result.lastInsertRowId;
}

// UPDATE -> Actualiza los 4 campos de un producto existente por su id.
export async function actualizarProducto(
  id: number,
  p: ProductoInput
): Promise<void> {
  const db = await getDB();
  await db.runAsync(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ? WHERE id = ?',
    p.nombre,
    p.descripcion,
    p.precio,
    p.categoria,
    id
  );
}

// DELETE -> Elimina un producto por su id.
export async function eliminarProducto(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync('DELETE FROM productos WHERE id = ?', id);
}
