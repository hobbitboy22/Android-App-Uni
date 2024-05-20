// LoginScreen.js
import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Text } from 'react-native';
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
      
      <Button style={styles.button} title="Login" onPress={login} />
      <Text style={styles.existingAccount}>Don't have an account?</Text>
      <Button style={styles.button} title="Create Account" onPress={toRegister} />
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
    borderRadius: 1,
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
    fontSize: 20,
    marginBottom: 10,
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