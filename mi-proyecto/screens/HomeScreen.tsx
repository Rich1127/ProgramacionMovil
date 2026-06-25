import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

// La pantalla ya NO importa los datos desde el servicio.
// Toda la lógica de datos vive en el custom hook useProductos.
import { useProductos } from '../src/hooks/useProductos';

export default function HomeScreen() {
  // Consumimos el hook: obtenemos los productos, el estado de carga
  // y la función para resolver el artesano de cada producto.
  const { productos, cargando, getArtesano } = useProductos();

  // Mientras los datos se obtienen, mostramos un indicador de carga.
  if (cargando) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loaderText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={productos}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.container}
      ListHeaderComponent={<Text style={styles.titulo}>Artisan Auction</Text>}
      renderItem={({ item }) => {
        // Usamos la función auxiliar del hook para obtener el artesano.
        const artesano = getArtesano(item.artesanoId);
        return (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <Text style={styles.artesano}>
              Artesano: {artesano ? artesano.nombre : 'Desconocido'}
              {artesano ? ` · ${artesano.especialidad} (${artesano.ubicacion})` : ''}
            </Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#374151',
  },
  container: {
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  descripcion: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  precio: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 8,
  },
  artesano: {
    fontSize: 13,
    color: '#374151',
  },
});
