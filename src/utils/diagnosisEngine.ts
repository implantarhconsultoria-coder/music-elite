export type Competency = 'Acordes' | 'Ritmo' | 'Percepção' | 'Teoria' | 'Técnica' | 'Harmonia';

export interface Question {
  id: string;
  instrument: string;
  competency: Competency;
  difficulty: 1 | 2 | 3 | 4 | 5;
  text: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export const QUESTION_BANK: Question[] = [
  { id: 'v-a1', instrument: 'Violão', competency: 'Acordes', difficulty: 1, text: 'Qual diagrama representa o acorde de Am (Lá menor)?', options: ['X02210', '022000', 'X00232', '320003'], correctIndex: 0 },
  { id: 'v-a2', instrument: 'Violão', competency: 'Acordes', difficulty: 2, text: 'Qual é a formação do acorde Fá maior (F)?', options: ['133211', '022100', 'X32010', '320033'], correctIndex: 0 },
  { id: 'v-a3', instrument: 'Violão', competency: 'Acordes', difficulty: 3, text: 'Qual acorde é formado pelas notas D-F#-A-C?', options: ['D7', 'Dm7', 'Dmaj7', 'Dsus4'], correctIndex: 0 },
  { id: 'v-r1', instrument: 'Violão', competency: 'Ritmo', difficulty: 1, text: 'Em um compasso 4/4, quantos tempos existem?', options: ['2', '3', '4', '6'], correctIndex: 2 },
  { id: 'v-r2', instrument: 'Violão', competency: 'Ritmo', difficulty: 2, text: 'Qual levada é típica de bossa nova?', options: ['Down-up contínuo', 'Syncopada com pausas', 'Só downstrokes', 'Palm mute constante'], correctIndex: 1 },
  { id: 'v-t1', instrument: 'Violão', competency: 'Teoria', difficulty: 1, text: 'O campo harmônico de Dó maior começa com quais acordes?', options: ['C Dm Em', 'G Am Bm', 'F G Am', 'D Em F#'], correctIndex: 0 },
  { id: 'v-tec1', instrument: 'Violão', competency: 'Técnica', difficulty: 2, text: 'Qual técnica usa o dedo para bater na corda e depois puxar?', options: ['Hammer-on', 'Pull-off', 'Bend', 'Slide'], correctIndex: 1 },
  { id: 'g-a1', instrument: 'Guitarra', competency: 'Acordes', difficulty: 1, text: 'Qual é o shape básico de power chord na 6ª corda?', options: ['1-3-5', '1-5-8', '1-4-5', '2-3-4'], correctIndex: 1 },
  { id: 'g-r1', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 1, text: 'Palm mute é usado principalmente para:', options: ['Abafar o som', 'Aumentar sustain', 'Fazer bend', 'Harmônicos'], correctIndex: 0 },
  { id: 't-a1', instrument: 'Teclado', competency: 'Acordes', difficulty: 1, text: 'A tríade de Dó maior é formada por:', options: ['C E G', 'C D E', 'C F G', 'D F A'], correctIndex: 0 },
  { id: 'c-a1', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 1, text: 'Qual é a afinação padrão do cavaquinho?', options: ['D G B D', 'G C E A', 'C G D A', 'E A D G'], correctIndex: 0 },
  { id: 'b-tec1', instrument: 'Baixo', competency: 'Técnica', difficulty: 1, text: 'A nota fundamental no baixo geralmente é tocada:', options: ['No 1º tempo', 'Só no 4º tempo', 'Nunca', 'Só em off-beat'], correctIndex: 0 },
  { id: 's-p1', instrument: 'Canto', competency: 'Percepção', difficulty: 1, text: 'Afinar significa:', options: ['Cantar a nota correta', 'Cantar mais alto', 'Cantar mais rápido', 'Usar vibrato'], correctIndex: 0 },
];

export function getStartingDifficulty(experience: string): number {
  if (experience.includes('Nunca') || experience.includes('começando')) return 1;
  if (experience.includes('Já consigo')) return 2;
  if (experience.includes('algum tempo')) return 3;
  if (experience.includes('desafiar')) return 4;
  return 2;
}

export function selectNextQuestion(
  instrument: string,
  answeredIds: string[],
  lastCorrect: boolean | null,
  currentDifficulty: number,
  competencyScores: Record<string, { correct: number; total: number }>
): Question | null {
  const available = QUESTION_BANK.filter(
    q => q.instrument === instrument && !answeredIds.includes(q.id)
  );
  if (available.length === 0) return null;

  let targetDiff = currentDifficulty;
  if (lastCorrect === true) targetDiff = Math.min(5, currentDifficulty + 1);
  if (lastCorrect === false) targetDiff = Math.max(1, currentDifficulty - 1);

  const sorted = [...available].sort((a, b) => {
    const aScore = competencyScores[a.competency] || { correct: 0, total: 0 };
    const bScore = competencyScores[b.competency] || { correct: 0, total: 0 };
    const aNeed = aScore.total < 2 ? 0 : 1;
    const bNeed = bScore.total < 2 ? 0 : 1;
    if (aNeed !== bNeed) return aNeed - bNeed;
    return Math.abs(a.difficulty - targetDiff) - Math.abs(b.difficulty - targetDiff);
  });

  return sorted[0] || null;
}

export function calculateResult(
  answers: { questionId: string; correct: boolean; competency: string; difficulty: number }[]
): { scores: Record<string, number>; level: string; strength: string; weakness: string; generalIndex: number; startingPoint: string } {
  const byComp: Record<string, { correct: number; total: number; weight: number }> = {};

  answers.forEach(a => {
    if (!byComp[a.competency]) byComp[a.competency] = { correct: 0, total: 0, weight: 0 };
    byComp[a.competency].total += 1;
    if (a.correct) byComp[a.competency].correct += 1;
    byComp[a.competency].weight += a.difficulty;
  });

  const scores: Record<string, number> = {};
  Object.entries(byComp).forEach(([comp, data]) => {
    const accuracy = data.total > 0 ? (data.correct / data.total) * 100 : 0;
    const difficultyBonus = data.weight / Math.max(1, data.total);
    scores[comp] = Math.round(accuracy * (0.65 + difficultyBonus * 0.07));
  });

  const values = Object.values(scores);
  const generalIndex = values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;

  let level = 'Iniciante';
  if (generalIndex >= 85) level = 'Avançado';
  else if (generalIndex >= 70) level = 'Intermediário II';
  else if (generalIndex >= 50) level = 'Intermediário';

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const strength = sorted[0]?.[0] || '—';
  const weakness = sorted[sorted.length - 1]?.[0] || '—';

  return {
    scores,
    level,
    strength,
    weakness,
    generalIndex,
    startingPoint: `Trilha ${level} com foco inicial em ${weakness}`,
  };
}
