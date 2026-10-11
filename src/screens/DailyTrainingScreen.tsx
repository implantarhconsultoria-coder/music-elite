import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  AppState,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors } from '../theme/colors';
import {
  ActiveSession,
  DiagnosisData,
  STORAGE_ACTIVE,
  STORAGE_STATS,
  TrainingStats,
  TrainingStep,
  buildSession,
  formatTime,
  todayKey,
  totalDurationSec,
} from '../utils/trainingSession';

type Props = NativeStackScreenProps<RootStackParamList, 'DailyTraining'>;

type Phase = 'session' | 'summary';

const DEFAULT_STATS: TrainingStats = {
  lastTrainingDate: null,
  completedSessions: 0,
  totalMinutes: 0,
  streak: 0,
  todayCompleted: false,
};

export default function DailyTrainingScreen({ navigation }: Props) {
  const [steps, setSteps] = useState<TrainingStep[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsedInStep, setElapsedInStep] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('session');
  const [loading, setLoading] = useState(true);
  const [diagnosis, setDiagnosis] = useState<DiagnosisData>({});
  const [stats, setStats] = useState<TrainingStats>(DEFAULT_STATS);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const runningRef = useRef(false);
  const stepIndexRef = useRef(0);
  const elapsedRef = useRef(0);
  const totalRef = useRef(0);
  const stepsRef = useRef<TrainingStep[]>([]);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);
  useEffect(() => {
    stepIndexRef.current = stepIndex;
  }, [stepIndex]);
  useEffect(() => {
    elapsedRef.current = elapsedInStep;
  }, [elapsedInStep]);
  useEffect(() => {
    totalRef.current = totalElapsed;
  }, [totalElapsed]);
  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  const persistActive = useCallback(async () => {
    if (phase !== 'session' || stepsRef.current.length === 0) return;
    const payload: ActiveSession = {
      steps: stepsRef.current,
      currentStepIndex: stepIndexRef.current,
      elapsedInStep: elapsedRef.current,
      totalElapsed: totalRef.current,
      startedAt: new Date().toISOString(),
      instrument: diagnosis.instrument || 'Violão',
      weakness: diagnosis.weakness || 'Ritmo',
      strength: diagnosis.strength || 'Acordes',
    };
    try {
      await AsyncStorage.setItem(STORAGE_ACTIVE, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [phase, diagnosis]);

  const clearActive = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_ACTIVE);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [rawDiag, rawActive, rawStats] = await Promise.all([
          AsyncStorage.getItem('diagnosisResult'),
          AsyncStorage.getItem(STORAGE_ACTIVE),
          AsyncStorage.getItem(STORAGE_STATS),
        ]);
        const diag: DiagnosisData = rawDiag ? JSON.parse(rawDiag) : {};
        setDiagnosis(diag);

        let parsedStats: TrainingStats = DEFAULT_STATS;
        if (rawStats) {
          parsedStats = { ...DEFAULT_STATS, ...JSON.parse(rawStats) };
          if (parsedStats.lastTrainingDate !== todayKey()) {
            parsedStats = { ...parsedStats, todayCompleted: false };
          }
        }
        setStats(parsedStats);

        if (rawActive) {
          const active: ActiveSession = JSON.parse(rawActive);
          setSteps(active.steps);
          setStepIndex(active.currentStepIndex);
          setElapsedInStep(active.elapsedInStep);
          setTotalElapsed(active.totalElapsed);
        } else {
          setSteps(buildSession(diag));
        }
      } catch {
        setSteps(buildSession({}));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const completeSession = useCallback(async () => {
    stopTimer();
    setRunning(false);
    setPhase('summary');

    const minutes = Math.max(1, Math.round(totalRef.current / 60));
    const today = todayKey();
    let newStreak = stats.streak;
    if (stats.lastTrainingDate === today) {
      // already counted
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
      if (stats.lastTrainingDate === yKey) {
        newStreak = (stats.streak || 0) + 1;
      } else {
        newStreak = 1;
      }
    }

    const next: TrainingStats = {
      lastTrainingDate: today,
      completedSessions: (stats.completedSessions || 0) + (stats.todayCompleted ? 0 : 1),
      totalMinutes: (stats.totalMinutes || 0) + minutes,
      streak: newStreak,
      todayCompleted: true,
    };
    setStats(next);
    try {
      await AsyncStorage.setItem(STORAGE_STATS, JSON.stringify(next));
      await clearActive();
    } catch {
      // ignore
    }
  }, [stats, stopTimer, clearActive]);

  const advanceStep = useCallback(() => {
    const nextIdx = stepIndexRef.current + 1;
    if (nextIdx >= stepsRef.current.length) {
      completeSession();
      return;
    }
    setStepIndex(nextIdx);
    setElapsedInStep(0);
    elapsedRef.current = 0;
    stepIndexRef.current = nextIdx;
  }, [completeSession]);

  const tick = useCallback(() => {
    if (!runningRef.current) return;
    const current = stepsRef.current[stepIndexRef.current];
    if (!current) return;

    const nextElapsed = elapsedRef.current + 1;
    const nextTotal = totalRef.current + 1;
    elapsedRef.current = nextElapsed;
    totalRef.current = nextTotal;
    setElapsedInStep(nextElapsed);
    setTotalElapsed(nextTotal);

    if (nextElapsed >= current.durationSec) {
      advanceStep();
    }
  }, [advanceStep]);

  useEffect(() => {
    if (running && phase === 'session') {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [running, phase, tick, stopTimer]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'background' || state === 'inactive') {
        persistActive();
      }
    });
    return () => sub.remove();
  }, [persistActive]);

  useEffect(() => {
    if (phase === 'session' && steps.length > 0 && !loading) {
      const id = setTimeout(() => persistActive(), 400);
      return () => clearTimeout(id);
    }
  }, [stepIndex, elapsedInStep, phase, steps.length, loading, persistActive]);

  const current = steps[stepIndex];
  const totalSec = useMemo(() => totalDurationSec(steps), [steps]);
  const progress = totalSec > 0 ? Math.min(1, totalElapsed / totalSec) : 0;
  const stepProgress =
    current && current.durationSec > 0
      ? Math.min(1, elapsedInStep / current.durationSec)
      : 0;
  const remainingStep = current ? Math.max(0, current.durationSec - elapsedInStep) : 0;
  const remainingTotal = Math.max(0, totalSec - totalElapsed);

  if (loading) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#06111F', '#071525', '#040914']} style={StyleSheet.absoluteFill} />
        <Text style={styles.loadingText}>Preparando seu treino...</Text>
      </View>
    );
  }

  if (phase === 'summary') {
    const minutes = Math.max(1, Math.round(totalElapsed / 60));
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#06111F', '#0B192B', '#050A14']} style={StyleSheet.absoluteFill} />
        <View style={styles.glowCyan} />
        <ScrollView contentContainerStyle={styles.summaryScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.kicker}>TREINO CONCLUÍDO</Text>
          <Text style={styles.summaryTitle}>Sessão registrada</Text>
          <Text style={styles.summarySub}>
            Você praticou com foco em {diagnosis.weakness || 'técnica'} no {diagnosis.instrument || 'instrumento'}.
          </Text>

          <View style={styles.summaryGrid}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{minutes}</Text>
              <Text style={styles.summaryLabel}>minutos</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.streak}</Text>
              <Text style={styles.summaryLabel}>dias de streak</Text>
            </View>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{stats.completedSessions}</Text>
              <Text style={styles.summaryLabel}>sessões</Text>
            </View>
          </View>

          <View style={styles.focusBox}>
            <Text style={styles.focusLabel}>FOCO TRABALHADO</Text>
            <Text style={styles.focusValue}>{diagnosis.weakness || 'Ritmo'}</Text>
            <Text style={styles.focusHint}>
              Progresso do dia: treino concluído · {stats.totalMinutes} min acumulados
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            activeOpacity={0.88}
            onPress={() => navigation.replace('Home')}
          >
            <LinearGradient colors={colors.gradient} style={styles.primaryBtnInner}>
              <Text style={styles.primaryBtnText}>VOLTAR PARA A HOME</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#06111F', '#071525', '#040914']} style={StyleSheet.absoluteFill} />
      <View style={styles.glowTop} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={async () => {
              setRunning(false);
              await persistActive();
              navigation.goBack();
            }}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Text style={styles.back}>‹ Sair</Text>
          </TouchableOpacity>
          <Text style={styles.topMeta}>
            Etapa {stepIndex + 1}/{steps.length}
          </Text>
          <Text style={styles.topMeta}>{formatTime(remainingTotal)}</Text>
        </View>

        <Text style={styles.kicker}>TREINO DIÁRIO</Text>
        <Text style={styles.sessionTitle}>
          {diagnosis.instrument || 'Violão'} · {diagnosis.level || 'Intermediário'}
        </Text>

        <View style={styles.progressTrack}>
          <LinearGradient
            colors={colors.gradientCool}
            style={[styles.progressFill, { width: `${Math.round(progress * 100)}%` }]}
          />
        </View>
        <Text style={styles.progressHint}>
          Progresso da sessão · {Math.round(progress * 100)}%
        </Text>

        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <Text style={styles.stepFocus}>{current?.focus}</Text>
            <Text style={styles.stepTimer}>{formatTime(remainingStep)}</Text>
          </View>
          <Text style={styles.stepTitle}>{current?.title}</Text>
          <Text style={styles.stepInstruction}>{current?.instruction}</Text>

          <View style={styles.stepProgressTrack}>
            <View style={[styles.stepProgressFill, { width: `${Math.round(stepProgress * 100)}%` }]} />
          </View>
        </View>

        <View style={styles.controls}>
          {!running ? (
            <TouchableOpacity
              style={styles.controlPrimary}
              activeOpacity={0.88}
              onPress={() => setRunning(true)}
            >
              <LinearGradient colors={colors.gradient} style={styles.controlPrimaryInner}>
                <Text style={styles.controlPrimaryText}>
                  {elapsedInStep > 0 || totalElapsed > 0 ? 'CONTINUAR' : 'INICIAR'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.controlSecondary}
              activeOpacity={0.88}
              onPress={() => setRunning(false)}
            >
              <Text style={styles.controlSecondaryText}>PAUSAR</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.controlGhost}
            activeOpacity={0.8}
            onPress={() => {
              setRunning(false);
              advanceStep();
            }}
          >
            <Text style={styles.controlGhostText}>
              {stepIndex >= steps.length - 1 ? 'CONCLUIR TREINO' : 'PRÓXIMA ETAPA'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepsList}>
          {steps.map((s, i) => (
            <View
              key={s.id}
              style={[
                styles.stepDotRow,
                i === stepIndex && styles.stepDotRowActive,
                i < stepIndex && styles.stepDotRowDone,
              ]}
            >
              <View
                style={[
                  styles.stepDot,
                  i === stepIndex && styles.stepDotActive,
                  i < stepIndex && styles.stepDotDone,
                ]}
              />
              <Text
                style={[
                  styles.stepDotLabel,
                  i === stepIndex && styles.stepDotLabelActive,
                ]}
                numberOfLines={1}
              >
                {s.title}
              </Text>
              <Text style={styles.stepDotDur}>{formatTime(s.durationSec)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  glowTop: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(22,217,255,0.06)',
    top: -110,
    right: -120,
  },
  glowCyan: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(63,243,221,0.08)',
    top: 80,
    left: -100,
  },
  loadingText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 120,
    fontWeight: '800',
  },
  scroll: {
    paddingTop: 52,
    paddingHorizontal: 16,
    paddingBottom: 48,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  back: { color: colors.accentCyan, fontSize: 15, fontWeight: '900' },
  topMeta: { color: '#7F96B1', fontSize: 11, fontWeight: '800' },
  kicker: {
    color: '#7F96B1',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 6,
  },
  sessionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
  },
  progressTrack: {
    height: 6,
    borderRadius: 99,
    backgroundColor: '#13243B',
    overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 99 },
  progressHint: {
    color: '#8096B0',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
    marginBottom: 18,
  },
  stepCard: {
    borderRadius: 18,
    backgroundColor: 'rgba(10,23,40,0.94)',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 20,
  },
  stepHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepFocus: {
    color: colors.accentCyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stepTimer: { color: '#fff', fontSize: 22, fontWeight: '900' },
  stepTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 10,
  },
  stepInstruction: {
    color: colors.textSecondary,
    fontSize: 13.5,
    lineHeight: 21,
    marginBottom: 16,
  },
  stepProgressTrack: {
    height: 5,
    borderRadius: 99,
    backgroundColor: '#13243B',
    overflow: 'hidden',
  },
  stepProgressFill: {
    height: 5,
    borderRadius: 99,
    backgroundColor: colors.accentPurple,
  },
  controls: { gap: 10, marginBottom: 24 },
  controlPrimary: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#7C3CFF',
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
  controlPrimaryInner: { paddingVertical: 16, alignItems: 'center' },
  controlPrimaryText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.8,
  },
  controlSecondary: {
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(12,27,47,0.95)',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  controlSecondaryText: {
    color: colors.accentCyan,
    fontWeight: '900',
    fontSize: 13,
    letterSpacing: 0.8,
  },
  controlGhost: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  controlGhostText: {
    color: '#6F89A8',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 0.6,
  },
  stepsList: {
    borderRadius: 16,
    backgroundColor: 'rgba(10,23,40,0.7)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  stepDotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  stepDotRowActive: {},
  stepDotRowDone: { opacity: 0.55 },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2A3D56',
  },
  stepDotActive: { backgroundColor: colors.accentCyan },
  stepDotDone: { backgroundColor: colors.success },
  stepDotLabel: {
    flex: 1,
    color: '#8FA3BE',
    fontSize: 12,
    fontWeight: '800',
  },
  stepDotLabelActive: { color: '#fff' },
  stepDotDur: { color: '#6F89A8', fontSize: 11, fontWeight: '800' },
  summaryScroll: {
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  summarySub: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  summaryGrid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: 'rgba(10,23,40,0.94)',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 16,
    alignItems: 'center',
  },
  summaryValue: { color: colors.accentCyan, fontSize: 26, fontWeight: '900' },
  summaryLabel: {
    color: '#8096B0',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 4,
  },
  focusBox: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: 'rgba(13,25,44,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(124,60,255,0.28)',
    marginBottom: 24,
  },
  focusLabel: {
    color: '#7087A2',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1.1,
  },
  focusValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 6,
    marginBottom: 8,
  },
  focusHint: { color: colors.textSecondary, fontSize: 12, lineHeight: 18 },
  primaryBtn: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#7C3CFF',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  primaryBtnInner: { paddingVertical: 17, alignItems: 'center' },
  primaryBtnText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
    letterSpacing: 0.8,
  },
});
