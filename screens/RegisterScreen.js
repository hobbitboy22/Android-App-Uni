// RegisterScreen.js
import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import axios from 'axios';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const backToWelcome = () => {
    navigation.navigate('Welcome');
  };

  const register = () => {
    if (!firstName || !lastName || !email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    axios.post('https://localhost:7267/api/auth/Register', { firstName, lastName, email, password })
      .then(res => {
        navigation.navigate('Home', { user: res.data });
      })
      .catch(err => console.error(err));
  };

  return (
    <View style={styles.container}>
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <View style={styles.input}>
        <TextInput style={styles.textInput} placeholder="First Name" onChangeText={setFirstName} />
        <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={setLastName} />
        <TextInput style={styles.textInput} placeholder="Email" onChangeText={setEmail} />
        <TextInput style={styles.textInput} placeholder="Password" onChangeText={setPassword} secureTextEntry />
      </View>
      <Button style={styles.button} title="Register" onPress={register} />
      <Button style={styles.button} title="Back" onPress={backToWelcome} />
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
// });

export default RegisterScreen;