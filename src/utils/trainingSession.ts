export type DiagnosisData = {
  instrument?: string;
  level?: string;
  generalIndex?: number;
  strength?: string;
  weakness?: string;
  scores?: Record<string, number>;
};

export type TrainingStep = {
  id: string;
  title: string;
  instruction: string;
  durationSec: number;
  focus: string;
};

export type TrainingStats = {
  lastTrainingDate: string | null;
  completedSessions: number;
  totalMinutes: number;
  streak: number;
  todayCompleted: boolean;
};

export type ActiveSession = {
  steps: TrainingStep[];
  currentStepIndex: number;
  elapsedInStep: number;
  totalElapsed: number;
  startedAt: string;
  instrument: string;
  weakness: string;
  strength: string;
};

const STORAGE_STATS = 'trainingStats';
const STORAGE_ACTIVE = 'activeTrainingSession';

export function todayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function buildSession(data: DiagnosisData): TrainingStep[] {
  const instrument = data.instrument || 'Violão';
  const strength = data.strength || 'Acordes';
  const weakness = data.weakness || 'Ritmo';
  const level = data.level || 'Intermediário';

  return [
    {
      id: 'warmup',
      title: 'Aquecimento',
      instruction: `Afine o ${instrument.toLowerCase()} e toque ${strength.toLowerCase()} em tempo lento por alguns minutos. Solte as mãos, respire e prepare o corpo para o treino.`,
      durationSec: 90,
      focus: 'Preparação',
    },
    {
      id: 'focus',
      title: `Foco técnico · ${weakness}`,
      instruction: `Trabalhe o ponto fraco identificado no diagnóstico: ${weakness}. Isole o movimento, repita com atenção e corrija a postura. Nível ${level} — qualidade antes de velocidade.`,
      durationSec: 150,
      focus: weakness,
    },
    {
      id: 'apply',
      title: 'Aplicação musical',
      instruction: `Integre ${weakness.toLowerCase()} com o que você já domina em ${strength.toLowerCase()}. Toque um trecho curto (4–8 compassos) combinando os dois e mantenha o pulso estável.`,
      durationSec: 120,
      focus: 'Integração',
    },
    {
      id: 'close',
      title: 'Fechamento e revisão',
      instruction: `Revise mentalmente o que melhorou em ${weakness.toLowerCase()}. Toque uma passagem livre e anote um detalhe para o próximo treino. Encerre com calma.`,
      durationSec: 60,
      focus: 'Revisão',
    },
  ];
}

export function totalDurationSec(steps: TrainingStep[]): number {
  return steps.reduce((s, step) => s + step.durationSec, 0);
}

export function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export { STORAGE_STATS, STORAGE_ACTIVE };
