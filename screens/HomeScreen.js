// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Button, Text, View, StyleSheet, Touchable, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = ({ route, navigation }) => {
  const [activities, setActivities] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const { user } = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      ),
    });
    getActivities();
    getWorkouts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchWorkouts = async () => {
        try {
          const response = await fetch('https://localhost:7267/api/workouts');
      
          if (response.ok) {
            const data = await response.json();
            console.log('Workouts:', data);
            setWorkouts(data);
          } else {
            alert('Failed to fetch workouts');
          }
        } catch (error) {
          alert('Error: ' + error);
        }
      };
  
      fetchWorkouts();
    }, [])
  );

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

  const getActivities = async () => {
    try {
      const response = await fetch('https://localhost:7267/api/auth/Activities');
      const activities = await response.json();
      console.log('Activities:', activities);
      setActivities(activities);
    } catch (error) {
      console.error('Failed to get activities:', error);
    }
  };

  const getWorkouts = async () => {
    try {
      const response = await fetch('https://localhost:7267/api/workouts');
  
      if (response.ok) {
        const data = await response.json();
        console.log('Workouts:', data);
        setWorkouts(data);
      } else {
        alert('Failed to fetch workouts');
      }
    } catch (error) {
      alert('Error: ' + error);
    }
  };

  const deleteWorkout = async (workoutId) => {
    try {
      await fetch(`https://localhost:7267/api/workouts/${workoutId}`, {
        method: 'DELETE',
      });
      setWorkouts(workouts.filter(workout => workout.id !== workoutId));
      alert('Workout Deleted!');
    } catch (error) {
      console.error('Failed to delete workout:', error);
      alert('Failed to delete workout');
    }
  };

  return (
    <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}>Welcome!</Text>

          <View>
            {workouts.length > 0 ? (
              workouts.map((workout, index) => {
                // Fetch the activity for this workout
                fetch(`https://localhost:7267/api/activities/${workout.activityID}`)
                  .then(response => response.json())
                  .then(activity => {
                    // Once the activity is fetched, update the workout in the state
                    setWorkouts(workouts => workouts.map((w, i) => i === index ? {...w, activityName: activity.name, activityDescription: activity.description} : w));
                  })
                  .catch(error => console.error('Error:', error));

                return (
                  <View style={styles.workout} key={index}>
                    <Text>Activity Name: {workout.activityName || 'Loading...'}</Text>
                    <Text>{workout.activityDescription}</Text>
                    <Text>Duration: {workout.duration}</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => deleteWorkout(workout.id)}>
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text>No workouts available</Text>
            )}
          </View>

        <TouchableOpacity style={styles.addActivityButton} onPress={() => navigation.navigate('AddActivity', {user: user} )}>
          <Text style={styles.logoutText}>Add Activity</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addWorkoutButton} onPress={() => navigation.navigate('Workout', { user: user })}>
          <Text style={styles.logoutText}>Add Workout</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>

  );
};

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightblue',
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
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginRight: 10,
  },
  logoutText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  addWorkoutButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: 'green',
    borderRadius: 30,
    width: '10%',
  },
  addActivityButton:{
    position: 'absolute',
    right: 10,
    bottom: 50,
    backgroundColor: 'green',
    borderRadius: 30,
    width: '10%',
  },
  workout: {
    backgroundColor: '#0077B6',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  deleteWorkout: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default HomeScreen;