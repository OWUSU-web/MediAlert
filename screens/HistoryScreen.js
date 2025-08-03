// screens/HistoryScreen.js
import React, { useState } from 'react';
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

const HistoryScreen = ({ navigation }) => {
  // Sample history data with state for editable items
  const [historyData, setHistoryData] = useState([
    {
      date: 'January 8',
      entries: [
        {
          id: '1',
          time: '8:00 AM',
          status: 'Taken',
          medication: 'Lisinopril',
          dosage: '10 mg',
          color: '#48BB78',
          editable: false
        },
        {
          id: '2',
          time: '3:00 PM',
          status: 'Missed',
          medication: 'Lisinopril',
          dosage: '10 mg',
          color: '#F56565',
          editable: false
        }
      ]
    },
    {
      date: 'January 7',
      entries: [
        {
          id: '3',
          time: '8:00 AM',
          status: 'Taken',
          medication: 'Aspirin',
          dosage: '81 mg',
          color: '#48BB78',
          editable: false
        },
        {
          id: '4',
          time: '8:00 PM',
          status: 'Taken',
          medication: 'Atorvastatin',
          dosage: '20 mg',
          color: '#48BB78',
          editable: false
        }
      ]
    }
  ]);

  // Function to toggle edit mode for an entry
  const toggleEdit = (sectionIndex, entryId) => {
    const updatedData = [...historyData];
    const section = updatedData[sectionIndex];
    const entryIndex = section.entries.findIndex(entry => entry.id === entryId);
    
    // Toggle the editable state
    section.entries[entryIndex].editable = !section.entries[entryIndex].editable;
    
    setHistoryData(updatedData);
  };

  // Function to delete an entry
  const deleteEntry = (sectionIndex, entryId) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this history entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedData = [...historyData];
            const section = updatedData[sectionIndex];
            
            // Remove the entry
            section.entries = section.entries.filter(entry => entry.id !== entryId);
            
            // Remove the section if it becomes empty
            if (section.entries.length === 0) {
              updatedData.splice(sectionIndex, 1);
            }
            
            setHistoryData(updatedData);
          }
        }
      ]
    );
  };

  // Function to edit an entry
  const editEntry = (sectionIndex, entryId, newStatus) => {
    const updatedData = [...historyData];
    const section = updatedData[sectionIndex];
    const entryIndex = section.entries.findIndex(entry => entry.id === entryId);
    
    // Update the status
    section.entries[entryIndex].status = newStatus;
    section.entries[entryIndex].color = newStatus === 'Taken' ? '#48BB78' : '#F56565';
    
    // Exit edit mode
    section.entries[entryIndex].editable = false;
    
    setHistoryData(updatedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2b6cb0" />
      
      {/* Time Display - Top Right */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>9:41</Text>
      </View>
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {historyData.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.dateHeader}>{section.date}</Text>
            
            {section.entries.map((entry) => (
              <View key={entry.id} style={styles.historyCard}>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeText}>{entry.time}</Text>
                </View>
                
                <View style={styles.statusContainer}>
                  {entry.editable ? (
                    <View style={styles.editStatusContainer}>
                      <TouchableOpacity 
                        style={[styles.statusButton, styles.takenButton]}
                        onPress={() => editEntry(sectionIndex, entry.id, 'Taken')}
                      >
                        <Text style={styles.statusButtonText}>Taken</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.statusButton, styles.missedButton]}
                        onPress={() => editEntry(sectionIndex, entry.id, 'Missed')}
                      >
                        <Text style={styles.statusButtonText}>Missed</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={[styles.statusText, { color: entry.color }]}>
                      {entry.status}
                    </Text>
                  )}
                </View>
                
                <View style={styles.medicationInfo}>
                  <Text style={styles.medicationName}>{entry.medication}</Text>
                  <Text style={styles.dosageText}>{entry.dosage}</Text>
                </View>
                
                <View style={styles.actionButtons}>
                  {entry.editable ? (
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => toggleEdit(sectionIndex, entry.id)}
                    >
                      <MaterialIcons name="close" size={20} color="#718096" />
                    </TouchableOpacity>
                  ) : (
                    <>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => toggleEdit(sectionIndex, entry.id)}
                      >
                        <MaterialIcons name="edit" size={20} color="#4299E1" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => deleteEntry(sectionIndex, entry.id)}
                      >
                        <MaterialIcons name="delete" size={20} color="#F56565" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
        
        {/* Empty state */}
        {historyData.length === 0 && (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="history" size={60} color="#CBD5E0" />
            <Text style={styles.emptyText}>No history available</Text>
            <Text style={styles.emptySubtext}>Your medication history will appear here</Text>
          </View>
        )}
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
          style={[styles.navItem, styles.activeNavItem]}
        >
          <MaterialIcons 
            name="history" 
            size={24} 
            style={[styles.navIcon, styles.activeNavIcon]} 
          />
          <Text style={[styles.navText, styles.activeNavText]}>History</Text>
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
    backgroundColor: '#2b6cb0',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 25,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 15,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 5,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  timeContainer: {
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5568',
  },
  statusContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    paddingRight: 10,
    marginRight: 10,
    minHeight: 40,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
  },
  editStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statusButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  takenButton: {
    backgroundColor: '#48BB78',
  },
  missedButton: {
    backgroundColor: '#F56565',
  },
  statusButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  medicationInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 4,
  },
  dosageText: {
    fontSize: 16,
    color: '#718096',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 50,
  },
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a202c',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
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
    color: '#2b6cb0',
  },
  navText: {
    fontSize: 12,
    color: '#a0aec0',
    fontWeight: '500',
  },
  activeNavText: {
    color: '#2b6cb0',
    fontWeight: '600',
  },
});

export default HistoryScreen;