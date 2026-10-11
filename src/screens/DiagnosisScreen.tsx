import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectNextQuestion, calculateResult, getStartingDifficulty, Question } from '../utils/diagnosisEngine';

type Props = NativeStackScreenProps<RootStackParamList, 'Diagnosis'>;

interface AnswerRecord {
  questionId: string;
  correct: boolean;
  competency: string;
  difficulty: number;
}

export default function DiagnosisScreen({ navigation, route }: Props) {
  const { instrument, experience } = route.params;
  const [answered, setAnswered] = useState<AnswerRecord[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(() => getStartingDifficulty(experience));
  const [competencyProgress, setCompetencyProgress] = useState<Record<string, { correct: number; total: number }>>({});
  const initialized = useRef(false);
  const answerLock = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const first = selectNextQuestion(instrument, [], null, difficulty, {});
    setCurrentQuestion(first);
  }, [difficulty, instrument]);

  const handleSelectOption = async (optionIndex: number) => {
    if (!currentQuestion || loading || answerLock.current) return;
    answerLock.current = true;

    try {
      const correct = optionIndex === currentQuestion.correctIndex;
      const record: AnswerRecord = {
        questionId: currentQuestion.id,
        correct,
        competency: currentQuestion.competency,
        difficulty: currentQuestion.difficulty,
      };

      const newAnswered = [...answered, record];
      setAnswered(newAnswered);

      const currentCompetency = competencyProgress[currentQuestion.competency] ?? { correct: 0, total: 0 };
      const newProgress = {
        ...competencyProgress,
        [currentQuestion.competency]: {
          correct: currentCompetency.correct + (correct ? 1 : 0),
          total: currentCompetency.total + 1,
        },
      };
      setCompetencyProgress(newProgress);

      const nextDifficulty = correct ? Math.min(5, difficulty + 1) : Math.max(1, difficulty - 1);
      setDifficulty(nextDifficulty);

      if (newAnswered.length >= 7) {
        await finish(newAnswered);
        return;
      }

      const next = selectNextQuestion(
        instrument,
        newAnswered.map(a => a.questionId),
        null,
        nextDifficulty,
        newProgress
      );

      if (!next) {
        await finish(newAnswered);
        return;
      }

      setCurrentQuestion(next);
      answerLock.current = false;
    } catch (error) {
      console.warn('Falha ao processar resposta do diagnóstico:', error);
      answerLock.current = false;
    }
  };

  const finish = async (finalAnswers: AnswerRecord[]) => {
    setLoading(true);
    const result = calculateResult(finalAnswers);
    const payload = {
      instrument,
      experience,
      ...result,
      answeredCount: finalAnswers.length,
      completedAt: new Date().toISOString(),
    };

    try {
      await AsyncStorage.multiSet([
        ['diagnosisResult', JSON.stringify(payload)],
        ['onboardingComplete', 'true'],
      ]);
    } catch (error) {
      console.warn('Falha ao persistir diagnóstico localmente:', error);
    }

    navigation.replace('DiagnosisResult', {
      instrument,
      level: result.level,
      scores: result.scores,
      strength: result.strength,
      weakness: result.weakness,
      generalIndex: result.generalIndex,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <LinearGradient colors={['#06111F', '#0D1A2E']} style={StyleSheet.absoluteFill} />
        <View style={styles.loadingOrb}>
          <ActivityIndicator size="large" color={colors.accentCyan} />
        </View>
        <Text style={styles.loadingTitle}>ANALISANDO SEU PERFIL</Text>
        <Text style={styles.loadingText}>Transformando suas respostas em um ponto de partida personalizado.</Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Preparando diagnóstico...</Text>
      </View>
    );
  }

  const currentNumber = answered.length + 1;
  const progress = `${Math.min(100, (answered.length / 7) * 100)}%` as `${number}%`;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#08182A', '#050A14']} style={StyleSheet.absoluteFill} />
      <View style={styles.glowBlue} />
      <View style={styles.glowPurple} />

      <View style={styles.header}>
        <View>
          <Text style={styles.title}>DIAGNÓSTICO INICIAL</Text>
          <Text style={styles.instrument}>{instrument} · teste adaptativo</Text>
        </View>
        <View style={styles.counter}><Text style={styles.counterText}>{currentNumber}/7</Text></View>
      </View>

      <View style={styles.progressTrack}>
        <LinearGradient colors={colors.gradientCool} style={[styles.progressFill, { width: progress }]} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.metaRow}>
          <View style={styles.metaPill}><Text style={styles.metaText}>{currentQuestion.competency.toUpperCase()}</Text></View>
          <Text style={styles.diff}>DIFICULDADE {currentQuestion.difficulty}/5</Text>
        </View>

        <Text style={styles.question}>{currentQuestion.text}</Text>
        <Text style={styles.helper}>Escolha a resposta que melhor representa seu conhecimento agora.</Text>

        <View style={styles.options}>
          {currentQuestion.options.map((opt, idx) => (
            <TouchableOpacity
              key={`${currentQuestion.id}-${idx}`}
              style={styles.optionBtn}
              onPress={() => handleSelectOption(idx)}
              activeOpacity={0.86}
            >
              <View style={styles.optionIndex}><Text style={styles.optionIndexText}>{String.fromCharCode(65 + idx)}</Text></View>
              <Text style={styles.optionText}>{opt}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.adaptiveCard}>
          <Text style={styles.adaptiveIcon}>✦</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.adaptiveTitle}>O teste está se adaptando a você</Text>
            <Text style={styles.adaptiveCopy}>Acertos sobem o nível. Erros reduzem a dificuldade para encontrar sua faixa real.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 52 },
  glowBlue: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(22,217,255,0.07)', top: 120, right: -140 },
  glowPurple: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(124,60,255,0.08)', bottom: 20, left: -130 },
  header: { paddingHorizontal: 20, marginBottom: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { color: '#fff', fontSize: 13, letterSpacing: 1.15, fontWeight: '900' },
  instrument: { color: colors.textSecondary, marginTop: 4, fontSize: 12 },
  counter: { minWidth: 46, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: 'rgba(15,35,57,0.92)' },
  counterText: { color: colors.accentCyan, fontWeight: '900', fontSize: 12 },
  progressTrack: { height: 5, borderRadius: 3, backgroundColor: '#13243B', marginHorizontal: 20, overflow: 'hidden' },
  progressFill: { height: 5, borderRadius: 3 },
  body: { paddingHorizontal: 20, paddingTop: 26, paddingBottom: 34 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  metaPill: { borderRadius: 999, backgroundColor: 'rgba(22,217,255,0.1)', borderWidth: 1, borderColor: 'rgba(22,217,255,0.3)', paddingHorizontal: 11, paddingVertical: 7 },
  metaText: { color: colors.accentCyan, fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  diff: { color: '#7590AE', fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  question: { color: '#fff', fontSize: 27, fontWeight: '900', lineHeight: 34, marginBottom: 9, maxWidth: 520 },
  helper: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginBottom: 24 },
  options: { gap: 11 },
  optionBtn: { minHeight: 66, backgroundColor: 'rgba(11,22,39,0.94)', borderRadius: 16, paddingHorizontal: 13, paddingVertical: 11, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center' },
  optionIndex: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: '#101F33', borderWidth: 1, borderColor: 'rgba(117,162,211,0.2)' },
  optionIndexText: { color: colors.accentBlue, fontWeight: '900', fontSize: 13 },
  optionText: { color: '#F6FAFF', fontSize: 14.5, lineHeight: 20, fontWeight: '700', flex: 1, paddingHorizontal: 12 },
  chevron: { color: '#68809F', fontSize: 26, marginTop: -2 },
  adaptiveCard: { marginTop: 22, borderRadius: 16, borderWidth: 1, borderColor: colors.border, backgroundColor: 'rgba(12,25,43,0.8)', padding: 14, flexDirection: 'row', gap: 12 },
  adaptiveIcon: { color: colors.accentPurple, fontSize: 22 },
  adaptiveTitle: { color: '#fff', fontSize: 13, fontWeight: '900', marginBottom: 4 },
  adaptiveCopy: { color: colors.textSecondary, fontSize: 11.5, lineHeight: 17 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg, paddingHorizontal: 34 },
  loadingOrb: { width: 82, height: 82, borderRadius: 41, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B1828', borderWidth: 1, borderColor: colors.borderStrong, marginBottom: 20 },
  loadingTitle: { color: '#fff', fontSize: 13, fontWeight: '900', letterSpacing: 1.2, marginBottom: 8 },
  loadingText: { color: colors.textSecondary, textAlign: 'center', fontSize: 13, lineHeight: 19, maxWidth: 360 },
});
