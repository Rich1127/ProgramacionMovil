import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Arreglo string[] con al menos 5 habilidades
const habilidades: string[] = [
  'TypeScript',
  'React Native',
  'JavaScript',
  'Python',
  'SQL',
  'Git & GitHub',
];

export default function SkillsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Mis Habilidades</Text>
      <Text style={styles.subtitulo}>Tecnologías que conozco</Text>

      <View style={styles.chipContainer}>
        {habilidades.map((habilidad, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>{habilidad}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 24,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#1f2937',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  chipText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
