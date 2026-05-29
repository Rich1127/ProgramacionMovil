# ProgramacionMovil
Proyectos y practicas

¿Qué es React Native?
React Native es un framework de código abierto creado por Meta que te permite desarrollar aplicaciones móviles nativas para iOS y Android utilizando JavaScript (o TypeScript) y React.

Buenas Prácticas

Para mantener un código escalable y limpio, especialmente cuando la aplicación crece y necesita conectarse a servicios externos o bases de datos, te recomiendo seguir estas pautas:

Usa TypeScript: Aunque puedes usar JavaScript puro, TypeScript añade tipado estático, lo que te ahorrará muchísimos dolores de cabeza al detectar errores en tiempo de desarrollo.

Separa la Lógica de la Interfaz (UI): Mantén tus componentes visuales lo más "tontos" posibles. Extrae la lógica de negocio, las llamadas a servicios y el formateo de datos en "Custom Hooks" (useHook.js).

Gestión de Estado Centralizada: Para datos que necesitan estar disponibles en toda la app (como la sesión del usuario), usa herramientas como Zustand, Redux Toolkit o el Context API de React. Para el estado local de un componente, basta con useState.

Estilos Modulares: Utiliza StyleSheet.create fuera del componente para evitar que los estilos se re-calculen en cada renderizado, mejorando el rendimiento.

Estructura de Proyecto

mi-app-nativa/
├── src/
│   ├── assets/       # Imágenes, iconos, fuentes personalizadas
│   ├── components/   # Componentes reutilizables (Botones, Tarjetas, Inputs)
│   ├── constants/    # Variables globales (Colores, URLs de APIs, Tipografías)
│   ├── hooks/        # Custom hooks para lógica reutilizable (ej. useFetch)
│   ├── navigation/   # Configuración de rutas (React Navigation)
│   ├── screens/      # Vistas o pantallas completas (Home, Login, Perfil)
│   ├── services/     # Archivos para consumir tus APIs REST (ej. endpoints en FastAPI)
│   ├── utils/        # Funciones auxiliares (formateo de fechas, validaciones)
│   └── App.js        # Punto de entrada principal de la aplicación
├── package.json
└── app.json

Tipos de Datos: Declaración y Renderizado en la Vista

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MiComponente = () => {
  // --- DECLARACIÓN DE TIPOS DE DATOS (const) ---
  
  // 1. String (Cadena de texto)
  const nombreUsuario = "Ricardo";
  
  // 2. Number (Número)
  const nivelActual = 42;
  
  // 3. Boolean (Booleano - se usa para condicionales, no se imprime directamente)
  const estaActivo = true;
  
  // 4. Object (Objeto)
  const sensor = {
    tipo: "Temperatura",
    valor: 25.4,
    unidad: "°C"
  };
  
  // 5. Array (Arreglo de strings)
  const habilidades = ["JavaScript", "Python", "React Native"];

  // --- RENDERIZADO EN LA VISTA ---
  return (
    <View style={styles.container}>
      
      {/* Renderizando un String */}
      <Text style={styles.title}>¡Bienvenido, {nombreUsuario}!</Text>
      
      {/* Renderizando un Number */}
      <Text style={styles.text}>Nivel de usuario: {nivelActual}</Text>
      
      {/* Uso de un Boolean (Renderizado condicional) */}
      {estaActivo ? (
        <Text style={styles.statusActive}>El sistema está en línea.</Text>
      ) : (
        <Text style={styles.statusInactive}>El sistema está fuera de línea.</Text>
      )}

      {/* Renderizando propiedades de un Objeto */}
      <View style={styles.card}>
        <Text style={styles.text}>
          Lectura del sensor de {sensor.tipo}: {sensor.valor}{sensor.unidad}
        </Text>
      </View>

      {/* Renderizando un Array usando .map() (Para listas pequeñas) */}
      <Text style={styles.subtitle}>Habilidades técnicas:</Text>
      {habilidades.map((habilidad, index) => (
        // El atributo 'key' es obligatorio al iterar listas
        <Text key={index} style={styles.listItem}>
          • {habilidad}
        </Text>
      ))}

    </View>
  );
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  statusActive: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  statusInactive: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    elevation: 3, // Sombra en Android
  },
  listItem: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  }
});

export default MiComponente;