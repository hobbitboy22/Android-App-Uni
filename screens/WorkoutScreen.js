// WorkoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Picker, StyleSheet } from 'react-native'

const WorkoutScreen = ({ navigation }) => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [duration, setDuration] = useState('');
  
    useEffect(() => {
      fetchActivities();
    }, []);
  
    const fetchActivities = async () => {
      try {
        const response = await fetch('https://localhost:7267/api/activities');
  
        if (response.ok) {
          const data = await response.json();
          setActivities(data);
        } else {
          alert('Failed to fetch activities');
        }
      } catch (error) {
        alert('Error: ' + error);
      }
    };
  
    const addWorkout = async () => {
      if (!duration) {
        alert('Please enter a duration');
        return;
      }
  
      if (!selectedActivity || !selectedActivity.id) {
        alert('Please select an activity');
        return;
      }
  
      try {
        const response = await fetch('https://localhost:7267/api/workouts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activityID: selectedActivity.id, duration: parseFloat(duration) }),
        });
  
        const responseBody = await response.text();
  
        if (response.ok) {
          alert('Workout added!');
        } else {
          const errorData = JSON.parse(responseBody);
          alert('Failed to add workout: ' + JSON.stringify(errorData));
        }
      } catch (error) {
        alert('Error: ' + error);
      }
    };
  
    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedActivity ? selectedActivity.id : null}
                onValueChange={(itemValue) => {
                    const activityId = Number(itemValue);
                    const activity = activities.find((activity) => activity.id === activityId);
                    setSelectedActivity(activity);
                  }}
            >
                <Picker.Item label="Please select an activity" value={null} />
                {activities.map((activity) => (
                    <Picker.Item key={activity.id} label={activity.name} value={activity.id} />
                ))}
            </Picker>

            <TextInput
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => setDuration(text)}
                value={duration}
            />
            <Button title="Add Workout" onPress={addWorkout} />
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
      borderRadius: 10,
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
      borderRadius: 30,
      backgroundColor: '#0077B6',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
    },
    errorMessage: {
      fontSize: 16,
      color: 'red',
      marginBottom: 10,
    },
    existingAccount: {
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
    }
  });

export default WorkoutScreen;