// HomeScreen.js
import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const handleLogout = async () => {
    try {
      await fetch('https://localhost:7267/api/auth/Logout', {
        method: 'POST',
      });
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello, {user.firstName}!</Text>
      <Button title="LogOut" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});

export default HomeScreen;