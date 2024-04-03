import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../client/src/components/HomeScreen';
import LogInPage from './src/components/pages/Login';
import Footer from './src/components/Footer';
import TiendasScreen from './src/components/pages/TiendasScreen';
import Perfil from './src/components/pages/PerfilPages';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }} />
          <Stack.Screen 
            name="Login"
            component={LogInPage} // Asigna la pantalla de login como componente
            options={{ title: 'Log In' }} // Opciones de navegación para la pantalla de login
          />
          <Stack.Screen
          name="TiendasScreen"
          component={TiendasScreen}
          options={{title: 'Tiendas'}} />

          <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{title: 'Perfil'}} />
          
          {/* Aquí puedes agregar más pantallas y sus rutas */}
        </Stack.Navigator>
        <Footer />
      </View>
        <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
