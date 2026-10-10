import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'ExperienceAssessment'>;

const LEVELS = ['Nunca toquei', 'Estou começando', 'Já consigo tocar', 'Toco há algum tempo', 'Pode me desafiar'];

export default function ExperienceAssessmentScreen({ navigation, route }: Props) {
  const { instrument } = route.params;
  const [selected, setSelected] = useState<string | null>(null);

  const onContinue = () => {
    if (selected) navigation.navigate('Diagnosis', { instrument, experience: selected });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>←</Text></TouchableOpacity>
        <Text style={styles.title}>AUTOAVALIAÇÃO</Text>
        <Text style={styles.step}>2/5</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.question}>Como você se considera em {instrument}?</Text>
        {LEVELS.map((level) => (
          <TouchableOpacity key={level} style={[styles.option, selected === level && styles.optionSelected]} onPress={() => setSelected(level)}>
            <Text style={styles.optionText}>{level}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.btn, !selected && { opacity: 0.5 }]} onPress={onContinue} disabled={!selected}>
          <LinearGradient colors={colors.gradient} style={styles.btnInner}>
            <Text style={styles.btnText}>CONTINUAR</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  back: { color: '#fff', fontSize: 28 },
  title: { color: '#fff', fontSize: 13, letterSpacing: 1 },
  step: { color: colors.textSecondary, fontSize: 13 },
  body: { padding: 20 },
  question: { color: '#fff', fontSize: 22, fontWeight: '600', marginBottom: 24 },
  option: { backgroundColor: colors.bgCard, borderRadius: 12, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  optionSelected: { borderColor: colors.accentBlue, backgroundColor: 'rgba(0,212,255,0.1)' },
  optionText: { color: '#fff', fontSize: 16 },
  btn: { marginTop: 24, borderRadius: 28, overflow: 'hidden' },
  btnInner: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
