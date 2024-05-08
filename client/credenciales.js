import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


    const firebaseConfig = {
      apiKey: "AIzaSyC0Urvqm_hlC4ZRv3s9Q7FaFUfMd5x3loQ",
      authDomain: "appairsoftlogin.firebaseapp.com",
      projectId: "appairsoftlogin",
      storageBucket: "appairsoftlogin.appspot.com",
      messagingSenderId: "493506299952",
      appId: "1:493506299952:web:2b65e6a73ab7e4b6f505f5"
    };

   const app = initializeApp(firebaseConfig)

export default app;