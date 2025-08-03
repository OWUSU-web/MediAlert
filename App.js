// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import MedicationsScreen from './screens/MedicationsScreen';
import MedicationDetailsScreen from './screens/MedicationDetailsScreen';
import AddMedicationScreen from './screens/AddMedicationScreen';
import RemindersScreen from './screens/RemindersScreen';
import HistoryScreen from './screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2b6cb0',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShadowVisible: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Medications" 
            component={MedicationsScreen} 
            options={{ 
              headerShown: false,
              gestureEnabled: false,
            }} 
          />
          <Stack.Screen 
            name="MedicationDetails" 
            component={MedicationDetailsScreen} 
            options={{ 
              headerShown: false,
              gestureEnabled: true,
            }} 
          />
          <Stack.Screen 
            name="AddMedication" 
            component={AddMedicationScreen} 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="Reminders" 
            component={RemindersScreen} 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{ 
              headerShown: false,
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}