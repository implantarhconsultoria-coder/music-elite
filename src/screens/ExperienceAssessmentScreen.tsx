import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'ExperienceAssessment'>;

const LEVELS = [
  { label: 'Nunca toquei', icon: '✦', hint: 'Começar do zero, sem pressa' },
  { label: 'Estou começando', icon: '◐', hint: 'Já tive contato, mas ainda travo' },
  { label: 'Já consigo tocar', icon: '◉', hint: 'Consigo executar músicas simples' },
  { label: 'Toco há algum tempo', icon: '◈', hint: 'Já tenho base e repertório' },
  { label: 'Pode me desafiar', icon: '⚡', hint: 'Quero um diagnóstico mais exigente' },
];

export default function ExperienceAssessmentScreen({ navigation, route }: Props) {
  const { instrument } = route.params;
  const [selected, setSelected] = useState<string | null>(null);

  const onContinue = () => {
    if (selected) navigation.navigate('Diagnosis', { instrument, experience: selected });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#091729', '#050A14']} style={StyleSheet.absoluteFill} />
      <View style={styles.glowPurple} />
      <View style={styles.glowBlue} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}><Text style={styles.back}>‹</Text></TouchableOpacity>
        <Text style={styles.title}>DIAGNÓSTICO INICIAL</Text>
        <Text style={styles.step}>2/5</Text>
      </View>

      <View style={styles.progressTrack}>
        <LinearGradient colors={colors.gradientCool} style={styles.progressFill} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>{instrument.toUpperCase()}</Text>
        <Text style={styles.question}>Como você se considera hoje?</Text>
        <Text style={styles.subtitle}>Isso só define por onde o teste começa. O diagnóstico real vai comprovar seu nível.</Text>

        <View style={styles.list}>
          {LEVELS.map((item) => {
            const active = selected === item.label;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.option, active && styles.optionSelected]}
                onPress={() => setSelected(item.label)}
                activeOpacity={0.88}
              >
                <View style={[styles.iconBox, active && styles.iconBoxActive]}>
                  <Text style={[styles.icon, active && styles.iconActive]}>{item.icon}</Text>
                </View>
                <View style={styles.optionCopy}>
                  <Text style={styles.optionText}>{item.label}</Text>
                  <Text style={styles.optionHint}>{item.hint}</Text>
                </View>
                <View style={[styles.radio, active && styles.radioActive]}>{active && <View style={styles.radioCore} />}</View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity style={[styles.btn, !selected && styles.btnDisabled]} onPress={onContinue} disabled={!selected} activeOpacity={0.88}>
          <LinearGradient colors={selected ? colors.gradient : ['#27344A', '#182132']} style={styles.btnInner}>
            <Text style={styles.btnText}>CONTINUAR</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  glowPurple: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(124,60,255,0.09)', top: 140, right: -130 },
  glowBlue: { position: 'absolute', width: 240, height: 240, borderRadius: 120, backgroundColor: 'rgba(22,217,255,0.07)', bottom: 30, left: -120 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 18, marginBottom: 14 },
  backBtn: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  back: { color: '#fff', fontSize: 30, lineHeight: 32, marginTop: -2 },
  title: { color: '#fff', fontSize: 12, letterSpacing: 1.15, fontWeight: '800' },
  step: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' },
  progressTrack: { height: 5, borderRadius: 3, backgroundColor: '#13243B', marginHorizontal: 20, overflow: 'hidden' },
  progressFill: { width: '40%', height: 5, borderRadius: 3 },
  body: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 34 },
  eyebrow: { color: colors.accentCyan, fontSize: 11, fontWeight: '900', letterSpacing: 1.4, marginBottom: 8 },
  question: { color: '#fff', fontSize: 27, lineHeight: 32, fontWeight: '900', marginBottom: 8 },
  subtitle: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, marginBottom: 22, maxWidth: 460 },
  list: { gap: 10 },
  option: { minHeight: 72, backgroundColor: 'rgba(12,25,43,0.9)', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center' },
  optionSelected: { borderColor: colors.accentBlue, backgroundColor: 'rgba(13,39,61,0.95)', shadowColor: colors.accentBlue, shadowOpacity: 0.22, shadowRadius: 14, elevation: 5 },
  iconBox: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, backgroundColor: '#0B1627' },
  iconBoxActive: { borderColor: 'rgba(22,217,255,0.55)', backgroundColor: 'rgba(22,217,255,0.12)' },
  icon: { color: '#8FA3BE', fontSize: 17, fontWeight: '900' },
  iconActive: { color: colors.accentCyan },
  optionCopy: { flex: 1, paddingHorizontal: 12 },
  optionText: { color: '#fff', fontSize: 15, fontWeight: '800', marginBottom: 3 },
  optionHint: { color: colors.textSecondary, fontSize: 11.5, lineHeight: 16 },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 1.5, borderColor: '#40546D', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: colors.accentBlue },
  radioCore: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accentBlue },
  btn: { marginTop: 24, borderRadius: 28, overflow: 'hidden', shadowColor: '#7C3CFF', shadowOpacity: 0.28, shadowRadius: 18, elevation: 7 },
  btnDisabled: { opacity: 0.45 },
  btnInner: { paddingVertical: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '900', fontSize: 14, letterSpacing: 0.8 },
});
