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
  // VIOLÃO (13)
  { id: 'v1', instrument: 'Violão', competency: 'Acordes', difficulty: 1, text: 'Qual diagrama representa o acorde de Am (Lá menor)?', options: ['X02210', '022000', 'X00232', '320003'], correctIndex: 0 },
  { id: 'v2', instrument: 'Violão', competency: 'Acordes', difficulty: 2, text: 'Qual é a formação do acorde Fá maior com pestana?', options: ['133211', '022100', 'X32010', '320033'], correctIndex: 0 },
  { id: 'v3', instrument: 'Violão', competency: 'Ritmo', difficulty: 1, text: 'Em um compasso 4/4, quantos tempos existem?', options: ['2', '3', '4', '6'], correctIndex: 2 },
  { id: 'v4', instrument: 'Violão', competency: 'Teoria', difficulty: 1, text: 'O campo harmônico de Dó maior começa com quais acordes?', options: ['C Dm Em', 'G Am Bm', 'F G Am', 'D Em F#'], correctIndex: 0 },
  { id: 'v5', instrument: 'Violão', competency: 'Técnica', difficulty: 2, text: 'Qual técnica consiste em bater na corda e depois puxá-la?', options: ['Hammer-on', 'Pull-off', 'Bend', 'Slide'], correctIndex: 1 },
  { id: 'v6', instrument: 'Violão', competency: 'Acordes', difficulty: 3, text: 'As notas D-F#-A-C formam qual acorde?', options: ['D7', 'Dm7', 'Dmaj7', 'Dsus4'], correctIndex: 0 },
  { id: 'v7', instrument: 'Violão', competency: 'Teoria', difficulty: 2, text: 'Qual é a relativa menor de Sol maior?', options: ['Em', 'Am', 'Bm', 'Dm'], correctIndex: 0 },
  { id: 'v8', instrument: 'Violão', competency: 'Acordes', difficulty: 4, text: 'As notas G-B-D-F# formam qual acorde?', options: ['Gmaj7', 'G7', 'Gm7', 'Gsus4'], correctIndex: 0 },
  { id: 'v9', instrument: 'Violão', competency: 'Teoria', difficulty: 4, text: 'No modo Dórico, a 6ª é:', options: ['Maior', 'Menor', 'Diminuta', 'Aumentada'], correctIndex: 0 },
  { id: 'v10', instrument: 'Violão', competency: 'Técnica', difficulty: 5, text: 'Sweep picking é caracterizado por:', options: ['Palhetada contínua em uma direção', 'Alternada rápida', 'Só hammer-on', 'Palm mute'], correctIndex: 0 },
  { id: 'v11', instrument: 'Violão', competency: 'Ritmo', difficulty: 3, text: 'Uma levada de bossa nova tipicamente usa:', options: ['Síncopa com pausas', 'Só downstrokes', 'Palm mute constante', 'Notas longas'], correctIndex: 0 },
  { id: 'v12', instrument: 'Violão', competency: 'Percepção', difficulty: 2, text: 'Identificar se um intervalo é maior ou menor de ouvido é:', options: ['Percepção intervalar', 'Só ritmo', 'Só técnica', 'Harmonia'], correctIndex: 0 },
  { id: 'v13', instrument: 'Violão', competency: 'Harmonia', difficulty: 3, text: 'Em Dó maior, o acorde de Fá tem função de:', options: ['Subdominante', 'Dominante', 'Tônica', 'Mediante'], correctIndex: 0 },
  // GUITARRA (10)
  { id: 'g1', instrument: 'Guitarra', competency: 'Acordes', difficulty: 1, text: 'O shape básico de power chord na 6ª corda é:', options: ['1-5-8', '1-3-5', '1-4-5', '2-3-4'], correctIndex: 0 },
  { id: 'g2', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 1, text: 'Palm mute é usado principalmente para:', options: ['Abafar o som', 'Aumentar sustain', 'Fazer bend', 'Harmônicos'], correctIndex: 0 },
  { id: 'g3', instrument: 'Guitarra', competency: 'Técnica', difficulty: 2, text: 'Bend altera a altura da nota:', options: ['Esticando a corda', 'Batendo', 'Puxando', 'Deslizando'], correctIndex: 0 },
  { id: 'g4', instrument: 'Guitarra', competency: 'Teoria', difficulty: 2, text: 'A escala pentatônica menor tem quantas notas?', options: ['5', '6', '7', '8'], correctIndex: 0 },
  { id: 'g5', instrument: 'Guitarra', competency: 'Acordes', difficulty: 3, text: 'As notas E-G#-B-D formam qual acorde?', options: ['E7', 'Em7', 'Emaj7', 'Esus4'], correctIndex: 0 },
  { id: 'g6', instrument: 'Guitarra', competency: 'Técnica', difficulty: 3, text: 'Tapping envolve:', options: ['Mão direita no braço', 'Só palm mute', 'Só bends', 'Acordes abertos'], correctIndex: 0 },
  { id: 'g7', instrument: 'Guitarra', competency: 'Teoria', difficulty: 4, text: 'A escala harmônica menor possui a 7ª:', options: ['Maior', 'Menor', 'Diminuta', 'Aumentada'], correctIndex: 0 },
  { id: 'g8', instrument: 'Guitarra', competency: 'Técnica', difficulty: 5, text: 'Hybrid picking combina:', options: ['Palheta e dedos', 'Só palheta', 'Só dedos', 'Tapping'], correctIndex: 0 },
  { id: 'g9', instrument: 'Guitarra', competency: 'Acordes', difficulty: 4, text: 'Um acorde add9 não possui:', options: ['7ª', '3ª', '5ª', 'Tônica'], correctIndex: 0 },
  { id: 'g10', instrument: 'Guitarra', competency: 'Ritmo', difficulty: 3, text: 'Um riff de rock tipicamente usa:', options: ['Power chords', 'Só acordes abertos', 'Só palm mute', 'Sem ritmo'], correctIndex: 0 },
  // TECLADO (10)
  { id: 't1', instrument: 'Teclado', competency: 'Acordes', difficulty: 1, text: 'A tríade de Dó maior é formada por:', options: ['C E G', 'C D E', 'C F G', 'D F A'], correctIndex: 0 },
  { id: 't2', instrument: 'Teclado', competency: 'Harmonia', difficulty: 1, text: 'Na mão esquerda, o acompanhamento básico geralmente toca:', options: ['Baixo + acordes', 'Só a melodia', 'Só notas agudas', 'Nada'], correctIndex: 0 },
  { id: 't3', instrument: 'Teclado', competency: 'Teoria', difficulty: 2, text: 'O círculo de quintas avança por intervalos de:', options: ['5ª', '3ª', '4ª', '7ª'], correctIndex: 0 },
  { id: 't4', instrument: 'Teclado', competency: 'Acordes', difficulty: 2, text: 'Na 1ª inversão, a 3ª fica:', options: ['No baixo', 'No topo', 'No meio', 'Fora'], correctIndex: 0 },
  { id: 't5', instrument: 'Teclado', competency: 'Ritmo', difficulty: 1, text: 'Em 4/4, o acompanhamento básico costuma marcar:', options: ['Tempos 1 e 3', 'Só o 1º', 'Todos os tempos', 'Só off-beats'], correctIndex: 0 },
  { id: 't6', instrument: 'Teclado', competency: 'Acordes', difficulty: 3, text: 'Um acorde de 7ª dominante contém:', options: ['Tônica, 3ª, 5ª e 7ª menor', 'Só tríade', '7ª maior', 'Nona'], correctIndex: 0 },
  { id: 't7', instrument: 'Teclado', competency: 'Harmonia', difficulty: 2, text: 'A progressão I-IV-V é:', options: ['Tônica, subdominante, dominante', 'Só menores', 'Aleatória', 'Modal'], correctIndex: 0 },
  { id: 't8', instrument: 'Teclado', competency: 'Teoria', difficulty: 4, text: 'A progressão ii-V-I é típica de:', options: ['Jazz', 'Blues clássico', 'Rock básico', 'Modal puro'], correctIndex: 0 },
  { id: 't9', instrument: 'Teclado', competency: 'Harmonia', difficulty: 5, text: 'Substituição tritonal substitui o V7 por:', options: ['bII7', 'IV7', 'vi7', 'iii7'], correctIndex: 0 },
  { id: 't10', instrument: 'Teclado', competency: 'Acordes', difficulty: 4, text: 'Uma tétrade menor com 7ª maior é:', options: ['m(maj7)', 'm7', 'maj7', 'dim7'], correctIndex: 0 },
  // CAVAQUINHO (10)
  { id: 'c1', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 1, text: 'Qual é a afinação padrão do cavaquinho?', options: ['D G B D', 'G C E A', 'C G D A', 'E A D G'], correctIndex: 0 },
  { id: 'c2', instrument: 'Cavaquinho', competency: 'Ritmo', difficulty: 1, text: 'O ritmo de samba no cavaquinho usa principalmente:', options: ['Síncopa', 'Notas longas', 'Só downstrokes', 'Palm mute'], correctIndex: 0 },
  { id: 'c3', instrument: 'Cavaquinho', competency: 'Técnica', difficulty: 2, text: 'Para trocas rápidas é essencial:', options: ['Mão esquerda relaxada', 'Força excessiva', 'Só 1 dedo', 'Sem pestana'], correctIndex: 0 },
  { id: 'c4', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 2, text: 'O acorde de Ré maior normalmente usa:', options: ['Pestana no 2º traste', 'Cordas soltas', 'Só 1ª e 2ª', 'Sem pestana'], correctIndex: 0 },
  { id: 'c5', instrument: 'Cavaquinho', competency: 'Ritmo', difficulty: 3, text: 'O choro usa principalmente:', options: ['Síncopa e levadas', 'Notas longas', 'Só downstrokes', 'Palm mute'], correctIndex: 0 },
  { id: 'c6', instrument: 'Cavaquinho', competency: 'Técnica', difficulty: 3, text: 'Pestana no cavaquinho exige:', options: ['Pressão uniforme do indicador', 'Só polegar', 'Nenhuma força', 'Só cordas soltas'], correctIndex: 0 },
  { id: 'c7', instrument: 'Cavaquinho', competency: 'Teoria', difficulty: 1, text: 'O cavaquinho tem quantas cordas?', options: ['4', '5', '6', '3'], correctIndex: 0 },
  { id: 'c8', instrument: 'Cavaquinho', competency: 'Acordes', difficulty: 4, text: 'Em Dó maior, o acorde de Fá é:', options: ['IV', 'V', 'ii', 'vi'], correctIndex: 0 },
  { id: 'c9', instrument: 'Cavaquinho', competency: 'Ritmo', difficulty: 4, text: 'A síncopa no samba desloca a acentuação para:', options: ['Contratempo', 'Tempo forte', 'Só o 1º tempo', 'Silêncio'], correctIndex: 0 },
  { id: 'c10', instrument: 'Cavaquinho', competency: 'Técnica', difficulty: 5, text: 'Arpejo no cavaquinho exige:', options: ['Independência dos dedos', 'Só polegar', 'Palm mute', 'Sem pestana'], correctIndex: 0 },
  // BAIXO (10)
  { id: 'b1', instrument: 'Baixo', competency: 'Técnica', difficulty: 1, text: 'A nota fundamental geralmente é tocada no:', options: ['1º tempo', '4º tempo', 'Nunca', 'Off-beat'], correctIndex: 0 },
  { id: 'b2', instrument: 'Baixo', competency: 'Ritmo', difficulty: 1, text: 'Um groove básico em 4/4 enfatiza:', options: ['Tempos 1 e 3', 'Só o 2º', 'Notas rápidas', 'Silêncio'], correctIndex: 0 },
  { id: 'b3', instrument: 'Baixo', competency: 'Harmonia', difficulty: 2, text: 'Walking bass usa principalmente:', options: ['Notas cromáticas de passagem', 'Só a tônica', 'Acordes', 'Melodia'], correctIndex: 0 },
  { id: 'b4', instrument: 'Baixo', competency: 'Teoria', difficulty: 1, text: 'A corda mais grave do baixo de 4 cordas é:', options: ['Mi (E)', 'Lá (A)', 'Ré (D)', 'Sol (G)'], correctIndex: 0 },
  { id: 'b5', instrument: 'Baixo', competency: 'Ritmo', difficulty: 3, text: 'Groove de funk enfatiza:', options: ['Notas curtas e síncopa', 'Notas longas', 'Só o 1º tempo', 'Silêncio'], correctIndex: 0 },
  { id: 'b6', instrument: 'Baixo', competency: 'Harmonia', difficulty: 3, text: 'Uma linha de walking bass costuma:', options: ['Conectar acordes com notas de passagem', 'Ficar só na tônica', 'Tocar acordes', 'Ignorar o ritmo'], correctIndex: 0 },
  { id: 'b7', instrument: 'Baixo', competency: 'Teoria', difficulty: 2, text: 'A escala maior de Dó tem quantos acidentes?', options: ['0', '1', '2', '3'], correctIndex: 0 },
  { id: 'b8', instrument: 'Baixo', competency: 'Harmonia', difficulty: 4, text: 'Em uma progressão, o baixo frequentemente toca a:', options: ['Fundamental do acorde', '3ª sempre', '7ª sempre', 'Nenhuma nota'], correctIndex: 0 },
  { id: 'b9', instrument: 'Baixo', competency: 'Técnica', difficulty: 5, text: 'Slap no baixo usa:', options: ['Polegar e dedos', 'Só palheta', 'Só hammer-on', 'Palm mute'], correctIndex: 0 },
  { id: 'b10', instrument: 'Baixo', competency: 'Ritmo', difficulty: 4, text: 'Um ostinato é:', options: ['Padrão rítmico repetido', 'Nota única', 'Acorde', 'Melodia livre'], correctIndex: 0 },
  // CANTO (10)
  { id: 's1', instrument: 'Canto', competency: 'Percepção', difficulty: 1, text: 'Afinar significa:', options: ['Cantar a nota correta', 'Cantar mais alto', 'Cantar mais rápido', 'Usar vibrato'], correctIndex: 0 },
  { id: 's2', instrument: 'Canto', competency: 'Técnica', difficulty: 1, text: 'A respiração diafragmática ajuda a:', options: ['Sustentar notas mais longas', 'Cantar mais agudo sempre', 'Evitar qualquer esforço', 'Não é importante'], correctIndex: 0 },
  { id: 's3', instrument: 'Canto', competency: 'Técnica', difficulty: 2, text: 'Um intervalo de 5ª justa é:', options: ['Consonante e estável', 'Muito dissonante', 'Sempre menor', 'Impossível de cantar'], correctIndex: 0 },
  { id: 's4', instrument: 'Canto', competency: 'Percepção', difficulty: 2, text: 'Identificar se uma melodia sobe ou desce é:', options: ['Percepção melódica', 'Só ritmo', 'Só técnica', 'Harmonia'], correctIndex: 0 },
  { id: 's5', instrument: 'Canto', competency: 'Técnica', difficulty: 3, text: 'Registro de peito é usado principalmente em:', options: ['Notas médias e graves', 'Só agudos extremos', 'Falsete', 'Whisper'], correctIndex: 0 },
  { id: 's6', instrument: 'Canto', competency: 'Percepção', difficulty: 3, text: 'Um intervalo de 4ª justa soa:', options: ['Estável', 'Muito dissonante', 'Sempre menor', 'Impossível'], correctIndex: 0 },
  { id: 's7', instrument: 'Canto', competency: 'Técnica', difficulty: 4, text: 'O falsete é usado principalmente em:', options: ['Notas agudas', 'Só graves', 'Whisper', 'Fala normal'], correctIndex: 0 },
  { id: 's8', instrument: 'Canto', competency: 'Percepção', difficulty: 4, text: 'Identificar a tônica de uma melodia é:', options: ['Percepção tonal', 'Só ritmo', 'Só técnica', 'Harmonia avançada'], correctIndex: 0 },
  { id: 's9', instrument: 'Canto', competency: 'Teoria', difficulty: 3, text: 'Uma escala maior tem a estrutura de:', options: ['Tons e semitons definidos', 'Só tons', 'Só semitons', '4 tons'], correctIndex: 0 },
  { id: 's10', instrument: 'Canto', competency: 'Técnica', difficulty: 5, text: 'Vibrato controlado ajuda na:', options: ['Expressividade e sustentação', 'Afinar sempre', 'Cantar mais alto', 'Evitar respiração'], correctIndex: 0 },
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
