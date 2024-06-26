import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Header from './Header';
import { Linking } from 'react-native';
import InstagramIcons from './icons/InstagramIcons';
import FacebookIcons from './icons/FacebookIcons';
import YoutubeIcons from './icons/YoutubeIcons';
import ChromeIcons from './icons/ChromeIcons';
import camposAirsofts from './CamposAirsoft';
import { Image } from 'react-native';


const HomeScreen = ({ navigation, route }) => {
  const {datosPerfil} = route.params || {};
  
  
  const goToInstagramProfile = (perfil) => {
    const url = `https://www.instagram.com/${perfil}/`;
    Linking.openURL(url).catch(err => console.error('Error al abrir el enlace:', err));
  };

  const goToFacebookProfile = (perfil) => {
    const url = `https://www.facebook.com/${perfil}/`;
    Linking.openURL(url).catch(err => console.error('Error al abrir el enlace:', err));
  };

  const goToYoutubeProfile = (perfil) => {
    const url = `https://www.youtube.com/${perfil}/`;
    Linking.openURL(url).catch(err => console.error('Error al abrir el enlace:', err));
  };

  const goToWebDirecction = (direccion) => {
    const url = direccion;
    Linking.openURL(url).catch(err => console.error('Error al abir el enlace', err))
  }

  const [partidaSeleccionada, setPartidaSeleccionada] = useState(null);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handlePartidaPress = (nombreCampo) => {
    setPartidaSeleccionada(prevSeleccion => prevSeleccion === nombreCampo ? null : nombreCampo);
  };

  

  const handleApuntarse = async (datosPerfil, partida) => {
    try {
        console.log('Datos del perfil a enviar:', datosPerfil);
        // Verificar si el jugador ya está apuntado
        const checkResponse = await fetch(`http://192.168.56.1:4000/partidas/minervacombat/Apuntado/${datosPerfil.dniJugador}/${partida}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (checkResponse.ok) {
            const jugadorApuntado = await checkResponse.json();
            Alert.alert('Información', 'El jugador ya está apuntado.');
        } else if (checkResponse.status === 404) {
            const errorData = await checkResponse.json();
            if (errorData.message === 'Usuario no encontrado') {
                // Mostrar alerta de confirmación
                Alert.alert(
                    'Confirmación',
                    '¿Deseas apuntarte a esta partida?',
                    [
                        {
                            text: 'Cancelar',
                            style: 'cancel',
                        },
                        {
                            text: 'Sí, apuntarme',
                            onPress: async () => {
                                const response = await fetch(`http://192.168.56.1:4000/partidas/minervacombat/${partida}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        nombre: datosPerfil.nombre,
                                        apellido: datosPerfil.apellido,
                                        dniJugador: datosPerfil.dniJugador,
                                    }),
                                });

                                if (response.ok) {
                                    Alert.alert('Éxito', '¡Te has apuntado correctamente a la partida!');
                                } else {
                                    console.error('Error al apuntarse a la partida:', response.statusText);
                                    Alert.alert('Error', 'Hubo un problema al apuntarse a la partida.');
                                }
                            }
                        }
                    ]
                );
            } else {
                console.error('Error desconocido al verificar el usuario:', errorData.message);
                Alert.alert('Error', `Error desconocido: ${errorData.message}`);
            }
        } else {
            console.error('Error al verificar si el jugador está apuntado:', checkResponse.statusText);
            Alert.alert('Error', `Error al verificar jugador: ${checkResponse.statusText}`);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        Alert.alert('Error', `Error al realizar la solicitud: ${error.message}`);
    }
};

  

  const camposPorCiudad = {};
  camposAirsofts.forEach(campo => {
    if (!camposPorCiudad[campo.ciudad]) {
      camposPorCiudad[campo.ciudad] = [];
    }
    camposPorCiudad[campo.ciudad].push(campo);
  });

  const handleVerDetalles = (campo) => {
    if (datosPerfil && datosPerfil.dniJugador) {
        navigation.navigate('DetallesCampos', { campoSeleccionado: campo, dniJugador: datosPerfil.dniJugador, datosPerfil: datosPerfil });
    } else {
        Alert.alert(
            'Inicio de sesión requerido',
            'Debes iniciar sesión para ver los detalles del campo.',
            [
                {
                    text: 'Ir a inicio de sesión',
                    onPress: () => navigation.navigate('Login'),
                },
            ],
            { cancelable: false }
        );
    }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="AirSoftApp" onLoginPress={handleLoginPress}/>
      {Object.entries(camposPorCiudad).map(([ciudad, campos], index) => (
        <View key={index} style={styles.ciudadContainer}>          
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: 'row' }}>
              {campos.map((campo, index) => (
                <View key={index} style={styles.camposContainer}>
                  <Image
                  source={campo.ImagenFondo}
                  style={styles.campoBackgroundImage}
                  resizeMode="cover"
                  />
                  <TouchableOpacity onPress={() => { handlePartidaPress(campo.nombre); }}>
                    
                    <View style={styles.iconosContainer}>
                      <TouchableOpacity onPress={() => goToInstagramProfile(campo.instagram)}>
                        <View style={styles.iconosContainer}>
                          <InstagramIcons style={styles.icono} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => goToFacebookProfile(campo.facebook)}>
                        <View style={styles.iconosContainer}>
                          <FacebookIcons style={styles.icono} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => goToYoutubeProfile(campo.youtube)}>
                        <View style={styles.iconosContainer}>
                          {campo.youtube && <YoutubeIcons style={styles.icono} />}
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => goToWebDirecction(campo.direccion)}>
                        <View style={styles.iconosContainer}>
                          {campo.direccion && <ChromeIcons style={styles.icono} />}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.camposNombre}>{campo.nombre}</Text>
                    <Text style={styles.documentacion}>{campo.ciudad}</Text>
                    <TouchableOpacity onPress={() => handleVerDetalles(campo)}>
                      <Text style={styles.verDetallesText}>Ver detalles</Text>
                    </TouchableOpacity>
                      
                  </TouchableOpacity>
                  {partidaSeleccionada === campo.nombre && (
                    <View style={styles.partidasContainer}>
                     
                      {campo.partidas.map((partida, index) => (
                        <TouchableOpacity key={index} onPress={() => handleApuntarse(datosPerfil,partida)}>
                          <Text style={styles.partidaText}>Partida del {partida}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  ciudadContainer: {
    marginBottom: 20,
    
  },
  iconosContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icono: {
    marginRight: 10,
  },
  camposNombre: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center'
  },
  camposContainer: {
    width: 360,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  documentacion: {
    fontSize: 16,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    
  },
  verDetallesText: {
    color: 'black',
    marginTop: 5,
    fontWeight: 'bold'
  },
  partidasContainer: {
    marginTop: 10,
  },
  partidaText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
  },
  camposContainer: {
    width: 360,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    overflow: 'hidden', // Agrega esta propiedad para ocultar el exceso de imagen
  },
  campoBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    opacity: 0.4,
    resizeMode: 'cover',
    flex: 1, // Añade esta propiedad para que la imagen ocupe todo el espacio disponible dentro del contenedor
  },
  
});

export default HomeScreen;