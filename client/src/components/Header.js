import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, onLoginPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onLoginPress} style={styles.iconContainer}>
        <Ionicons name="person" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 48,
    marginBottom:8,
    backgroundColor: '#fff', // Color de fondo del header
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Color del borde inferior del header
    headerTintColor:'white', headerTitleAlign:'center',headerStyle:{backgroundColor:'#525FE1'}
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 8,
  },
});

export default Header;
