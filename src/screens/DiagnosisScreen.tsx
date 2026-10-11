import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
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

      // A dificuldade sobe/desce exatamente um nível por resposta.
      // O engine recebe lastCorrect=null para não aplicar o ajuste uma segunda vez.
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
      // Persistência não pode impedir o usuário de concluir o diagnóstico.
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
              key={`${currentQuestion.id}-${idx}`}
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
