// screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Time Display - Top Right */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      
      {/* App Title */}
      <Text style={styles.title}>MediAlert</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>Daily Meds Tracker</Text>
      
      {/* Pill Icon */}
      <View style={styles.iconContainer}>
        <MaterialIcons 
          name="medication" 
          size={120} 
          color="#2b6cb0"
        />
      </View>
      
      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Medications')}
      >
        <Text style={styles.buttonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
  },
  timeContainer: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2b6cb0',
    marginTop: 80,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 60,
  },
  iconContainer: {
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    width: '100%',
    maxWidth: 300,
    position: 'absolute',
    bottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});