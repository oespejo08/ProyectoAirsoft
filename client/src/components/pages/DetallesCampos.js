import React from 'react';
import { View, Text } from 'react-native';

const DetallesCampos = ({ route }) => {
  const { campoSeleccionado } = route.params; // Obtener el campo seleccionado de los parámetros de ruta

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detalles del Campo:</Text>
      <Text>Nombre: {campoSeleccionado.nombre}</Text>
      <Text>Ciudad: {campoSeleccionado.ciudad}</Text>
      {/* Agrega más detalles según tu modelo de datos */}
    </View>
  );
};

export default DetallesCampos;
