import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'DiagnosisResult'>;

export default function DiagnosisResultScreen({ navigation, route }: Props) {
  const { instrument, level, scores, strength, weakness, generalIndex } = route.params;
  const [fade] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const sorted = Object.entries(scores || {}).sort((a, b) => b[1] - a[1]);
  const displayStrength = strength || sorted[0]?.[0] || '—';
  const displayWeakness = weakness || sorted[sorted.length - 1]?.[0] || '—';
  const index = generalIndex ?? Math.round(sorted.reduce((s, [, v]) => s + v, 0) / Math.max(1, sorted.length));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.body, { opacity: fade }]}>
        <Text style={styles.label}>Seu ponto de partida</Text>
        <Text style={styles.instrument}>{instrument.toUpperCase()}</Text>
        <Text style={styles.level}>{level}</Text>

        <View style={styles.indexBox}>
          <Text style={styles.indexLabel}>Índice Musical</Text>
          <Text style={styles.indexValue}>{index}%</Text>
        </View>

        <View style={styles.radarArea}>
          {sorted.map(([comp, val]) => (
            <View key={comp} style={styles.compRow}>
              <Text style={styles.compName}>{comp}</Text>
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${Math.min(100, val)}%` }]} />
              </View>
              <Text style={styles.compVal}>{Math.round(val)}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.insights}>
          <Text style={styles.insight}>Força: {displayStrength}</Text>
          <Text style={styles.insight}>Ponto de desenvolvimento: {displayWeakness}</Text>
        </View>

        <Text style={styles.message}>
          Você já tem uma boa base. Não vamos fazer você perder tempo com o que já sabe.
        </Text>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Home')}>
          <LinearGradient colors={colors.gradient} style={styles.btnInner}>
            <Text style={styles.btnText}>INICIAR MINHA TRILHA</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, padding: 24, paddingTop: 60 },
  label: { color: colors.textSecondary, fontSize: 13, textAlign: 'center' },
  instrument: { color: '#fff', fontSize: 32, fontWeight: '800', textAlign: 'center', marginTop: 4 },
  level: { color: colors.accentBlue, fontSize: 16, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  indexBox: { alignItems: 'center', marginVertical: 12 },
  indexLabel: { color: colors.textSecondary, fontSize: 12 },
  indexValue: { color: '#fff', fontSize: 48, fontWeight: '800' },
  radarArea: { backgroundColor: colors.bgCard, borderRadius: 16, padding: 16, marginVertical: 12 },
  compRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  compName: { color: '#fff', width: 90, fontSize: 13 },
  barBg: { flex: 1, height: 8, backgroundColor: colors.bgElevated, borderRadius: 4, marginHorizontal: 8 },
  barFill: { height: 8, backgroundColor: colors.accentPurple, borderRadius: 4 },
  compVal: { color: colors.textSecondary, width: 36, textAlign: 'right', fontSize: 12 },
  insights: { marginVertical: 12 },
  insight: { color: '#fff', fontSize: 14, marginBottom: 4 },
  message: { color: colors.textSecondary, textAlign: 'center', lineHeight: 22, marginVertical: 16, fontSize: 14 },
  btn: { borderRadius: 28, overflow: 'hidden', marginTop: 8 },
  btnInner: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
