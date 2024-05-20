// App.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Importing Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import WorkoutScreen from './screens/WorkoutScreen';
import AddActivityScreen from './screens/AddActivityScreen';

// Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        {/* Navigation routes for the entire app */}
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerTitleAlign: 'center',
              headerTitleStyle: { fontSize: 30 }
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitleAlign: 'center',
              headerTitleStyle: { fontSize: 30 }
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitleAlign: 'center',
              headerTitleStyle: { fontSize: 30 }
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerLeft: () => null,
              headerTitleAlign: 'center',
              headerTitleStyle: { fontSize: 30 }
            }}
          />
          <Stack.Screen
            name="Workout"
            component={WorkoutScreen}
            options={{
              headerTitleAlign: 'center',
              headerTitleStyle: { fontSize: 30 }
            }}
          />
          <Stack.Screen
            name="AddActivity"
            component={AddActivityScreen}
            options={{
              headerTitleAlign: 'center',
              headerTitleStyle: { fontSize: 30 }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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

export default App;