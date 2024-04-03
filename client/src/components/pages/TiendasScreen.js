import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';




const TiendasScreen = () => {
  const handleDireccionPress = (url) => {
    console.log("URl presionada:", url)
    Linking.openURL(url);

  };
  
  
  const tiendas = [
    { nombre: 'VsGun', url: 'https://www.vsgun.com', imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0NUwa7fuHiHeUTZm3ze_4X5_Zn6qNMH-B6w&usqp=CAU' },          
    { nombre: 'AirSoftYecla', url: 'https://airsoftyecla.es/',imagen:'https://airsoftyecla.es/27200-large_default/parche-airsoftyecla.jpg'},
    { nombre: 'HobbyExpert', url: 'https://www.hobbyexpert.es/', imagen:'https://www.hobbyexpert.es/media/catalog/product/placeholder/default/logo_hobbyexpert_hex.jpg' },
    { nombre: 'FullMetal', url: 'https://fullmetal.es/',imagen:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkVkVcR2tKCBJCqdwwPPKUq4Fq8oapsEmxAA&usqp=CAU' },
    { nombre: 'AirsoftGallardo', url: 'http://www.airsoftgallardo.com/',imagen:'https://yt3.googleusercontent.com/ytc/AIdro_kM5_o4lY5-I3hFMj5bcSDmpf7GZwsiw5uG_lc5=s900-c-k-c0x00ffffff-no-rj' },
    { nombre: 'Ranger', url: 'https://www.rangertienda.com/',imagen:'https://islazul.com/site/wp-content/uploads/2021/03/ranger-logo.jpg' },
    
  ];
  
  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      {tiendas.map((tienda,index)=> (
        
      
      <View key={index} style={styles.tiendaContainer}>
        {/* Datos de la primera tienda */}
        <Text style={styles.tiendaNombre}>{tienda.nombre}</Text>
        <TouchableOpacity onPress={() => handleDireccionPress(tienda.url)}>
        

        <Image
          style={styles.image}
          source={{ uri:tienda.imagen}}
          resizeMode='contain'

          />
        </TouchableOpacity>
        {/* Puedes agregar más datos aquí */}
      </View>
      ))}       
    
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tiendaContainer: {
    backgroundColor: '#ffffff', // Color de fondo del recuadro de la tienda
    borderRadius: 10, // Bordes redondeados
    padding: 10, // Espaciado interno
    marginBottom: 20, // Margen inferior entre los recuadros de las tiendas
    // Puedes agregar más estilos según sea necesario
  },
  image: {
    alignSelf: 'center',
    width:150,
    height:100,   
  },
  direccion: {
    color: 'blue',
    textDecorationLine:'underline',
    marginBottom:5,
  },
  tiendaNombre: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf:'center'
  },
});

export default TiendasScreen;
