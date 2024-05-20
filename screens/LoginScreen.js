// LoginScreen.js
import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const toRegister = () => {
    navigation.navigate('Register');
  };

  const login = () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    axios.post('https://localhost:7267/api/auth/Login', { email, password })
      .then(res => {
        navigation.navigate('Home', { user: res.data });
      })
      .catch(err => console.error(err));
  };
  
  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {route.params?.from === 'Register' ? <Text style={styles.fromRegister}>Register Successful, Please log in</Text> : null}
      <View style={styles.input}>
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.existingAccount}>Don't have an account?</Text>

      <TouchableOpacity style={styles.registerButton} onPress={toRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

    </View>
  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightblue',
  },
  input: {
    backgroundColor: '#0077B6',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: '#0377fc',
    width: 150,
  },
  registerButton: {
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: '#0377fc',
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginBottom: 10,
  },
  fromRegister: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
  },
  existingAccount: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default LoginScreen;