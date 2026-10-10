import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const first = selectNextQuestion(instrument, [], null, difficulty, {});
    setCurrentQuestion(first);
  }, [instrument]);

  const handleSelectOption = async (optionIndex: number) => {
    if (!currentQuestion || loading) return;

    const correct = optionIndex === currentQuestion.correctIndex;
    const record: AnswerRecord = {
      questionId: currentQuestion.id,
      correct,
      competency: currentQuestion.competency,
      difficulty: currentQuestion.difficulty,
    };

    const newAnswered = [...answered, record];
    setAnswered(newAnswered);

    const newProgress = { ...competencyProgress };
    if (!newProgress[currentQuestion.competency]) {
      newProgress[currentQuestion.competency] = { correct: 0, total: 0 };
    }
    newProgress[currentQuestion.competency].total += 1;
    if (correct) newProgress[currentQuestion.competency].correct += 1;
    setCompetencyProgress(newProgress);

    const newDiff = correct ? Math.min(5, difficulty + 1) : Math.max(1, difficulty - 1);
    setDifficulty(newDiff);

    if (newAnswered.length >= 7) {
      await finish(newAnswered);
      return;
    }

    const next = selectNextQuestion(
      instrument,
      newAnswered.map(a => a.questionId),
      correct,
      newDiff,
      newProgress
    );

    if (!next) {
      await finish(newAnswered);
    } else {
      setCurrentQuestion(next);
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
    await AsyncStorage.setItem('diagnosisResult', JSON.stringify(payload));
    await AsyncStorage.setItem('onboardingComplete', 'true');

    setTimeout(() => {
      navigation.replace('DiagnosisResult', {
        instrument,
        level: result.level,
        scores: result.scores,
        strength: result.strength,
        weakness: result.weakness,
        generalIndex: result.generalIndex,
      });
    }, 1200);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.accentPurple} />
        <Text style={styles.loadingText}>Analisando suas competências...</Text>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DIAGNÓSTICO</Text>
        <Text style={styles.progress}>{answered.length + 1} / 7</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.competency}>{currentQuestion.competency} · Dif. {currentQuestion.difficulty}</Text>
        <Text style={styles.question}>{currentQuestion.text}</Text>
        <View style={styles.options}>
          {currentQuestion.options.map((opt, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.optionBtn}
              onPress={() => handleSelectOption(idx)}
              activeOpacity={0.8}
            >
              <Text style={styles.optionText}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingTop: 50 },
  header: { paddingHorizontal: 20, marginBottom: 16 },
  title: { color: '#fff', fontSize: 14, letterSpacing: 1, fontWeight: '600' },
  progress: { color: colors.textSecondary, marginTop: 4 },
  body: { flex: 1, padding: 20 },
  competency: { color: colors.accentBlue, fontSize: 13, marginBottom: 12, fontWeight: '600' },
  question: { color: '#fff', fontSize: 20, fontWeight: '600', lineHeight: 28, marginBottom: 28 },
  options: { gap: 12 },
  optionBtn: {
    backgroundColor: colors.bgCard,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionText: { color: '#fff', fontSize: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg },
  loadingText: { color: colors.textSecondary, marginTop: 16 },
});
