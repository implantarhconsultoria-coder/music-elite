import { createNativeStackNavigator } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  InstrumentSelect: undefined;
  ExperienceAssessment: { instrument: string };
  Diagnosis: { instrument: string; experience: string };
  DiagnosisResult: { instrument: string; level: string; scores: Record<string, number> };
  Home: undefined;
};

export const Stack = createNativeStackNavigator<RootStackParamList>();
