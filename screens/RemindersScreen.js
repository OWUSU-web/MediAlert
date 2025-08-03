// screens/RemindersScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Animated
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const RemindersScreen = ({ navigation }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showReminder, setShowReminder] = useState(true);
  const [currentMedication, setCurrentMedication] = useState(null);
  
  const reminders = [
    {
      id: '1',
      title: 'Take Medication',
      medication: 'Lisinopril',
      dosage: '10mg',
      time: '8:00 AM',
      icon: 'pill',
      color: '#4299E1'
    },
    {
      id: '2',
      title: 'Take Medication',
      medication: 'Aspirin',
      dosage: '81mg',
      time: '8:00 AM',
      icon: 'pill',
      color: '#48BB78'
    }
  ];

  // Animation values for the reminder modal
  const scaleValue = React.useRef(new Animated.Value(0.8)).current;
  const opacityValue = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Show the first medication reminder when the screen loads
    if (reminders.length > 0) {
      setCurrentMedication(reminders[0]);
    }
    
    // Animate the reminder modal in
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const handleTaken = () => {
    // Close the reminder with animation
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.8,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowReminder(false);
      // Logic to mark medication as taken would go here
    });
  };

  const handleSnooze = () => {
    // Close the reminder with animation
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.8,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowReminder(false);
      // Logic to snooze the reminder would go here
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
      
      {/* Reminder Modal */}
      {showReminder && currentMedication && (
        <Animated.View style={[
          styles.reminderModal,
          { 
            opacity: opacityValue,
            transform: [{ scale: scaleValue }] 
          }
        ]}>
          <View style={styles.reminderContent}>
            <View style={styles.medicationIconContainer}>
              <Ionicons name="notifications" size={36} color="#4299E1" />
            </View>
            
            <Text style={styles.reminderTitle}>Take Medication</Text>
            
            <View style={styles.medicationInfo}>
              <Text style={styles.medicationName}>{currentMedication.medication}</Text>
              <Text style={styles.medicationDosage}>{currentMedication.dosage}</Text>
            </View>
            
            <View style={styles.timeBadge}>
              <MaterialIcons name="access-time" size={20} color="#4299E1" />
              <Text style={styles.timeText}>{currentMedication.time}</Text>
            </View>
            
            <View style={styles.actionButtons}>
              <TouchableOpacity 
                style={styles.takenButton}
                onPress={handleTaken}
              >
                <Text style={styles.takenButtonText}>Taken</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.snoozeButton}
                onPress={handleSnooze}
              >
                <Text style={styles.snoozeButtonText}>Snooze</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Reminders</Text>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Today's Reminders */}
        <Text style={styles.sectionTitle}>TODAY'S REMINDERS</Text>
        
        {reminders.map(reminder => (
          <TouchableOpacity 
            key={reminder.id} 
            style={styles.reminderCard}
            onPress={() => {
              setCurrentMedication(reminder);
              setShowReminder(true);
              // Reset animations
              scaleValue.setValue(0.8);
              opacityValue.setValue(0);
              Animated.parallel([
                Animated.spring(scaleValue, {
                  toValue: 1,
                  friction: 5,
                  useNativeDriver: true,
                }),
                Animated.timing(opacityValue, {
                  toValue: 1,
                  duration: 500,
                  useNativeDriver: true,
                })
              ]).start();
            }}
          >
            <View style={[styles.reminderIcon, { backgroundColor: `${reminder.color}20` }]}>
              <MaterialIcons 
                name={reminder.icon} 
                size={28} 
                color={reminder.color}
              />
            </View>
            
            <View style={styles.reminderInfo}>
              <Text style={styles.reminderCardTitle}>{reminder.title}</Text>
              <Text style={styles.medicationCardName}>{reminder.medication}</Text>
            </View>
            
            <View style={styles.timeContainer}>
              <Text style={styles.reminderTime}>{reminder.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Settings Section */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>SOUND & VIBRATION</Text>
        
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons name="volume-high" size={24} color="#4A5568" />
            </View>
            <Text style={styles.settingText}>Sound</Text>
            <Switch
              trackColor={{ false: "#E2E8F0", true: "#4299E1" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E2E8F0"
              onValueChange={() => setSoundEnabled(!soundEnabled)}
              value={soundEnabled}
              style={styles.switch}
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Ionicons name="phone-vibrate" size={24} color="#4A5568" />
            </View>
            <Text style={styles.settingText}>Vibration</Text>
            <Switch
              trackColor={{ false: "#E2E8F0", true: "#4299E1" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#E2E8F0"
              onValueChange={() => setVibrationEnabled(!vibrationEnabled)}
              value={vibrationEnabled}
              style={styles.switch}
            />
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Medications')}
        >
          <MaterialIcons 
            name="medication" 
            size={24} 
            style={styles.navIcon} 
          />
          <Text style={styles.navText}>Medications</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navItem, styles.activeNavItem]}
        >
          <MaterialIcons 
            name="notifications" 
            size={24} 
            style={[styles.navIcon, styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, styles.activeNavText]}>Reminders</Text>
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
  // Reminder Modal Styles
  reminderModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  reminderContent: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 30,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  medicationIconContainer: {
    backgroundColor: '#EBF8FF',
    width: 70,
    height: 70,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  reminderTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 10,
  },
  medicationInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  medicationName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2b6cb0',
    marginBottom: 5,
  },
  medicationDosage: {
    fontSize: 20,
    color: '#4a5568',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF8FF',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  timeText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4299E1',
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  takenButton: {
    backgroundColor: '#48BB78',
    borderRadius: 15,
    paddingVertical: 18,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#48BB78',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  takenButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  snoozeButton: {
    backgroundColor: '#ED8936',
    borderRadius: 15,
    paddingVertical: 18,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
    shadowColor: '#ED8936',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  snoozeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  // Existing styles
  header: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#718096',
    textTransform: 'uppercase',
    marginBottom: 15,
    marginLeft: 10,
  },
  reminderCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderCardTitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 4,
  },
  medicationCardName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a202c',
  },
  timeContainer: {
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  reminderTime: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4299E1',
  },
  settingCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  settingIcon: {
    width: 40,
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    fontSize: 18,
    color: '#1a202c',
  },
  switch: {
    transform: [{ scaleX: .9 }, { scaleY: .9 }],
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: 'white',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    width: '30%',
  },
  activeNavItem: {
    backgroundColor: '#ebf8ff',
  },
  navIcon: {
    color: '#a0aec0',
    marginBottom: 4,
  },
  activeNavIcon: {
    color: '#4299e1',
  },
  navText: {
    fontSize: 12,
    color: '#a0aec0',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#4299e1',
    fontWeight: '600',
  },
});

export default RemindersScreen;