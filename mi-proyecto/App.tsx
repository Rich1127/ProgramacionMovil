import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

const nombre: string = "Elwisi";
const nacionalidad: string = "Mexicana";
const fecha: string = "27 de noviembre";
const autoridad: string = "Mexico";

export default function App() {
  return (
    <View style={styles.container}>

<Image
  source={require('./assets/wits.jpg')}
  style={styles.avatar}
/>

      <Text style={styles.titulo}>Pasaporte Mexicano</Text>

      <Text style={styles.dato}>Nombre: {nombre}</Text>
      <Text style={styles.dato}>Nacionalidad: {nacionalidad}</Text>
      <Text style={styles.dato}>Fecha de emisión: {fecha}</Text>
      <Text style={styles.dato}>Autoridad: {autoridad}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  avatar: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  dato: {
    fontSize: 18,
    marginBottom: 10,
  },
});