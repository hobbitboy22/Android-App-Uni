// WorkoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Picker, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, } from 'react-native'

const WorkoutScreen = ({ route, navigation }) => {
    const [activities, setActivities] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [duration, setDuration] = useState('');
  
    const { user } = route.params;

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
      <SafeAreaView style={styles.container}>
        <ScrollView>
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

            <Text style={styles.textInput}>Workout Duration (in minutes):</Text>

            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(text) => setDuration(text)}
              value={duration}
            />

            <TouchableOpacity style={styles.button} onPress={addWorkout}>
              <Text style={styles.buttonText}>Add Workout</Text>
            </TouchableOpacity>

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
      buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5,
      },
  });

export default WorkoutScreen;