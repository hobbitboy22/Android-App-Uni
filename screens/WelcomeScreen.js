// WelcomeScreen.js
import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const WelcomeScreen = ({ navigation, route }) => {
  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login', {from: 'Welcome'})}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register', {from: 'Welcome'})}>
        <Text style={styles.text}>Register</Text>
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
  button: {
    borderWidth: 1,
    borderColor: '#0377fc',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#0377fc',
  },
  text: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
});

export default WelcomeScreen;