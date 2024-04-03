import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { Formik, useField } from 'formik';
import StyledTextInput from '../StyledTextInput';
import { loginValidationSchena } from '../validation/LoginValidation';
import { useNavigation } from '@react-navigation/native';

const initialValues = {
  email: '',
  password: ''
};

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <StyledTextInput
      value={field.value}
      onChangeText={value => helpers.setValue(value)}
      {...props}
    />
  );
};

export default function LogInPage() {
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://192.168.18.5:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();
      console.log(data);

      if (response.status === 200) {
        navigation.navigate('Profile');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <Formik
      validationSchema={loginValidationSchena}
      initialValues={initialValues}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View>
          <FormikInputValue
            name='email'
            placeholder='E-mail'
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <FormikInputValue
            name='password'
            placeholder='Password'
            secureTextEntry
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          <Button onPress={handleSubmit} title='Iniciar Sesión'></Button>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  error: {
    color: 'red'
  },
  form: {
    margin: 12
  }
});
