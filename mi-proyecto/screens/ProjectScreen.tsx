import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Objeto con los datos del proyecto integrador
const proyecto = {
  nombre: 'Portafolio Móvil',
  version: '1.0.0',
  descripcion: 'App en React Native con 3 pantallas conectadas por un menú inferior.',
  repositorio: 'github.com/BOWadapter/PM',
  activo: true,
};

export default function ProjectScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Mi Proyecto</Text>

      {/* Campo por campo con <Text> */}
      <View style={styles.card}>
        <Text style={styles.dato}>
          <Text style={styles.label}>Nombre: </Text>
          {proyecto.nombre}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Versión: </Text>
          {proyecto.version}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Descripción: </Text>
          {proyecto.descripcion}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Repositorio: </Text>
          {proyecto.repositorio}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Activo: </Text>
          {proyecto.activo ? 'Sí' : 'No'}
        </Text>
      </View>

      {/* Objeto completo con JSON.stringify() */}
      <Text style={styles.subtitulo}>Objeto completo (JSON):</Text>
      <View style={styles.jsonBox}>
        <Text style={styles.json}>{JSON.stringify(proyecto, null, 2)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  dato: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1f2937',
  },
  jsonBox: {
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
  },
  json: {
    color: '#34d399',
    fontFamily: 'monospace',
    fontSize: 13,
  },
});
