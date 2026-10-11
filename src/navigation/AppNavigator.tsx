import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Stack, RootStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import InstrumentSelectScreen from '../screens/InstrumentSelectScreen';
import ExperienceAssessmentScreen from '../screens/ExperienceAssessmentScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import DiagnosisResultScreen from '../screens/DiagnosisResultScreen';
import HomeScreen from '../screens/HomeScreen';
import DailyTrainingScreen from '../screens/DailyTrainingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme/colors';

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const complete = await AsyncStorage.getItem('onboardingComplete');
        const result = await AsyncStorage.getItem('diagnosisResult');
        if (complete === 'true' && result) {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Splash');
        }
      } catch {
        setInitialRoute('Splash');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || !initialRoute) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.accentPurple} />
        <Text style={styles.text}>Restaurando sua sessão...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="InstrumentSelect" component={InstrumentSelectScreen} />
        <Stack.Screen name="ExperienceAssessment" component={ExperienceAssessmentScreen} />
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
        <Stack.Screen name="DiagnosisResult" component={DiagnosisResultScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DailyTraining" component={DailyTrainingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' },
  text: { color: colors.textSecondary, marginTop: 16 },
});
