export type Competency = 'Acordes' | 'Ritmo' | 'Percepção' | 'Teoria' | 'Técnica' | 'Harmonia' | 'Improviso';

export interface Question {
  id: string;
  instrument: string;
  competency: Competency;
  difficulty: 1 | 2 | 3 | 4 | 5;
  text: string;
}

export const QUESTION_BANK: Question[] = [
  // VIOLÃO
  { id: 'v1', instrument: 'Violão', competency: 'Acordes', difficulty: 1, text: 'Você reconhece e forma acordes maiores e menores básicos (Dó, Sol, Ré, Mi, Lá)?' },
  { id: 'v2', instrument: 'Violão', competency: 'Acordes', difficulty: 2, text: 'Consegue formar e trocar acordes com pestana (Fá, Si, Si menor) com clareza?' },
  { id: 'v3', instrument: 'Violão', competency: 'Acordes', difficulty: 3, text: 'Domina acordes com extensões (7, maj7, m7, sus) e inversões?' },
  { id: 'v4', instrument: 'Violão', competency: 'Ritmo', difficulty: 1, text: 'Mantém um ritmo básico de 4/4 com palhetada alternada estável?' },
  { id: 'v5', instrument: 'Violão', competency: 'Ritmo', difficulty: 2, text: 'Executa levadas e ritmos de bossa, samba ou rock com precisão?' },
  { id: 'v6', instrument: 'Violão', competency: 'Percepção', difficulty: 1, text: 'Identifica se um intervalo é maior ou menor de ouvido?' },
  { id: 'v7', instrument: 'Violão', competency: 'Percepção', difficulty: 2, text: 'Reconhece progressões harmônicas simples de ouvido?' },
  { id: 'v8', instrument: 'Violão', competency: 'Teoria', difficulty: 1, text: 'Entende o campo harmônico da tonalidade de Dó maior?' },
  { id: 'v9', instrument: 'Violão', competency: 'Teoria', difficulty: 2, text: 'Sabe construir e aplicar o campo harmônico em outras tonalidades?' },
  { id: 'v10', instrument: 'Violão', competency: 'Técnica', difficulty: 1, text: 'Troca de acordes com fluidez em andamento lento?' },
  { id: 'v11', instrument: 'Violão', competency: 'Técnica', difficulty: 3, text: 'Executa solos ou arpejos com limpeza em andamento moderado?' },
  // GUITARRA
  { id: 'g1', instrument: 'Guitarra', competency: 'Acordes', difficulty: 1, text: 'Forma acordes power e básicos abertos com clareza?' },
  { id: 'g2', instrument: 'Guitarra', competency: 'Acordes', difficulty: 2, text: 'Usa barre chords (E e A shape) com precisão?' },
  { id: 'g3', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 1, text: 'Mantém palhetada alternada estável em 4/4?' },
  { id: 'g4', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 2, text: 'Executa riffs e ritmos de rock/blues com groove?' },
  { id: 'g5', instrument: 'Guitarra', competency: 'Técnica', difficulty: 2, text: 'Usa bends, hammer-on e pull-off com controle?' },
  { id: 'g6', instrument: 'Guitarra', competency: 'Percepção', difficulty: 1, text: 'Identifica a tonalidade de uma música simples de ouvido?' },
  // TECLADO
  { id: 't1', instrument: 'Teclado', competency: 'Acordes', difficulty: 1, text: 'Forma tríades maiores e menores com as duas mãos?' },
  { id: 't2', instrument: 'Teclado', competency: 'Acordes', difficulty: 2, text: 'Toca acordes de 7ª e inversões com fluidez?' },
  { id: 't3', instrument: 'Teclado', competency: 'Harmonia', difficulty: 1, text: 'Acompanha uma melodia com acordes básicos na mão esquerda?' },
  { id: 't4', instrument: 'Teclado', competency: 'Ritmo', difficulty: 1, text: 'Mantém um acompanhamento rítmico estável?' },
  { id: 't5', instrument: 'Teclado', competency: 'Teoria', difficulty: 2, text: 'Entende e aplica o círculo de quintas?' },
  // CAVAQUINHO
  { id: 'c1', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 1, text: 'Forma os acordes básicos de cavaquinho (Dó, Ré, Sol, Lá)?' },
  { id: 'c2', instrument: 'Cavaquinho', competency: 'Ritmo', difficulty: 1, text: 'Executa o ritmo de samba ou choro básico?' },
  { id: 'c3', instrument: 'Cavaquinho', competency: 'Técnica', difficulty: 2, text: 'Faz pestanas e trocas rápidas com clareza?' },
  // BAIXO
  { id: 'b1', instrument: 'Baixo', competency: 'Técnica', difficulty: 1, text: 'Toca notas da escala maior com precisão e timing?' },
  { id: 'b2', instrument: 'Baixo', competency: 'Ritmo', difficulty: 1, text: 'Mantém um groove estável em 4/4?' },
  { id: 'b3', instrument: 'Baixo', competency: 'Harmonia', difficulty: 2, text: 'Acompanha progressões harmônicas com walking bass simples?' },
  // CANTO
  { id: 's1', instrument: 'Canto', competency: 'Percepção', difficulty: 1, text: 'Afina notas simples e intervalos básicos?' },
  { id: 's2', instrument: 'Canto', competency: 'Técnica', difficulty: 1, text: 'Controla respiração e sustentação de notas?' },
  { id: 's3', instrument: 'Canto', competency: 'Técnica', difficulty: 2, text: 'Executa escalas e arpejos com controle de pitch?' },
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

  const sorted = available.sort((a, b) => {
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
): { scores: Record<string, number>; level: string; strength: string; weakness: string; startingPoint: string } {
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
    const difficultyBonus = data.weight / data.total;
    scores[comp] = Math.round(accuracy * (0.7 + difficultyBonus * 0.06));
  });

  const values = Object.values(scores);
  const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;

  let level = 'Iniciante';
  if (avg >= 85) level = 'Avançado';
  else if (avg >= 70) level = 'Intermediário II';
  else if (avg >= 50) level = 'Intermediário';

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const strength = sorted[0]?.[0] || '—';
  const weakness = sorted[sorted.length - 1]?.[0] || '—';

  return {
    scores,
    level,
    strength,
    weakness,
    startingPoint: `Começar em ${level} com foco em ${weakness}`,
  };
}
