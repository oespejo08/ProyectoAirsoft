// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoIOQQfJyKZUwGfNc3d1Z0bn1lFfcZTLA",
  authDomain: "airsoftapplogin-187b7.firebaseapp.com",
  projectId: "airsoftapplogin-187b7",
  storageBucket: "airsoftapplogin-187b7.appspot.com",
  messagingSenderId: "1045694622103",
  appId: "1:1045694622103:web:f30bae579820771875bcd2",
  measurementId: "G-NRH5BCHBYK"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = initializeAuth(appFirebase)


// Configurar la persistencia de sesión (persistencia local)
const initializeFirebaseAuth = async() => {
    try {
        const persistence = await getReactNativePersistence(AsyncStorage);
        await auth.setPersistence(persistence);
        console.log('Persistencia de sesión configurada correctamente.');
      } catch (error) {
        console.error('Error al configurar la persistencia de sesión:', error);
      }
    };

    initializeFirebaseAuth();


// Función para manejar la creación de cuenta de usuario
const handleCreateAccount = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Cuenta creada:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error al crear la cuenta:', error);
    });
};

export default appFirebase;
