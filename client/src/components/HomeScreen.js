import React,{useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from './Header'; // Importa el componente Header
import { ScrollView } from 'react-native-gesture-handler';



const HomeScreen = ({navigation}) => {

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

  const camposAirsofts = [
    {nombre: 'MinervaCombat', ciudad:'Malaga', localizacion:'', partidas: ['Sabado','Domingo']},
    {nombre: 'ZonaZ', ciudad:'Malaga', localizacion:'', partidas: ['Sabado','Domingo']},
    {nombre: 'Kampo Lira', ciudad:'Malaga', localizacion:'', partidas: ['Sabado','Domingo']},
    


  ]
  return (
    <ScrollView style={styles.container}>
      <Header title="AirSoftApp" onLoginPress={handleLoginPress} />
      {camposAirsofts.map((campo, index) => (
        <View key={index} style={styles.camposContainer}>
          <TouchableOpacity onPress={() => handlePartidaPress(campo.nombre)}>
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
