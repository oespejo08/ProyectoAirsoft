import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Linking } from 'react-native';
import InstagramIcons from '../icons/InstagramIcons';
import FacebookIcons from '../icons/FacebookIcons';
import YoutubeIcons from '../icons/YoutubeIcons';
import ChromeIcons from '../icons/ChromeIcons';
import camposAirsofts from '../CamposAirsoft';

const DetallesCampos = ({ route }) => {
  const { campoSeleccionado } = route.params; // Obtener el campo seleccionado de los parámetros de ruta

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


  return (
    <View style={styles.container}>
      <Text style={styles.tituloCampo}> {campoSeleccionado.nombre}</Text>
      <Text style={styles.subText}> {campoSeleccionado.ciudad}</Text>
      <Text style={styles.subText}>Localización: {campoSeleccionado.localizacion}</Text>
      <Text style={styles.subText}>Partidas:</Text>
      {campoSeleccionado.partidas.map((partida, index) => (
        <Text key={index}>{partida}</Text>
      ))}
      {campoSeleccionado.instagram &&(
      <TouchableOpacity onPress={() => goToInstagramProfile(campoSeleccionado.instagram)}>
        <View style={styles.iconosContainer}>
          <InstagramIcons style={styles.icono} />
          <Text>Perfil de Instagram</Text>
        </View>
      </TouchableOpacity>
      )}
      {campoSeleccionado.facebook &&(
      <TouchableOpacity onPress={() => goToFacebookProfile(campoSeleccionado.facebook)}>
        <View style={styles.iconosContainer}>
          <FacebookIcons style={styles.icono} />
          <Text>Perfil de Facebook</Text>
        </View>
      </TouchableOpacity>
      )}
      {campoSeleccionado.direccion &&(
      <TouchableOpacity onPress={() => goToWebDirecction(campoSeleccionado.direccion)}>
        <View style={styles.iconosContainer}>
          <ChromeIcons style={styles.icono} />
          <Text>Pagina Web</Text>
        </View>
      </TouchableOpacity>
      )}
      {campoSeleccionado.youtube &&(
      <TouchableOpacity onPress={() => goToYoutubeProfile(campoSeleccionado.youtube)}>
        <View style={styles.iconosContainer}>
          <YoutubeIcons style={styles.icono} />
          <Text>Canal de Youtube</Text>
        </View>
      </TouchableOpacity>
      )}
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
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
    fontSize: 24, // Tamaño del texto
    fontWeight: 'bold', // Peso de la fuente
    color: '#333', // Color del texto (puedes cambiarlo según tu diseño)
    textAlign: 'center', // Alineación del texto
    marginTop: 20, // Espaciado superior
    marginBottom: 10, // Espaciado inferior
  },
  subText: {
    fontSize: 16,
    color:'#333',
    marginTop:20,
    marginBottom:10
  }
});

export default DetallesCampos;
