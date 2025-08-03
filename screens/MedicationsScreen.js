// screens/MedicationsScreen.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MedicationsScreen = ({ navigation }) => {
  const [medications, setMedications] = useState([
    {
      id: '1',
      name: 'Aspirin',
      dosage: '75 mg',
      frequency: 'Once daily',
      times: ['08:00 AM'],
      color: '#FF6B6B',
      type: 'Tablet',
      stock: 15,
      icon: 'pill',
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10 mg',
      frequency: 'Once daily',
      times: ['08:00 AM'],
      color: '#4ECDC4',
      type: 'Capsule',
      stock: 8,
      icon: 'medication',
    },
    {
      id: '3',
      name: 'Metformin',
      dosage: '500 mg',
      frequency: 'Twice daily',
      times: ['08:00 AM', '06:00 PM'],
      color: '#FFD166',
      type: 'Tablet',
      stock: 24,
      icon: 'pill',
    },
    {
      id: '4',
      name: 'Atorvastatin',
      dosage: '20 mg',
      frequency: 'Once daily',
      times: ['08:00 PM'],
      color: '#6A0572',
      type: 'Tablet',
      stock: 5,
      icon: 'medication',
    },
  ]);

  const handleAddMedication = () => {
    navigation.navigate('AddMedication');
  };

  const renderMedicationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.medicationCard}
      onPress={() => navigation.navigate('MedicationDetails', { medication: item })}
    >
      <View style={styles.medicationIconContainer}>
        <MaterialIcons 
          name={item.icon} 
          size={28} 
          color={item.color}
          style={styles.medicationIcon}
        />
      </View>
      
      <View style={styles.medicationInfo}>
        <View style={styles.medicationHeader}>
          <Text style={styles.medicationName}>{item.name}</Text>
          <Text style={styles.medicationType}>{item.type}</Text>
        </View>
        
        <Text style={styles.medicationDosage}>{item.dosage}</Text>
        <Text style={styles.medicationFrequency}>{item.frequency}</Text>
        
        <View style={styles.timeStockContainer}>
          <View style={styles.timeContainer}>
            {item.times.map((time, index) => (
              <Text key={index} style={styles.medicationTime}>
                {time}
              </Text>
            ))}
          </View>
          
          <View style={styles.stockContainer}>
            <MaterialIcons name="inventory" size={16} color="#718096" />
            <Text style={styles.stockText}>{item.stock} left</Text>
          </View>
        </View>
      </View>
      
      <MaterialIcons 
        name="keyboard-arrow-right" 
        size={24} 
        color="#718096" 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2b6cb0" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MediAlert</Text>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="person" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Medications</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddMedication}
          >
            <MaterialIcons name="add-circle" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={medications}
          renderItem={renderMedicationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.medicationList}
          showsVerticalScrollIndicator={false}
        />
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
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
    backgroundColor: '#f7fafc',
  },
  header: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  profileButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
  },
  addButton: {
    backgroundColor: '#2b6cb0',
    borderRadius: 20,
    padding: 8,
  },
  medicationList: {
    paddingBottom: 20,
  },
  medicationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medicationIconContainer: {
    backgroundColor: '#f0f9ff',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  medicationIcon: {
    transform: [{ rotate: '45deg' }],
  },
  medicationInfo: {
    flex: 1,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
  },
  medicationType: {
    fontSize: 14,
    color: '#718096',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  medicationDosage: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 4,
  },
  medicationFrequency: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  timeStockContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  medicationTime: {
    backgroundColor: '#ebf8ff',
    color: '#2b6cb0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#faf5ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  stockText: {
    color: '#805ad5',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
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
  },
  activeNavText: {
    color: '#2b6cb0',
    fontWeight: '600',
  },
});

export default MedicationsScreen;