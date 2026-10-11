import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'DiagnosisResult'>;

export default function DiagnosisResultScreen({ navigation, route }: Props) {
  const { instrument, level, scores, strength, weakness, generalIndex } = route.params;
  const [fade] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fade, { toValue: 1, duration: 520, useNativeDriver: true }).start();
  }, [fade]);

  const sorted = useMemo(() => Object.entries(scores || {}).sort((a, b) => b[1] - a[1]), [scores]);
  const displayStrength = strength || sorted[0]?.[0] || '—';
  const displayWeakness = weakness || sorted[sorted.length - 1]?.[0] || '—';
  const index = generalIndex ?? Math.round(sorted.reduce((s, [, v]) => s + v, 0) / Math.max(1, sorted.length));

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#0B192B', '#050A14']} style={StyleSheet.absoluteFill} />
      <View style={styles.glowBlue} />
      <View style={styles.glowOrange} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.body, { opacity: fade }]}>
          <Text style={styles.kicker}>RESULTADO DO DIAGNÓSTICO</Text>
          <Text style={styles.label}>Seu ponto de partida</Text>
          <Text style={styles.instrument}>{instrument.toUpperCase()}</Text>
          <Text style={styles.level}>{level.toUpperCase()}</Text>

          <View style={styles.scoreStage}>
            <View style={styles.orbitOuter} />
            <View style={styles.orbitMid} />
            <LinearGradient colors={colors.gradientCool} style={styles.scoreCircle}>
              <View style={styles.scoreInner}>
                <Text style={styles.scoreValue}>{index}%</Text>
                <Text style={styles.scoreLabel}>ÍNDICE MUSICAL</Text>
              </View>
            </LinearGradient>
          </View>

          <View style={styles.metricsCard}>
            {sorted.map(([comp, val]) => (
              <View key={comp} style={styles.metricRow}>
                <View style={styles.metricTop}>
                  <Text style={styles.metricName}>{comp}</Text>
                  <Text style={styles.metricValue}>{Math.round(val)}%</Text>
                </View>
                <View style={styles.track}>
                  <LinearGradient
                    colors={val >= 75 ? [colors.accentCyan, colors.success] : val >= 55 ? [colors.accentBlue, colors.accentPurple] : [colors.accentPurple, colors.accentOrange]}
                    style={[styles.fill, { width: `${Math.max(6, Math.min(100, val))}%` }]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.insightRow}>
            <View style={[styles.insightCard, styles.insightGood]}>
              <Text style={styles.insightIcon}>↑</Text>
              <Text style={styles.insightLabel}>PONTO FORTE</Text>
              <Text style={styles.insightValue}>{displayStrength}</Text>
            </View>
            <View style={[styles.insightCard, styles.insightFocus]}>
              <Text style={styles.insightIcon}>◎</Text>
              <Text style={styles.insightLabel}>FOCO AGORA</Text>
              <Text style={styles.insightValue}>{displayWeakness}</Text>
            </View>
          </View>

          <View style={styles.messageCard}>
            <Text style={styles.messageTitle}>Você já tem uma base.</Text>
            <Text style={styles.message}>Não vamos fazer você perder tempo com o que já sabe. Sua trilha começa exatamente daqui.</Text>
          </View>

          <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('Home')} activeOpacity={0.88}>
            <LinearGradient colors={colors.gradient} style={styles.btnInner}>
              <Text style={styles.btnText}>INICIAR MINHA TRILHA</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  glowBlue: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(22,217,255,0.08)', top: 120, left: -140 },
  glowOrange: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(255,122,61,0.07)', bottom: 90, right: -130 },
  scroll: { paddingBottom: 36 },
  body: { paddingHorizontal: 20, paddingTop: 58, width: '100%', maxWidth: 560, alignSelf: 'center' },
  kicker: { color: '#7F96B1', fontSize: 10, fontWeight: '900', letterSpacing: 1.4, textAlign: 'center', marginBottom: 16 },
  label: { color: '#B7C7DA', fontSize: 13, textAlign: 'center', marginBottom: 5 },
  instrument: { color: '#fff', fontSize: 32, fontWeight: '900', textAlign: 'center', letterSpacing: -0.7 },
  level: { color: colors.accentCyan, fontSize: 12, fontWeight: '900', textAlign: 'center', letterSpacing: 1.3, marginTop: 4 },
  scoreStage: { height: 205, alignItems: 'center', justifyContent: 'center', marginVertical: 12 },
  orbitOuter: { position: 'absolute', width: 190, height: 190, borderRadius: 95, borderWidth: 1, borderColor: 'rgba(22,217,255,0.11)' },
  orbitMid: { position: 'absolute', width: 158, height: 158, borderRadius: 79, borderWidth: 1, borderColor: 'rgba(124,60,255,0.18)' },
  scoreCircle: { width: 132, height: 132, borderRadius: 66, alignItems: 'center', justifyContent: 'center', shadowColor: colors.accentBlue, shadowOpacity: 0.34, shadowRadius: 24, elevation: 8 },
  scoreInner: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#071322', alignItems: 'center', justifyContent: 'center' },
  scoreValue: { color: '#fff', fontSize: 40, fontWeight: '900', letterSpacing: -1 },
  scoreLabel: { color: '#89A0BB', fontSize: 9, fontWeight: '900', letterSpacing: 1.2, marginTop: 2 },
  metricsCard: { backgroundColor: 'rgba(10,23,40,0.94)', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: colors.border, gap: 12 },
  metricRow: { gap: 6 },
  metricTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metricName: { color: '#F2F7FC', fontSize: 12.5, fontWeight: '800' },
  metricValue: { color: colors.accentCyan, fontSize: 12, fontWeight: '900' },
  track: { height: 7, backgroundColor: '#13243B', borderRadius: 99, overflow: 'hidden' },
  fill: { height: 7, borderRadius: 99 },
  insightRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  insightCard: { flex: 1, minHeight: 104, borderRadius: 16, padding: 14, borderWidth: 1, backgroundColor: 'rgba(10,23,40,0.9)' },
  insightGood: { borderColor: 'rgba(34,230,177,0.3)' },
  insightFocus: { borderColor: 'rgba(255,122,61,0.28)' },
  insightIcon: { color: colors.accentCyan, fontSize: 20, fontWeight: '900', marginBottom: 8 },
  insightLabel: { color: '#7890AA', fontSize: 9, fontWeight: '900', letterSpacing: 1.1, marginBottom: 5 },
  insightValue: { color: '#fff', fontSize: 14, fontWeight: '900' },
  messageCard: { marginTop: 12, borderRadius: 16, padding: 16, backgroundColor: 'rgba(15,28,47,0.88)', borderWidth: 1, borderColor: colors.border },
  messageTitle: { color: '#fff', fontSize: 15, fontWeight: '900', marginBottom: 5 },
  message: { color: colors.textSecondary, lineHeight: 19, fontSize: 12.5 },
  btn: { borderRadius: 28, overflow: 'hidden', marginTop: 16, shadowColor: '#7C3CFF', shadowOpacity: 0.35, shadowRadius: 18, elevation: 8 },
  btnInner: { paddingVertical: 17, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 0.8 },
});
