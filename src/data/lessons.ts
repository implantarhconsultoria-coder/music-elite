// Dataset de aulas da Fase 2.
// IMPORTANTE: os títulos e tópicos aqui são placeholders estruturais.
// `videoUrl` fica undefined até existir vídeo real hospedado — a tela
// de detalhe mostra "vídeo em breve" nesse caso, sem simular conteúdo.

export type Lesson = {
  id: string;
  instrument: 'Violão' | 'Guitarra' | 'Teclado' | 'Cavaquinho' | 'Baixo' | 'Canto';
  title: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  durationMinutes: number;
  topics: string[];
  videoUrl?: string;
};

export const LESSONS: Lesson[] = [
  {
    id: 'violao-acordes-basicos',
    instrument: 'Violão',
    title: 'Acordes básicos',
    level: 'Iniciante',
    durationMinutes: 14,
    topics: ['Postura e afinação', 'Acordes maiores', 'Troca entre 2 acordes'],
  },
  {
    id: 'violao-ritmo-levadas',
    instrument: 'Violão',
    title: 'Ritmo e levadas',
    level: 'Intermediário',
    durationMinutes: 18,
    topics: ['Levada básica', 'Variações de batida', 'Sincronia mão direita'],
  },
  {
    id: 'violao-progressoes',
    instrument: 'Violão',
    title: 'Progressões comuns',
    level: 'Intermediário',
    durationMinutes: 16,
    topics: ['Progressão I-IV-V', 'Progressão vi-IV-I-V', 'Aplicação em música'],
  },
  {
    id: 'guitarra-power-chords',
    instrument: 'Guitarra',
    title: 'Power chords',
    level: 'Iniciante',
    durationMinutes: 12,
    topics: ['Formato da pestana', 'Palhetada abafada', 'Progressão simples'],
  },
  {
    id: 'guitarra-escalas',
    instrument: 'Guitarra',
    title: 'Escala pentatônica',
    level: 'Intermediário',
    durationMinutes: 20,
    topics: ['Posição 1', 'Bends e ligados', 'Improviso guiado'],
  },
  {
    id: 'teclado-acordes',
    instrument: 'Teclado',
    title: 'Acordes com inversões',
    level: 'Intermediário',
    durationMinutes: 15,
    topics: ['Tríades', 'Inversões', 'Transição suave entre acordes'],
  },
  {
    id: 'canto-respiracao',
    instrument: 'Canto',
    title: 'Respiração e apoio',
    level: 'Iniciante',
    durationMinutes: 13,
    topics: ['Respiração diafragmática', 'Sustentação de nota', 'Aquecimento vocal'],
  },
];
