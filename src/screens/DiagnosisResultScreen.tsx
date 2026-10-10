import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'DiagnosisResult'>;

export default function DiagnosisResultScreen({ navigation, route }: Props) {
  const { instrument, level, scores } = route.params;
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const strength = sorted[0][0];
  const weakness = sorted[sorted.length - 1][0];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>RESULTADO DO DIAGNÓSTICO</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.label}>Seu ponto de partida</Text>
        <Text style={styles.instrument}>{instrument.toUpperCase()}</Text>
        <Text style={styles.level}>{level.toUpperCase()}</Text>
        <View style={styles.scores}>
          {Object.entries(scores).map(([comp, val]) => (
            <View key={comp} style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>{comp}</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${val}%` }]} />
              </View>
              <Text style={styles.scoreVal}>{Math.round(val)}%</Text>
            </View>
          ))}
        </View>
        <Text style={styles.feedback}>Força: {strength}. Deficiência principal: {weakness}. Vamos começar a partir daqui para não perder tempo.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Home')}>
          <LinearGradient colors={colors.gradient} style={styles.btnInner}>
            <Text style={styles.btnText}>INICIAR MINHA TRILHA</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 16 },
  title: { color: '#fff', fontSize: 14, letterSpacing: 1, fontWeight: '600' },
  body: { padding: 20, alignItems: 'center' },
  label: { color: colors.textSecondary, fontSize: 14 },
  instrument: { color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 4 },
  level: { color: colors.accentBlue, fontSize: 18, fontWeight: '600', marginBottom: 24 },
  scores: { width: '100%', marginVertical: 16 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  scoreLabel: { color: '#fff', width: 110, fontSize: 13 },
  barBg: { flex: 1, height: 8, backgroundColor: colors.bgElevated, borderRadius: 4, marginHorizontal: 8 },
  barFill: { height: 8, backgroundColor: colors.accentPurple, borderRadius: 4 },
  scoreVal: { color: colors.textSecondary, width: 40, textAlign: 'right', fontSize: 13 },
  feedback: { color: colors.textSecondary, textAlign: 'center', lineHeight: 22, marginVertical: 24 },
  btn: { width: '100%', borderRadius: 28, overflow: 'hidden', marginTop: 8 },
  btnInner: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
