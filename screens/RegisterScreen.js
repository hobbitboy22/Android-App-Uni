// RegisterScreen.js
import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const backToWelcome = () => {
    navigation.navigate('Welcome');
  };

  const toLogin = () => {
    navigation.navigate('Login');
  }

  const register = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    if (password !== confirmPassword){
      setErrorMessage('Passwords do not match');
      return;
    }

    axios.post('https://localhost:7267/api/auth/Register', { firstName, lastName, email, password })
      .then(res => {
        navigation.navigate('Login', { user: res.data, from: 'Register' });
      })
      .catch(err => {
        console.error(err);
        setErrorMessage(`${err.response.data.message}. Try a stronger password` || 'Registration failed. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.input}>
        <TextInput style={styles.textInput} placeholder="First Name" onChangeText={setFirstName} />
        <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={setLastName} />
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} secureTextEntry />
        <TextInput style={styles.textInput} placeholder="Confirm Password" onChangeText={setConfirmPassword} secureTextEntry />
      </View>

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.existingAccount}>Already have an account?</Text>

      <TouchableOpacity style={styles.loginButton} onPress={toLogin}>
        <Text style={styles.buttonText}>Login Here</Text>
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
  loginButton: {
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

export default RegisterScreen;