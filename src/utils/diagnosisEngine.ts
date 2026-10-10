export type Competency = 'Acordes' | 'Ritmo' | 'Percepção' | 'Teoria' | 'Técnica' | 'Harmonia';

export interface Question {
  id: string;
  instrument: string;
  competency: Competency;
  difficulty: 1 | 2 | 3 | 4 | 5;
  text: string;
  options: string[];
  correctIndex: number;
}

export const QUESTION_BANK: Question[] = [
  { id: 'v1', instrument: 'Violão', competency: 'Acordes', difficulty: 1, text: 'Qual diagrama representa Am?', options: ['X02210','022000','X00232','320003'], correctIndex: 0 },
  { id: 'v2', instrument: 'Violão', competency: 'Acordes', difficulty: 2, text: 'Formação do Fá maior?', options: ['133211','022100','X32010','320033'], correctIndex: 0 },
  { id: 'v3', instrument: 'Violão', competency: 'Ritmo', difficulty: 1, text: 'Tempos em 4/4?', options: ['2','3','4','6'], correctIndex: 2 },
  { id: 'v4', instrument: 'Violão', competency: 'Teoria', difficulty: 1, text: 'Campo harmônico de Dó começa com?', options: ['C Dm Em','G Am Bm','F G Am','D Em F#'], correctIndex: 0 },
  { id: 'v5', instrument: 'Violão', competency: 'Técnica', difficulty: 2, text: 'Técnica de puxar a corda após bater?', options: ['Hammer-on','Pull-off','Bend','Slide'], correctIndex: 1 },
  { id: 'v6', instrument: 'Violão', competency: 'Acordes', difficulty: 3, text: 'Notas D-F#-A-C formam?', options: ['D7','Dm7','Dmaj7','Dsus4'], correctIndex: 0 },
  { id: 'v7', instrument: 'Violão', competency: 'Teoria', difficulty: 2, text: 'Relativa menor de Sol maior?', options: ['Em','Am','Bm','Dm'], correctIndex: 0 },
  { id: 'g1', instrument: 'Guitarra', competency: 'Acordes', difficulty: 1, text: 'Shape básico de power chord?', options: ['1-3-5','1-5-8','1-4-5','2-3-4'], correctIndex: 1 },
  { id: 'g2', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 1, text: 'Palm mute serve para?', options: ['Abafar','Aumentar sustain','Bend','Harmônico'], correctIndex: 0 },
  { id: 'g3', instrument: 'Guitarra', competency: 'Técnica', difficulty: 2, text: 'Bend altera a altura como?', options: ['Esticando a corda','Batendo','Puxando','Deslizando'], correctIndex: 0 },
  { id: 'g4', instrument: 'Guitarra', competency: 'Teoria', difficulty: 2, text: 'Pentatônica menor tem quantas notas?', options: ['5','6','7','8'], correctIndex: 0 },
  { id: 'g5', instrument: 'Guitarra', competency: 'Acordes', difficulty: 3, text: 'E-G#-B-D forma?', options: ['E7','Em7','Emaj7','Esus4'], correctIndex: 0 },
  { id: 'g6', instrument: 'Guitarra', competency: 'Técnica', difficulty: 3, text: 'Tapping envolve?', options: ['Mão direita no braço','Só palm mute','Só bends','Acordes abertos'], correctIndex: 0 },
  { id: 'g7', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 2, text: 'Riff de rock costuma usar?', options: ['Power chords','Só abertos','Só palm mute','Sem ritmo'], correctIndex: 0 },
  { id: 't1', instrument: 'Teclado', competency: 'Acordes', difficulty: 1, text: 'Tríade de Dó maior?', options: ['C E G','C D E','C F G','D F A'], correctIndex: 0 },
  { id: 't2', instrument: 'Teclado', competency: 'Harmonia', difficulty: 1, text: 'Acompanhamento na mão esquerda?', options: ['Baixo + acordes','Só melodia','Só agudos','Nada'], correctIndex: 0 },
  { id: 't3', instrument: 'Teclado', competency: 'Teoria', difficulty: 2, text: 'Círculo de quintas avança por?', options: ['3ª','4ª','5ª','7ª'], correctIndex: 2 },
  { id: 't4', instrument: 'Teclado', competency: 'Acordes', difficulty: 2, text: '1ª inversão coloca a 3ª onde?', options: ['No baixo','No topo','No meio','Fora'], correctIndex: 0 },
  { id: 't5', instrument: 'Teclado', competency: 'Ritmo', difficulty: 1, text: 'Acompanhamento 4/4 marca?', options: ['Tempos 1 e 3','Só 1','Todos','Off-beats'], correctIndex: 0 },
  { id: 't6', instrument: 'Teclado', competency: 'Acordes', difficulty: 3, text: '7ª dominante contém?', options: ['Tônica 3ª 5ª 7ª menor','Só tríade','7ª maior','Nona'], correctIndex: 0 },
  { id: 't7', instrument: 'Teclado', competency: 'Harmonia', difficulty: 2, text: 'I-IV-V é?', options: ['Tônica subdominante dominante','Só menores','Aleatória','Modal'], correctIndex: 0 },
  { id: 'c1', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 1, text: 'Afinação padrão?', options: ['D G B D','G C E A','C G D A','E A D G'], correctIndex: 0 },
  { id: 'c2', instrument: 'Cavaquinho', competency: 'Ritmo', difficulty: 1, text: 'Samba no cavaquinho usa?', options: ['Síncopa','Notas longas','Só down','Palm mute'], correctIndex: 0 },
  { id: 'c3', instrument: 'Cavaquinho', competency: 'Técnica', difficulty: 2, text: 'Trocas rápidas exigem?', options: ['Mão relaxada','Força excessiva','Só 1 dedo','Sem pestana'], correctIndex: 0 },
  { id: 'c4', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 2, text: 'Ré maior usa?', options: ['Pestana 2º traste','Cordas soltas','Só 1ª 2ª','Sem pestana'], correctIndex: 0 },
  { id: 'c5', instrument: 'Cavaquinho', competency: 'Ritmo', difficulty: 2, text: 'Choro usa?', options: ['Síncopa e levadas','Notas longas','Só down','Palm mute'], correctIndex: 0 },
  { id: 'c6', instrument: 'Cavaquinho', competency: 'Técnica', difficulty: 3, text: 'Pestana exige?', options: ['Pressão uniforme','Só polegar','Nenhuma força','Só soltas'], correctIndex: 0 },
  { id: 'b1', instrument: 'Baixo', competency: 'Técnica', difficulty: 1, text: 'Fundamental geralmente no?', options: ['1º tempo','4º tempo','Nunca','Off-beat'], correctIndex: 0 },
  { id: 'b2', instrument: 'Baixo', competency: 'Ritmo', difficulty: 1, text: 'Groove 4/4 enfatiza?', options: ['1 e 3','Só 2','Rápidas','Silêncio'], correctIndex: 0 },
  { id: 'b3', instrument: 'Baixo', competency: 'Harmonia', difficulty: 2, text: 'Walking bass usa?', options: ['Notas cromáticas de passagem','Só tônica','Acordes','Melodia'], correctIndex: 0 },
  { id: 'b4', instrument: 'Baixo', competency: 'Teoria', difficulty: 1, text: 'Corda mais grave 4 cordas?', options: ['Mi','Lá','Ré','Sol'], correctIndex: 0 },
  { id: 'b5', instrument: 'Baixo', competency: 'Ritmo', difficulty: 2, text: 'Funk enfatiza?', options: ['Notas curtas síncopa','Longas','Só 1','Silêncio'], correctIndex: 0 },
  { id: 'b6', instrument: 'Baixo', competency: 'Harmonia', difficulty: 3, text: 'Walking bass conecta?', options: ['Acordes com passagem','Só tônica','Acordes','Ignora ritmo'], correctIndex: 0 },
  { id: 's1', instrument: 'Canto', competency: 'Percepção', difficulty: 1, text: 'Afinar significa?', options: ['Nota correta','Mais alto','Mais rápido','Vibrato'], correctIndex: 0 },
  { id: 's2', instrument: 'Canto', competency: 'Técnica', difficulty: 1, text: 'Respirar diafragmática ajuda a?', options: ['Sustentar','Mais agudo','Evitar esforço','Não importante'], correctIndex: 0 },
  { id: 's3', instrument: 'Canto', competency: 'Técnica', difficulty: 2, text: '5ª justa é?', options: ['Consonante','Dissonante','Sempre menor','Impossível'], correctIndex: 0 },
  { id: 's4', instrument: 'Canto', competency: 'Percepção', difficulty: 2, text: 'Melodia sobe/desce é?', options: ['Percepção melódica','Só ritmo','Só técnica','Harmonia'], correctIndex: 0 },
  { id: 's5', instrument: 'Canto', competency: 'Técnica', difficulty: 3, text: 'Registro de peito em?', options: ['Médias e graves','Só agudos','Falsete','Whisper'], correctIndex: 0 },
];

export function getStartingDifficulty(experience: string): number {
  if (experience.includes('Nunca') || experience.includes('começando')) return 1;
  if (experience.includes('Já consigo')) return 2;
  if (experience.includes('algum tempo')) return 3;
  if (experience.includes('desafiar')) return 4;
  return 2;
}

export function selectNextQuestion(instrument: string, answeredIds: string[], lastCorrect: boolean | null, currentDifficulty: number, competencyScores: Record<string, { correct: number; total: number }>): Question | null {
  const available = QUESTION_BANK.filter(q => q.instrument === instrument && !answeredIds.includes(q.id));
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

export function calculateResult(answers: { questionId: string; correct: boolean; competency: string; difficulty: number }[]): { scores: Record<string, number>; level: string; strength: string; weakness: string; generalIndex: number; startingPoint: string } {
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
  return { scores, level, strength: sorted[0]?.[0] || '—', weakness: sorted[sorted.length - 1]?.[0] || '—', generalIndex, startingPoint: `Trilha ${level} com foco em ${sorted[sorted.length - 1]?.[0] || '—'}` };
}
