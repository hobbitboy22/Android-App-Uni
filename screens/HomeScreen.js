// HomeScreen.js
import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const logout = () => {
    axios.post('https://localhost:7267/api/auth/Logout')
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      })
      .catch(err => console.error(err));
  };

  return (
    <View>
      <Text>Welcome, {user.firstName}!</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

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
//   },
// });

export default HomeScreen;