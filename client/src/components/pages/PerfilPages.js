import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

const Perfil = () => {
  // Estado para almacenar la información del perfil
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    rolJuego: '',
    ciudad: '',
    fotoPerfil: null 
  });

  // Función para manejar el cambio en los campos de texto
  const handleChange = (field, value) => {
    setPerfil({ ...perfil, [field]: value });
  };

  // Función para manejar la selección de una imagen para el perfil
  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert('Se necesita permiso para acceder a la galería de imágenes.');
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1,1],
    quality:1,
  })

  if (!pickerResult.cancelled) {
    setPerfil({...perfil, fotoPerfil: {uri: pickerResult.uri}})
  }
}


  return (
    <View style={styles.container}>
      {/* Marco redondo para la foto de perfil */}
      <TouchableOpacity style={styles.photoContainer} onPress={handleSelectImage}>
        {perfil.fotoPerfil ? (
          <Image source={perfil.fotoPerfil} style={styles.photo} />
        ) : (
          <Text style={styles.addPhotoText}>Añadir foto de perfil</Text>
        )}
      </TouchableOpacity>
      {/* Campos de texto para el nombre, apellido, rol de juego y ciudad */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={perfil.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={perfil.apellido}
        onChangeText={(text) => handleChange('apellido', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rol de juego"
        value={perfil.rolJuego}
        onChangeText={(text) => handleChange('rolJuego', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad"
        value={perfil.ciudad}
        onChangeText={(text) => handleChange('ciudad', text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  photoContainer: {
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    
  },
  addPhotoText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Perfil;
