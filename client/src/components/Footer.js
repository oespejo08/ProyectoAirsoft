import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Footer = () => {
  const navigation = useNavigation();
  const handlePlayPress = () => {
    //navegar a la pantalla de jugar
    navigation.navigate('Home')
    console.log('Boton de jugar pulsado');
  };

  const handleShopsPress = () => {
    //navegar a la pantalla de tiendas
    navigation.navigate('TiendasScreen');
    console.log('Boton de tiendas pulsado');
  };

  const handleProfilePress = () => {
    //navegar a la pantalla de perfil
    navigation.navigate('Perfil')
    console.log('Boton de perfil pulsado');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlayPress} style={styles.iconContainer}>
        <Ionicons name="play" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleShopsPress} style={styles.iconContainer}>
        <Ionicons name="storefront" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleProfilePress} style={styles.iconContainer}>
        <Ionicons name="person-circle-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  iconContainer: {
    padding: 8,
  },
});

export default Footer;
