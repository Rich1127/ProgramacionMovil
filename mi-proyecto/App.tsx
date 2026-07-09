import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SkillsScreen from './screens/SkillsScreen';
import ProjectScreen from './screens/ProjectScreen';
import BaseDatosScreen from './screens/BaseDatosScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3b82f6',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            height: 60,
            paddingBottom: 8,
          },
          headerStyle: {
            backgroundColor: '#3b82f6',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏺</Text>,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
          }}
        />
        <Tab.Screen
          name="Habilidades"
          component={SkillsScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>⚡</Text>,
          }}
        />
        <Tab.Screen
          name="Mi Proyecto"
          component={ProjectScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>📦</Text>,
          }}
        />
        <Tab.Screen
          name="Base de Datos"
          component={BaseDatosScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🗄️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
