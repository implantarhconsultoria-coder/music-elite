import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, 'Diagnosis'>;

const QUESTIONS = [
  { id: 'q1', competency: 'Acordes', text: 'Você reconhece e forma acordes maiores e menores básicos?', difficulty: 1 },
  { id: 'q2', competency: 'Ritmo', text: 'Consegue manter um ritmo estável em 4/4 com metrônomo?', difficulty: 1 },
  { id: 'q3', competency: 'Percepção', text: 'Identifica intervalos simples de ouvido?', difficulty: 2 },
  { id: 'q4', competency: 'Teoria', text: 'Entende campo harmônico da tonalidade de Dó?', difficulty: 2 },
  { id: 'q5', competency: 'Técnica', text: 'Troca de acordes com fluidez em andamento moderado?', difficulty: 3 },
];

export default function DiagnosisScreen({ navigation, route }: Props) {
  const { instrument, experience } = route.params;
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [difficultyOffset, setDifficultyOffset] = useState(0);

  useEffect(() => {
    if (experience.includes('Nunca') || experience.includes('começando')) setDifficultyOffset(-1);
    if (experience.includes('desafiar') || experience.includes('algum tempo')) setDifficultyOffset(1);
  }, [experience]);

  const handleAnswer = async (correct: boolean) => {
    const q = QUESTIONS[current];
    const newAnswers = { ...answers, [q.id]: correct };
    setAnswers(newAnswers);

    if (correct) setDifficultyOffset((d) => Math.min(d + 1, 2));
    else setDifficultyOffset((d) => Math.max(d - 1, -2));

    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setLoading(true);
      const scores: Record<string, number> = {};
      QUESTIONS.forEach((qq) => {
        scores[qq.competency] = newAnswers[qq.id] ? 80 + Math.random() * 20 : 40 + Math.random() * 30;
      });
      const avg = Object.values(scores).reduce((a, b) => a + b, 0) / QUESTIONS.length;
      const level = avg > 85 ? 'Avançado' : avg > 70 ? 'Intermediário II' : avg > 50 ? 'Intermediário' : 'Iniciante';

      await AsyncStorage.setItem('diagnosisResult', JSON.stringify({ instrument, level, scores, experience }));

      setTimeout(() => {
        navigation.replace('DiagnosisResult', { instrument, level, scores });
      }, 1200);
    }
  };

  const q = QUESTIONS[current];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DIAGNÓSTICO ADAPTATIVO</Text>
        <Text style={styles.progress}>{current + 1} / {QUESTIONS.length}</Text>
      </View>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accentPurple} />
          <Text style={styles.loadingText}>Calculando seu ponto de partida...</Text>
        </View>
      ) : (
        <View style={styles.body}>
          <Text style={styles.competency}>{q.competency}</Text>
          <Text style={styles.question}>{q.text}</Text>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.answerBtn} onPress={() => handleAnswer(true)}>
              <LinearGradient colors={['#00D4FF', '#6B46FF']} style={styles.answerInner}>
                <Text style={styles.answerText}>Sim / Consigo</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.answerBtn} onPress={() => handleAnswer(false)}>
              <View style={[styles.answerInner, { backgroundColor: colors.bgCard }]}>
                <Text style={styles.answerText}>Não / Ainda não</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 24 },
  title: { color: '#fff', fontSize: 14, letterSpacing: 1, fontWeight: '600' },
  progress: { color: colors.textSecondary, marginTop: 4 },
  body: { flex: 1, padding: 20, justifyContent: 'center' },
  competency: { color: colors.accentBlue, fontSize: 14, marginBottom: 12, fontWeight: '600' },
  question: { color: '#fff', fontSize: 22, fontWeight: '600', lineHeight: 30, marginBottom: 40 },
  actions: { gap: 16 },
  answerBtn: { borderRadius: 16, overflow: 'hidden' },
  answerInner: { paddingVertical: 18, alignItems: 'center' },
  answerText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: colors.textSecondary, marginTop: 16 },
});
