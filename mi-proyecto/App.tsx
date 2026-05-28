> mi-proyecto@1.0.0 start
> expo start

Starting project at C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto
JsonFileError: Error parsing JSON: import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';

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
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
├─ File: C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\app.json
└─ Cause: SyntaxError: JSON5: invalid character 'i' at 1:1
> 1 | import { NavigationContainer } from '@react-navigation/native';
    | ^
  2 | import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  3 | import { Text } from 'react-native';
  4 |
JsonFileError: Error parsing JSON: import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import PerfilScreen from './screens/PerfilScreen';

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
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>🏠</Text>,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{
            tabBarIcon: () => <Text style={{ fontSize: 20 }}>👤</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
├─ File: C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\app.json
└─ Cause: SyntaxError: JSON5: invalid character 'i' at 1:1
> 1 | import { NavigationContainer } from '@react-navigation/native';
    | ^
  2 | import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  3 | import { Text } from 'react-native';
  4 |
    at parseJsonString (C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\node_modules\@expo\json-file\build\JsonFile.js:199:19)
    at JsonFile.read (C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\node_modules\@expo\json-file\build\JsonFile.js:160:12)
    at getStaticConfig (C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\node_modules\@expo\config\build\getConfig.js:64:38)
    at getConfig (C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\node_modules\@expo\config\build\Config.js:206:85)
    at startAsync (C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\node_modules\expo\node_modules\@expo\cli\build\src\start\startAsync.js:129:68)
    at expoStart (C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto\node_modules\expo\node_modules\@expo\cli\build\src\start\index.js:146:12)
PS C:\Users\ricky\OneDrive\Documents\UNIVERSIDAD\Cuatri 8\Tecnologias y aplicaciones en internet\github\Examen\ProgramacionMovil\mi-proyecto> 