import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../HomeScreen';

const PerfilPage = ({navigation}) => {
  
  const [perfil, setPerfil] = useState({
    nombre: '',
    apellido: '',
    rolJuego: '',
    ciudad: '',
    fotoPerfil: null ,
    dni:''
    
  });

  useEffect(() => {
    cargarPerfilLocalmente();
  }, []);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
        if (userLoggedIn !== 'true') {
          console.log('El usuario no está autenticado');
          // Redirige al usuario a la pantalla de inicio de sesión
          // Aquí debes tener la lógica para la navegación a la pantalla de inicio de sesión
        }
      } catch (error) {
        console.error('Error al verificar si el usuario está autenticado:', error);
      }
    };
  
    checkUserLoggedIn();
  }, []);

  
  

  const cargarPerfilLocalmente = async () => {
    try {
      const auth = getAuth();
      const usuarioActual = auth.currentUser;
      if (usuarioActual) {
        const clavePerfil = `perfil_${usuarioActual.uid}`;
        const perfilGuardado = await AsyncStorage.getItem(clavePerfil);
        if (perfilGuardado !== null) {
          setPerfil(JSON.parse(perfilGuardado));
        }
      } else {
        console.log('Error', 'No hay usuario actualmente autenticado.');
      }
    } catch (error) {
      console.error('Error al cargar el perfil desde AsyncStorage:', error);
    }
  };

  const handleChange = (field, value) => {
    setPerfil({ ...perfil, [field]: value });
  };

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Se necesita permiso para acceder a la galería de imágenes.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setPerfil({...perfil, fotoPerfil: { uri: pickerResult.uri }});
    }
  };

  const guardarCambios = async () => {
    try {
      const auth = getAuth();
      const usuarioActual = auth.currentUser;
      if (usuarioActual) {
        await updateProfile(usuarioActual, {
          displayName: perfil.nombre,
          photoURL: perfil.fotoPerfil ? perfil.fotoPerfil.uri : null
        });
        const clavePerfil = `perfil_${usuarioActual.uid}`;
        await AsyncStorage.setItem(clavePerfil, JSON.stringify(perfil));
        console.log('Éxito', 'Datos del perfil actualizados correctamente.');
        console.log(perfil);
        navigation.navigate('Home', { datosPerfil: perfil });
      } else {
        console.log('Error', 'No hay usuario actualmente autenticado.');
      }
    } catch (error) {
      console.error('Error al actualizar datos del perfil:', error);
      console.log('Error', 'No se pudieron guardar los cambios en el perfil.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.photoContainer} onPress={handleSelectImage}>
        {perfil.fotoPerfil ? (
          <Image source={perfil.fotoPerfil} style={styles.photo} />
        ) : (
          <Text style={styles.addPhotoText}>Añadir foto de perfil</Text>
        )}
      </TouchableOpacity>
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
      <TextInput
        style={styles.input}
        placeholder="Dni"
        value={perfil.dni}
        onChangeText={(text) => handleChange('dni', text)}
      />
       <TouchableOpacity style={styles.saveButton} onPress={guardarCambios}>
        <Text style={styles.saveButtonText}>Guardar cambios</Text>
      </TouchableOpacity>
     
      
      
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
  saveButton: {
    backgroundColor: '#525FE1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PerfilPage;