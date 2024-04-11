import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './Header'; // Importa el componente Header
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import InstagramIcons from './icons/InstagramIcons';
import FacebookIcons from './icons/FacebookIcons';
import YoutubeIcons from './icons/YoutubeIcons';
import ChromeIcons from './icons/ChromeIcons';
import camposAirsofts from './CamposAirsoft';




const HomeScreen = ({navigation}) => {


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

  const goToWebDirecction =(direccion) => {
    const url = direccion;
    Linking.openURL(url).catch(err=> console.error('Error al abir el enlace',err))
  }


  const [partidaSeleccionada, setPartidaSeleccionada] = useState(null);

  const handleLoginPress = () => {
    // Navega a la pantalla de inicio de sesión al hacer clic en el icono de login
    navigation.navigate('Login');
  };

  const handlePartidaPress = (nombreCampo) => {
    setPartidaSeleccionada(prevSeleccion => prevSeleccion === nombreCampo ? null : nombreCampo);
  };

  const handleApuntarse = (partida) => {
    // Lógica para apuntarse a la partida seleccionada
    console.log(`Te has apuntado a la partida de ${partida} en el campo ${partidaSeleccionada}`);
  };

  
  return (
    <ScrollView style={styles.container}>
  <Header title="AirSoftApp" onLoginPress={handleLoginPress} />
  {camposAirsofts.map((campo, index) => (
    <View key={index} style={styles.camposContainer}>
      <TouchableOpacity onPress={() => {handlePartidaPress(campo.nombre);}}>
        <View style={styles.iconosContainer}>
          <TouchableOpacity onPress={() => goToInstagramProfile(campo.instagram)}>
            <View style ={styles.iconosContainer}>
            <InstagramIcons style={styles.icono} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goToFacebookProfile(campo.facebook)}>
          <View style={styles.iconosContainer}>
            <FacebookIcons style={styles.icono}/>
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
      </TouchableOpacity>
      {partidaSeleccionada === campo.nombre && (
        <View style={styles.partidasContainer}>
          {campo.partidas.map((partida, index) => (
            <TouchableOpacity key={index} onPress={() => handleApuntarse(partida)}>
              <Text style={styles.partidaText}>Partida del {partida}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  ))}
</ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  iconosContainer: {
    flexDirection: 'row', // Alinea los iconos en una fila
    marginTop: 10, // Margen superior entre los iconos y el texto
  },
  icono: {
    marginRight: 10, // Espacio entre los iconos
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camposNombre: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center'
  },
  camposContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  documentacion: {
    fontSize:16,
    alignSelf:'flex-end',
    fontWeight:'bold'
  },
  partidasContainer: {
    marginTop: 10,
  },
  partidaText: {
    fontSize: 16,
    marginBottom: 5,
    color: 'blue',
  },

});

export default HomeScreen;
