// screens/MedicationDetailsScreen.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MedicationDetailsScreen = ({ route, navigation }) => {
  const { medication } = route.params;

  const handleEdit = () => {
    navigation.navigate('EditMedication', { medication });
  };

  const handleLogDose = () => {
    Alert.alert(
      'Dose Logged',
      `${medication.name} dose has been logged successfully!`,
      [{ text: 'OK' }]
    );
  };

  const handleStockUpdate = (amount) => {
    Alert.alert(
      'Stock Updated',
      `Inventory updated by ${amount} ${medication.type.toLowerCase()}${amount !== 1 ? 's' : ''}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2b6cb0" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medication Details</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>
      
      {/* Medication Info Card */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.medicationHeader}>
            <View style={[styles.medicationIconContainer, { backgroundColor: `${medication.color}20` }]}>
              <MaterialIcons 
                name={medication.icon} 
                size={32} 
                color={medication.color}
                style={styles.medicationIcon}
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.medicationName}>{medication.name}</Text>
              <Text style={styles.medicationType}>{medication.type}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          {/* Details Section */}
          <View style={styles.detailSection}>
            <DetailItem 
              icon="description" 
              title="Dosage" 
              value={medication.dosage} 
              color="#4ECDC4" 
            />
            <DetailItem 
              icon="repeat" 
              title="Frequency" 
              value={medication.frequency} 
              color="#FFD166" 
            />
            <DetailItem 
              icon="schedule" 
              title="Reminder Times" 
              value={medication.times.join(', ')} 
              color="#6A0572" 
            />
            <DetailItem 
              icon="inventory" 
              title="Current Stock" 
              value={`${medication.stock} ${medication.type.toLowerCase()}${medication.stock !== 1 ? 's' : ''}`} 
              color="#2b6cb0" 
            />
          </View>
          
          {/* Stock Management */}
          <View style={styles.stockManagement}>
            <Text style={styles.sectionTitle}>Update Stock</Text>
            <View style={styles.stockButtons}>
              <TouchableOpacity 
                style={[styles.stockButton, { backgroundColor: '#e53e3e' }]}
                onPress={() => handleStockUpdate(-1)}
              >
                <MaterialIcons name="remove" size={24} color="white" />
                <Text style={styles.stockButtonText}>Used 1</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.stockButton, { backgroundColor: '#38a169' }]}
                onPress={() => handleStockUpdate(5)}
              >
                <MaterialIcons name="add" size={24} color="white" />
                <Text style={styles.stockButtonText}>Add 5</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.editButton]}
              onPress={handleEdit}
            >
              <Text style={styles.actionButtonText}>Edit Medication</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.logButton]}
              onPress={handleLogDose}
            >
              <Text style={styles.actionButtonText}>Log Dose Taken</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Instructions Section */}
        <View style={styles.instructionsCard}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructionsText}>
            Take with a full glass of water. Avoid lying down for at least 30 minutes after taking. 
            May cause drowsiness - use caution when driving or operating machinery.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ icon, title, value, color }) => (
  <View style={styles.detailItem}>
    <View style={[styles.detailIcon, { backgroundColor: `${color}20` }]}>
      <MaterialIcons name={icon} size={20} color={color} />
    </View>
    <View style={styles.detailTextContainer}>
      <Text style={styles.detailTitle}>{title}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  header: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  medicationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  medicationIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  medicationIcon: {
    transform: [{ rotate: '45deg' }],
  },
  titleContainer: {
    flex: 1,
  },
  medicationName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 4,
  },
  medicationType: {
    fontSize: 16,
    color: '#718096',
    backgroundColor: '#edf2f7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 10,
  },
  detailSection: {
    marginVertical: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a202c',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 15,
  },
  stockManagement: {
    marginVertical: 20,
  },
  stockButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  stockButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: '#3182ce',
  },
  logButton: {
    backgroundColor: '#38a169',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  instructionsText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
  },
});

export default MedicationDetailsScreen;