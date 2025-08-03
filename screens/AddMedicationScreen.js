// screens/AddMedicationScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddMedicationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const handleSave = () => {
    if (!name.trim() || !dosage.trim() || !time.trim()) {
      alert('Please fill all fields');
      return;
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
      
      {/* Time Display - Top Right */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      
      {/* Header with Back Button and Centered Title */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2b6cb0" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>ADD MEDICATION</Text>
        </View>
        
        <View style={styles.headerSpacer} />
      </View>
      
      {/* Form */}
      <KeyboardAvoidingView 
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name of medicine</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Metformin"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Dosage</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 500mg"
            value={dosage}
            onChangeText={setDosage}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Time to be taken</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 8:00 AM"
            value={time}
            onChangeText={setTime}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('Medications')}
        >
          <MaterialIcons 
            name="medication" 
            size={24} 
            style={[styles.navIcon, styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, styles.activeNavText]}>Medications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Reminders')}
        >
          <MaterialIcons 
            name="notifications" 
            size={24} 
            style={styles.navIcon} 
          />
          <Text style={styles.navText}>Reminders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('History')}
        >
          <MaterialIcons 
            name="history" 
            size={24} 
            style={styles.navIcon} 
          />
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  timeContainer: {
    position: 'absolute',
    top: 15,
    right: 20,
    zIndex: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    position: 'relative',
  },
  backButton: {
    padding: 5,
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSpacer: {
    width: 24, // Same as back button width for balance
  },
  formContainer: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4a5568',
    marginBottom: 10,
    marginLeft: 5,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#2b6cb0',
    borderRadius: 15,
    padding: 18,
    marginTop: 10,
    alignItems: 'center',
    shadowColor: '#2b6cb0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    width: '33%',
  },
  activeNavItem: {
    backgroundColor: '#ebf8ff',
  },
  navIcon: {
    color: '#a0aec0',
    marginBottom: 4,
  },
  activeNavIcon: {
    color: '#2b6cb0',
  },
  navText: {
    fontSize: 12,
    color: '#a0aec0',
    textAlign: 'center',
  },
  activeNavText: {
    color: '#2b6cb0',
    fontWeight: '600',
  },
});

export default AddMedicationScreen;