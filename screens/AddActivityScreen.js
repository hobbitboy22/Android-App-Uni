// AddActivityScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const AddActivityScreen = ({route, navigation}) => {
    const [activityName, setActivityName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [activities, setActivities] = useState([]);
    
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
                console.log('Failed to fetch activities');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const addActivity = async () => {
        try {
            const response = await fetch('https://localhost:7267/api/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: activityName, description: description, type: type }),
            });

            if (response.ok) {
                console.log('Activity added!');
                alert('Activity added!');
            } else {
                const errorData = await response.json();
                alert(`Failed to add activity: ${JSON.stringify(errorData)}`);
                console.log('Failed to add activity');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    function capitalizeWords(text) {
        return text.replace(/\b\w/g, char => char.toUpperCase());
    }

    function capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <TextInput style={styles.textInput}
                            placeholder="Enter activity name"
                            value={activityName}
                            onChangeText={(text) => setActivityName(capitalizeWords(text))}
                            maxLength={150}
                        />
                        <TextInput style={styles.textInput}
                            placeholder="Enter description"
                            value={description}
                            onChangeText={(text) => setDescription(capitalizeFirstLetter(text))}
                            maxLength={150}
                        />
                        <TextInput style={styles.textInput}
                            placeholder="Enter type"
                            value={type}
                            onChangeText={(text) => setType(capitalizeFirstLetter(text))}
                            maxLength={50}
                        />
                        <Button style={styles.button} title="Add Activity" onPress={addActivity} />
                    </View>

                    <View>
                        <View>
                            {activities.length > 0 ? (
                                activities.map((activity) => (
                                    <Text key={activity.id}>{activity.name}</Text>
                                ))
                            ) : (
                                <Text>No activities available</Text>
                            )}
                        </View>
                    </View>
                </View>
        </ScrollView>

        <View style={styles.footer}>
            <View style={styles.footerButton}>

                <TouchableOpacity onPress={() => navigation.navigate('AddActivity', { user: user })}>
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
    errorMessage: {
      fontSize: 16,
      color: 'red',
      marginBottom: 10,
    },
    existingAccount: {
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
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
      }
  });

export default AddActivityScreen;