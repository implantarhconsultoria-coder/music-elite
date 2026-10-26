// Dataset de repertório da Fase 2.
//
// IMPORTANTE SOBRE DIREITOS AUTORAIS:
// As músicas abaixo são cantigas tradicionais de domínio público
// (autoria anônima/popular, livres de direitos autorais). Música
// comercial de artistas com direitos ativos (ex.: as do moodboard
// de referência) NÃO pode ter letra reproduzida aqui sem licença —
// normalmente via provedor de letras/cifras licenciado (ex.: APIs
// de parceiros de conteúdo) ou acordo direto com a editora.

export type ChordLine = {
  chordLine?: string;
  lyricLine: string;
};

export type Song = {
  id: string;
  title: string;
  composer: string;
  instrument: 'Violão' | 'Guitarra' | 'Teclado' | 'Cavaquinho' | 'Baixo' | 'Canto';
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  key: string;
  chordsUsed: string[];
  lines: ChordLine[];
};

export const SONGS: Song[] = [
  {
    id: 'atirei-o-pau-no-gato',
    title: 'Atirei o Pau no Gato',
    composer: 'Domínio público',
    instrument: 'Violão',
    difficulty: 'Iniciante',
    key: 'G',
    chordsUsed: ['G', 'C', 'D7'],
    lines: [
      { chordLine: 'G                    C', lyricLine: 'Atirei o pau no gato-to' },
      { chordLine: 'G                         D7', lyricLine: 'Mas o gato-to não morreu-reu-reu' },
      { chordLine: 'G                    C', lyricLine: 'Dona Chica-ca admirou-se-se' },
      { chordLine: 'D7                      G', lyricLine: 'Do berro que o gato deu: Miau!' },
    ],
  },
  {
    id: 'ciranda-cirandinha',
    title: 'Ciranda, Cirandinha',
    composer: 'Domínio público',
    instrument: 'Violão',
    difficulty: 'Iniciante',
    key: 'C',
    chordsUsed: ['C', 'F', 'G'],
    lines: [
      { chordLine: 'C                  F', lyricLine: 'Ciranda, cirandinha' },
      { chordLine: 'G                      C', lyricLine: 'Vamos todos cirandar' },
      { chordLine: 'C                 F', lyricLine: 'Vamos dar a meia-volta' },
      { chordLine: 'G                  C', lyricLine: 'Volta e meia vamos dar' },
    ],
  },
];
