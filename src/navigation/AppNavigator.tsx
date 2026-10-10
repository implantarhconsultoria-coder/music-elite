import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from './types';
import SplashScreen from '../screens/SplashScreen';
import InstrumentSelectScreen from '../screens/InstrumentSelectScreen';
import ExperienceAssessmentScreen from '../screens/ExperienceAssessmentScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import DiagnosisResultScreen from '../screens/DiagnosisResultScreen';
import HomeScreen from '../screens/HomeScreen';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#0B0C10' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="InstrumentSelect" component={InstrumentSelectScreen} />
        <Stack.Screen name="ExperienceAssessment" component={ExperienceAssessmentScreen} />
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
        <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
