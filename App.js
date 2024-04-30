import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [showText, setShowText] = useState(false);
  const [ButtonMainText, setButtonMainText] = useState('Show Text');
  const ButtonText1 = 'Show Text';
  const ButtonText2 = 'Remove Text';

  const setButtonName = () => {
    if (ButtonMainText === ButtonText1) {
      setButtonMainText(ButtonText2);
    } else {
      setButtonMainText(ButtonText1);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>OMG I HOPE THIS WORKS</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <Button title={ButtonMainText} onPress={() => { setShowText(!showText); setButtonName(); }} />
        {showText && <Text>Text to show</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
