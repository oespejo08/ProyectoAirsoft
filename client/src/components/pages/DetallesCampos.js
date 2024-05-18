import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Linking } from 'react-native';
import InstagramIcons from '../icons/InstagramIcons';
import FacebookIcons from '../icons/FacebookIcons';
import YoutubeIcons from '../icons/YoutubeIcons';
import ChromeIcons from '../icons/ChromeIcons';
import camposAirsofts from '../CamposAirsoft';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator } from 'react-native';


const DetallesCampos = ({ route }) => {
    const { campoSeleccionado, dniJugador,datosPerfil } = route.params || {}; // Obtener el campo seleccionado y el DNI del jugador de los parámetros de ruta

    console.log('Datos del campo seleccionado:', campoSeleccionado);

    

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
        Linking.openURL(url).catch(err => console.error('Error al abrir el enlace', err))
    }

    const eliminarPartida = async (diaPartida) => {
      try {
          // Antes de eliminar la partida, mostrar un alert para confirmar
          Alert.alert(
              'Confirmación',
              '¿Estás seguro de que quieres quitarte de esta partida?',
              [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                      text: 'Sí, quiero quitarme',
                      onPress: async () => {
                          const response = await fetch(`http://192.168.56.1:4000/usuario/listaPartida/${dniJugador}/${diaPartida}`, {
                              method: 'DELETE',
                              headers: {
                                  'Content-Type': 'application/json',
                              },
                          });
  
                          if (response.ok) {
                              console.log('¡Jugador eliminado de la partida correctamente!');
                              // Aquí puedes actualizar la vista o mostrar un mensaje de éxito
                          } else {
                              console.error('Error al eliminar jugador de la partida:', response.statusText);
                              // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
                          }
                      }
                  }
              ]
          );
      } catch (error) {
          console.error('Error al realizar la solicitud:', error);
      }
  };
    const handleQuitarsePartida = async (diaPartida) => {
      try {
          await eliminarPartida(diaPartida);
          // Aquí puedes actualizar la vista si es necesario
      } catch (error) {
          console.error('Error al intentar quitarse de la partida:', error);
      }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.tituloCampo}> {campoSeleccionado.nombre}</Text>
      <Text style={styles.subText}> {campoSeleccionado.ciudad}</Text>
      <Text style={styles.subText}>Localización: {campoSeleccionado.localizacion}</Text>
             
      <Text style={styles.subText}>Partidas:</Text>
      {campoSeleccionado.partidas.map((partida, index) => (
        <Text key={index}>{partida}</Text>
      ))}
      {campoSeleccionado.instagram && (
        <TouchableOpacity onPress={() => goToInstagramProfile(campoSeleccionado.instagram)}>
          <View style={styles.iconosContainer}>
            <InstagramIcons style={styles.icono} />
            <Text>Perfil de Instagram</Text>
          </View>
        </TouchableOpacity>
      )}
      {campoSeleccionado.facebook && (
        <TouchableOpacity onPress={() => goToFacebookProfile(campoSeleccionado.facebook)}>
          <View style={styles.iconosContainer}>
            <FacebookIcons style={styles.icono} />
            <Text>Perfil de Facebook</Text>
          </View>
        </TouchableOpacity>
      )}
      {campoSeleccionado.direccion && (
        <TouchableOpacity onPress={() => goToWebDirecction(campoSeleccionado.direccion)}>
          <View style={styles.iconosContainer}>
            <ChromeIcons style={styles.icono} />
            <Text>Pagina Web</Text>
          </View>
        </TouchableOpacity>
      )}
      {campoSeleccionado.youtube && (
        <TouchableOpacity onPress={() => goToYoutubeProfile(campoSeleccionado.youtube)}>
          <View style={styles.iconosContainer}>
            <YoutubeIcons style={styles.icono} />
            <Text>Canal de Youtube</Text>
          </View>
        </TouchableOpacity>
      )}
      {/* Botones para quitarse de las partidas */}
      <TouchableOpacity onPress={() => handleQuitarsePartida('sábado')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Quitarse de la partida del Sábado</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleQuitarsePartida('domingo')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Quitarse de la partida del Domingo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20
  },
  iconosContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icono: {
    marginRight: 10,
  },
  tituloCampo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
  },
});

export default DetallesCampos;
