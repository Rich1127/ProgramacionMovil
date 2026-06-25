import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

// Datos personales usando distintos tipos de datos
const nombre: string = 'Jesus Ricardo y fabian Osiel';
const carrera: string = 'Ing. en Sistemas Computacionales';
const cuatrimestre: number = 9;
const promedio: number = 9.0;
const titulado: boolean = false;
const proyectoPendiente: null = null;

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Imagen desde internet */}
      <Image
        source={{ uri: 'https://imgs.search.brave.com/-UqmtqBqHlcWcdtJLqTeOpZFu-dwNwcvuGOVI4h__cg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZW1l/cy5tZW1lZHJvaWQu/Y29tL2ltYWdlcy8y/MDI2LTA0LTA0LzY5/ZDE0Y2E0ODFkMTMu/anBlZw' }}
        style={styles.avatar}
      />
      <Text style={styles.caption}>Foto desde internet</Text>

      {/* Imagen local desde assets/ */}
      <Image source={require('../assets/wits.jpg')} style={styles.localImage} />
      <Text style={styles.caption}>Imagen local (assets/)</Text>

      <Text style={styles.titulo}>{nombre}</Text>

      <View style={styles.card}>
        <Text style={styles.dato}>
          <Text style={styles.label}>Carrera: </Text>
          {carrera}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Cuatrimestre: </Text>
          {cuatrimestre}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Promedio: </Text>
          {promedio}
        </Text>
        <Text style={styles.dato}>
          <Text style={styles.label}>Titulado: </Text>
          {titulado ? 'Sí' : 'No'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 4,
    borderWidth: 3,
    borderColor: '#3b82f6',
  },
  localImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 4,
  },
  caption: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 16,
    color: '#1f2937',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
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
});
