// LoginScreen.js
import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      <View style={styles.input}>
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} secureTextEntry />
      </View>
      <Button style={styles.button} title="Login" onPress={login} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
});

export default LoginScreen;