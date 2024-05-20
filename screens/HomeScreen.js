// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <ScrollView>
          <View style={styles.container}>

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
                      <Text style={styles.title}>{workout.activityName || 'Loading...'}</Text>
                      <Text style={styles.information}>{workout.activityDescription}</Text>
                      <Text style={styles.information}>Duration: {workout.duration === 1 ? `${workout.duration} minute` : `${workout.duration} minutes`}</Text>
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

        </View>

      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButton}>

          <TouchableOpacity onPress={() => navigation.navigate('AddActivity', {user: user} )}>
            <Text style={styles.footerText}>Add Activity</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home', { user: user })}>
            <Text style={styles.footerText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Workout', { user: user })}>
            <Text style={styles.footerText}>Add Workout</Text>
          </TouchableOpacity>

        </View>
      </View>

    </SafeAreaView>

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
  workout: {
    backgroundColor: '#0077B6',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  footer: {
    width: '100%',
    height: 50,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  footerText: {
    color: 'black',
    fontSize: 20,
  },
  title: {
    fontSize: 25,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  information: {
    fontSize: 20,
  },
});

export default HomeScreen;