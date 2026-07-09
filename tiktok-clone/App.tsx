import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider } from './src/context/AppContext';
import { colors } from './src/theme/colors';
import FeedScreen from './src/screens/FeedScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import UploadScreen from './src/screens/UploadScreen';
import InboxScreen from './src/screens/InboxScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Botón central "+" con el degradado característico de TikTok (cian + rosa).
function UploadButton() {
  return (
    <View style={styles.uploadBtn}>
      <View style={[styles.uploadSide, styles.uploadLeft]} />
      <View style={[styles.uploadSide, styles.uploadRight]} />
      <View style={styles.uploadCenter}>
        <Ionicons name="add" size={26} color="#000" />
      </View>
    </View>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={navTheme}>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarActiveTintColor: colors.white,
              tabBarInactiveTintColor: colors.tabInactive,
              tabBarStyle: {
                backgroundColor: colors.background,
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: colors.divider,
                height: 60,
              },
              tabBarLabelStyle: { fontSize: 10 },
            }}
          >
            <Tab.Screen
              name="Inicio"
              component={FeedScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="home" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Descubrir"
              component={DiscoverScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="search" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Subir"
              component={UploadScreen}
              options={{
                tabBarLabel: () => null,
                tabBarIcon: () => <UploadButton />,
              }}
            />
            <Tab.Screen
              name="Bandeja"
              component={InboxScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="chatbubble-ellipses" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Perfil"
              component={ProfileScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name="person" size={24} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  uploadBtn: {
    width: 44,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadSide: {
    position: 'absolute',
    width: 44,
    height: 30,
    borderRadius: 8,
  },
  uploadLeft: {
    backgroundColor: colors.accent,
    left: -4,
  },
  uploadRight: {
    backgroundColor: colors.primary,
    left: 4,
  },
  uploadCenter: {
    width: 40,
    height: 30,
    borderRadius: 8,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
