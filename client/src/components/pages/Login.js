import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, Image, TextInput ,TouchableOpacity, Alert} from 'react-native';
import appFirebase from '../../../credenciales';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'




export default function LogInPage(props) {
  const auth = getAuth(appFirebase);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


   const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Iniciando sesión', 'Accediendo...');
      props.navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // Configurar persistencia de autenticación
  //     await auth.setPersistence('local');
  //     // Iniciar sesión con correo electrónico y contraseña
  //     const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     // Actualizar datos del perfil si es necesario
  //     const displayName = user.displayName;
  //     if (!displayName) {
  //       await updateProfile(user, {
  //         displayName: 'Nombre de usuario' // Puedes establecer un nombre de usuario predeterminado si el usuario no tiene uno
  //       });
  //     }
  //     // Guardar el ID del usuario en el almacenamiento local
  //     await AsyncStorage.setItem('userId', user.uid);
  //     // Navegar a la página de inicio después del inicio de sesión exitoso
  //     props.navigation.navigate('Home');
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
  //   }
  // };

  return(
    <View style={styles.padre}>
      <View>
        <Image source={require('../../../assets/iconoLogin.jpg')} style={styles.profile} />
      </View>
      <View style={styles.tarjeta}>
        <View style={styles.cajaTexto}>
          
        <TextInput
        placeholder='correo@gmail.com' style={{paddingHorizontal:15}}
        onChangeText={(text)=>setEmail(text)}
         />
        </View>
        <View style={styles.cajaTexto}>
          
        <TextInput
        placeholder='password' style={{paddingHorizontal:15}} 
        onChangeText={(text)=>setPassword(text)}
        secureTextEntry={true}
         />
        </View>
        <View styles={styles.PadreBoton}>
          <TouchableOpacity style={styles.cajaBoton} onPress={handleSubmit}>
            <Text style={styles.TextoBoton}>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>


      </View>




    </View>
  )

//   const handleLogin = async (values) => {
//     //console.log('Credenciales enviadas', values);
//     try {
//       const response = await fetch('http://127.0.0.1:4000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(values)
//       });

//       const data = await response.json();
//       console.log(data);

//       if (response.status === 200) {
//         await AsyncStorage.setItem('token', data.token)
//         navigation.navigate('Profile');
//       }
//     } catch (error) {
//       console.error('Error al iniciar sesión:', error);
//       setError('Error al iniciar sesión. Por favor, intenta de nuevo.'); // Mostrar mensaje de error genérico
//     }
//   };

//   return (
//     <Formik 
//       validationSchema={loginValidationSchena}
//       initialValues={initialValues}
//       onSubmit={handleLogin}
//     >
//       {({  handleSubmit, errors }) => (
//         <View>
//           <FormikInputValue
//             name='email'
//             placeholder='E-mail'
            
//           />
//           {errors.email && <Text style={styles.error}>{errors.email}</Text>}
//           <FormikInputValue
            
//             name='password'
//             placeholder='Password'
//             secureTextEntry
//           />
//           {errors.password && <Text style={styles.error}>{errors.password}</Text>}

//           <Button onPress={handleSubmit} title='Iniciar Sesión'></Button>
//         </View>
//       )}
//     </Formik>
//   );
 }

const styles = StyleSheet.create({
  error: {
    color: 'red'
  },
  form: {
    margin: 12
  },
  padre:{

    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white'
  },
  
  profile: {
    width:100,
    height:100,
    borderRadius:50,
    borderColor:'white'
  },
  tarjeta:{
    margin:20,
    backgroundColor:'white',
    borderRadius:20,
    width:'90%',
    padding:20,
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,

  },
  cajaTexto:{
    paddingVertical:20,
    backgroundColor:'#cccccc50',
    borderRadius:30,
    marginVertical:10
  },
  PadreBoton:{
    alignItems:'center',

  },
  cajaBoton:{
    backgroundColor:'#525FE1',
    borderRadius:30,
    paddingVertical:20,
    widh:150,
    marginTop:20
  },
  TextoBoton:{
    textAlign:'center',
    color:'white'
  }

});