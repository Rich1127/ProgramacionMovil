import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useProductosDB } from '../src/hooks/useProductosDB';
import { ProductoDB } from '../src/services/productosDB';

// Pantalla que demuestra la conexión a SQLite con un CRUD completo:
// Crear, Consultar, Actualizar y Eliminar productos guardados en la
// base de datos local del dispositivo.
export default function BaseDatosScreen() {
  const { productos, cargando, agregar, editar, borrar } = useProductosDB();

  // Estado del formulario (4 campos de la tabla).
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');

  // Si editandoId tiene un valor, el formulario está en modo "editar".
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Limpia el formulario y sale del modo edición.
  const limpiarForm = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setEditandoId(null);
  };

  // Valida y guarda: si hay editandoId actualiza, si no, inserta.
  const guardar = async () => {
    const precioNum = parseFloat(precio);
    if (!nombre.trim() || !descripcion.trim() || !categoria.trim()) {
      Alert.alert('Campos incompletos', 'Llena nombre, descripción y categoría.');
      return;
    }
    if (isNaN(precioNum)) {
      Alert.alert('Precio inválido', 'El precio debe ser un número.');
      return;
    }

    const datos = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: precioNum,
      categoria: categoria.trim(),
    };

    if (editandoId !== null) {
      await editar(editandoId, datos);
    } else {
      await agregar(datos);
    }
    limpiarForm();
  };

  // Carga un producto en el formulario para editarlo.
  const empezarEdicion = (p: ProductoDB) => {
    setEditandoId(p.id);
    setNombre(p.nombre);
    setDescripcion(p.descripcion);
    setPrecio(String(p.precio));
    setCategoria(p.categoria);
  };

  // Pide confirmación y elimina.
  const confirmarBorrado = (p: ProductoDB) => {
    Alert.alert('Eliminar', `¿Eliminar "${p.nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => borrar(p.id) },
    ]);
  };

  // Cada renglón de la lista (un producto guardado en SQLite).
  const renderItem = ({ item }: { item: ProductoDB }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNombre}>{item.nombre}</Text>
        <Text style={styles.itemDesc}>{item.descripcion}</Text>
        <Text style={styles.itemMeta}>
          ${item.precio.toFixed(2)} · {item.categoria}
        </Text>
        <Text style={styles.itemId}>id: {item.id}</Text>
      </View>
      <View style={styles.itemBotones}>
        <TouchableOpacity
          style={[styles.miniBtn, styles.editar]}
          onPress={() => empezarEdicion(item)}
        >
          <Text style={styles.miniBtnTexto}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.miniBtn, styles.eliminar]}
          onPress={() => confirmarBorrado(item)}
        >
          <Text style={styles.miniBtnTexto}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.cargandoTexto}>Abriendo base de datos…</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={productos}
      keyExtractor={(p) => String(p.id)}
      renderItem={renderItem}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Productos (SQLite)</Text>
          <Text style={styles.subtitulo}>
            {editandoId !== null ? 'Editando producto' : 'Nuevo producto'}
          </Text>

          {/* Formulario con los 4 campos de la tabla */}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
            />
            <TextInput
              style={styles.input}
              placeholder="Precio"
              value={precio}
              onChangeText={setPrecio}
              keyboardType="decimal-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Categoría"
              value={categoria}
              onChangeText={setCategoria}
            />

            <View style={styles.formBotones}>
              <TouchableOpacity style={styles.btnGuardar} onPress={guardar}>
                <Text style={styles.btnTexto}>
                  {editandoId !== null ? 'Actualizar' : 'Agregar'}
                </Text>
              </TouchableOpacity>
              {editandoId !== null && (
                <TouchableOpacity style={styles.btnCancelar} onPress={limpiarForm}>
                  <Text style={styles.btnTexto}>Cancelar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.subtitulo}>
            Almacenados: {productos.length}
          </Text>
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.vacio}>
          No hay productos todavía. Agrega el primero ⬆️
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contenido: {
    padding: 20,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  cargandoTexto: {
    marginTop: 12,
    color: '#6b7280',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    marginTop: 4,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 15,
    backgroundColor: '#fff',
  },
  formBotones: {
    flexDirection: 'row',
    gap: 10,
  },
  btnGuardar: {
    flex: 1,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnCancelar: {
    flex: 1,
    backgroundColor: '#9ca3af',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  itemDesc: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  itemMeta: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: 4,
  },
  itemId: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  itemBotones: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  miniBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editar: {
    backgroundColor: '#dbeafe',
  },
  eliminar: {
    backgroundColor: '#fee2e2',
  },
  miniBtnTexto: {
    fontSize: 18,
  },
  vacio: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 20,
    fontSize: 14,
  },
});
