/**
 * DADOS FICTÍCIOS — preview de marketing da Cupperfy.
 * Não conecta ao Supabase. Não representa competições, jogadores ou resultados reais.
 * Não criar tabelas, migrations, RPCs ou policies a partir deste arquivo.
 */

export type PreviewMatchStatus = 'pending' | 'ready' | 'completed';

export type PreviewPlayer = {
  id: string;
  slug: string;
  displayName: string;
  tag: string;
  initials: string;
  sport: string;
  bio: string;
};

export type PreviewMatchSideStats = {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
  corners: number;
  fouls: number;
};

export type PreviewMatch = {
  id: string;
  competitionId: string;
  round: number;
  bracketSlot: number;
  playerAId: string | null;
  playerBId: string | null;
  scoreA: number | null;
  scoreB: number | null;
  winnerPlayerId: string | null;
  status: PreviewMatchStatus;
  nextMatchId: string | null;
  scheduledAt: string;
};

export type PreviewCareerMatch = {
  id: string;
  competitionName: string;
  playerAId: string;
  playerBId: string;
  scoreA: number;
  scoreB: number;
  winnerPlayerId: string;
  playedAt: string;
};

export type PreviewCommunityPost = {
  id: string;
  kind: 'match' | 'achievement' | 'text';
  authorId: string;
  body: string;
  createdAt: string;
};

export type PreviewStandingRow = {
  position: number;
  playerId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

export const MATCH_STATUS_LABEL: Record<PreviewMatchStatus, string> = {
  pending: 'Aguardando',
  ready: 'Pronta',
  completed: 'Encerrada',
};

export const PREVIEW_ROUNDS = [
  { round: 1, label: 'Quartas de final' },
  { round: 2, label: 'Semifinais' },
  { round: 3, label: 'Final' },
] as const;

export const PREVIEW_COMPETITION = {
  id: 'comp-copa-fc',
  name: 'Copa Cupperfy FC',
  sport: 'Futebol e-sports',
  status: 'in_progress',
  organizerName: 'Cupperfy',
  format: {
    type: 'single_elimination' as const,
    participantType: 'player' as const,
    participantCount: 8 as const,
    bestOf: 1 as const,
    seeding: 'manual' as const,
  },
};

export const PREVIEW_PLAYERS: PreviewPlayer[] = [
  {
    id: 'p1',
    slug: 'lucas-nexus',
    displayName: 'Lucas Ferreira',
    tag: 'Nexus',
    initials: 'LF',
    sport: 'Futebol e-sports',
    bio: 'Armador de posse curta. Fundador da temporada 0 — joga EA FC no x1 desde as primeiras copas amistosas.',
  },
  {
    id: 'p2',
    slug: 'rafael-kite',
    displayName: 'Rafael Almeida',
    tag: 'Kite',
    initials: 'RA',
    sport: 'Futebol e-sports',
    bio: 'Finalização de primeira. Caiu nas quartas desta chave, mas segue no circuito da comunidade.',
  },
  {
    id: 'p3',
    slug: 'bruno-velo',
    displayName: 'Bruno Costa',
    tag: 'Velo',
    initials: 'BC',
    sport: 'Futebol e-sports',
    bio: 'Marca a saída e troca o jogo. Avançou às semis com uma vitória limpa nas quartas.',
  },
  {
    id: 'p4',
    slug: 'diego-shade',
    displayName: 'Diego Santos',
    tag: 'Shade',
    initials: 'DS',
    sport: 'Futebol e-sports',
    bio: 'Primeira copa oficial na Cupperfy. Jogo seguro, poucas aberturas.',
  },
  {
    id: 'p5',
    slug: 'felipe-orbit',
    displayName: 'Felipe Rocha',
    tag: 'Orbit',
    initials: 'FR',
    sport: 'Futebol e-sports',
    bio: 'Controle de ritmo. Quartas ainda em aberto contra Pulse.',
  },
  {
    id: 'p6',
    slug: 'andre-pulse',
    displayName: 'André Lima',
    tag: 'Pulse',
    initials: 'AL',
    sport: 'Futebol e-sports',
    bio: 'Pressão alta e transições. Joga a quarta-feira à noite na chave de baixo.',
  },
  {
    id: 'p7',
    slug: 'thiago-apex',
    displayName: 'Thiago Mendes',
    tag: 'Apex',
    initials: 'TM',
    sport: 'Futebol e-sports',
    bio: 'Um contra um e chute de fora. Enfrenta Drift nas quartas.',
  },
  {
    id: 'p8',
    slug: 'caio-drift',
    displayName: 'Caio Oliveira',
    tag: 'Drift',
    initials: 'CO',
    sport: 'Futebol e-sports',
    bio: 'Corte para dentro e chute de média. Fecha as quartas contra Apex.',
  },
];

export const PREVIEW_MATCHES: PreviewMatch[] = [
  {
    id: 'm1',
    competitionId: PREVIEW_COMPETITION.id,
    round: 1,
    bracketSlot: 0,
    playerAId: 'p1',
    playerBId: 'p2',
    scoreA: 3,
    scoreB: 1,
    winnerPlayerId: 'p1',
    status: 'completed',
    nextMatchId: 'm5',
    scheduledAt: '2026-09-12T21:00:00-03:00',
  },
  {
    id: 'm2',
    competitionId: PREVIEW_COMPETITION.id,
    round: 1,
    bracketSlot: 1,
    playerAId: 'p3',
    playerBId: 'p4',
    scoreA: 2,
    scoreB: 0,
    winnerPlayerId: 'p3',
    status: 'completed',
    nextMatchId: 'm5',
    scheduledAt: '2026-09-12T22:00:00-03:00',
  },
  {
    id: 'm3',
    competitionId: PREVIEW_COMPETITION.id,
    round: 1,
    bracketSlot: 2,
    playerAId: 'p5',
    playerBId: 'p6',
    scoreA: null,
    scoreB: null,
    winnerPlayerId: null,
    status: 'ready',
    nextMatchId: 'm6',
    scheduledAt: '2026-09-16T21:00:00-03:00',
  },
  {
    id: 'm4',
    competitionId: PREVIEW_COMPETITION.id,
    round: 1,
    bracketSlot: 3,
    playerAId: 'p7',
    playerBId: 'p8',
    scoreA: null,
    scoreB: null,
    winnerPlayerId: null,
    status: 'ready',
    nextMatchId: 'm6',
    scheduledAt: '2026-09-16T22:00:00-03:00',
  },
  {
    id: 'm5',
    competitionId: PREVIEW_COMPETITION.id,
    round: 2,
    bracketSlot: 0,
    playerAId: 'p1',
    playerBId: 'p3',
    scoreA: null,
    scoreB: null,
    winnerPlayerId: null,
    status: 'ready',
    nextMatchId: 'm7',
    scheduledAt: '2026-09-19T21:00:00-03:00',
  },
  {
    id: 'm6',
    competitionId: PREVIEW_COMPETITION.id,
    round: 2,
    bracketSlot: 1,
    playerAId: null,
    playerBId: null,
    scoreA: null,
    scoreB: null,
    winnerPlayerId: null,
    status: 'pending',
    nextMatchId: 'm7',
    scheduledAt: '2026-09-19T22:00:00-03:00',
  },
  {
    id: 'm7',
    competitionId: PREVIEW_COMPETITION.id,
    round: 3,
    bracketSlot: 0,
    playerAId: null,
    playerBId: null,
    scoreA: null,
    scoreB: null,
    winnerPlayerId: null,
    status: 'pending',
    nextMatchId: null,
    scheduledAt: '2026-09-21T21:00:00-03:00',
  },
];

export const PREVIEW_CAREER_MATCHES: PreviewCareerMatch[] = [
  {
    id: 'c1',
    competitionName: 'Amistoso Fundadores',
    playerAId: 'p1',
    playerBId: 'p5',
    scoreA: 3,
    scoreB: 2,
    winnerPlayerId: 'p1',
    playedAt: '2026-08-28T21:00:00-03:00',
  },
  {
    id: 'c2',
    competitionName: 'Amistoso Fundadores',
    playerAId: 'p3',
    playerBId: 'p1',
    scoreA: 1,
    scoreB: 3,
    winnerPlayerId: 'p1',
    playedAt: '2026-08-30T20:00:00-03:00',
  },
  {
    id: 'c3',
    competitionName: 'Amistoso Fundadores',
    playerAId: 'p6',
    playerBId: 'p2',
    scoreA: 4,
    scoreB: 2,
    winnerPlayerId: 'p6',
    playedAt: '2026-08-29T21:30:00-03:00',
  },
  {
    id: 'c4',
    competitionName: 'Amistoso Fundadores',
    playerAId: 'p7',
    playerBId: 'p8',
    scoreA: 1,
    scoreB: 0,
    winnerPlayerId: 'p7',
    playedAt: '2026-08-31T19:00:00-03:00',
  },
];

export const PREVIEW_MATCH_STATS: Record<
  string,
  { a: PreviewMatchSideStats; b: PreviewMatchSideStats }
> = {
  m1: {
    a: {
      possession: 58,
      shots: 11,
      shotsOnTarget: 6,
      passes: 142,
      passAccuracy: 86,
      corners: 5,
      fouls: 8,
    },
    b: {
      possession: 42,
      shots: 7,
      shotsOnTarget: 3,
      passes: 118,
      passAccuracy: 79,
      corners: 3,
      fouls: 11,
    },
  },
  m2: {
    a: {
      possession: 54,
      shots: 9,
      shotsOnTarget: 5,
      passes: 131,
      passAccuracy: 84,
      corners: 4,
      fouls: 7,
    },
    b: {
      possession: 46,
      shots: 4,
      shotsOnTarget: 1,
      passes: 109,
      passAccuracy: 77,
      corners: 2,
      fouls: 10,
    },
  },
  c1: {
    a: {
      possession: 52,
      shots: 10,
      shotsOnTarget: 5,
      passes: 128,
      passAccuracy: 83,
      corners: 4,
      fouls: 9,
    },
    b: {
      possession: 48,
      shots: 8,
      shotsOnTarget: 4,
      passes: 121,
      passAccuracy: 81,
      corners: 3,
      fouls: 8,
    },
  },
  c2: {
    a: {
      possession: 47,
      shots: 6,
      shotsOnTarget: 2,
      passes: 115,
      passAccuracy: 80,
      corners: 2,
      fouls: 10,
    },
    b: {
      possession: 53,
      shots: 12,
      shotsOnTarget: 7,
      passes: 139,
      passAccuracy: 87,
      corners: 6,
      fouls: 6,
    },
  },
  c3: {
    a: {
      possession: 61,
      shots: 14,
      shotsOnTarget: 8,
      passes: 151,
      passAccuracy: 85,
      corners: 7,
      fouls: 5,
    },
    b: {
      possession: 39,
      shots: 8,
      shotsOnTarget: 3,
      passes: 102,
      passAccuracy: 74,
      corners: 2,
      fouls: 12,
    },
  },
  c4: {
    a: {
      possession: 51,
      shots: 8,
      shotsOnTarget: 3,
      passes: 124,
      passAccuracy: 82,
      corners: 3,
      fouls: 9,
    },
    b: {
      possession: 49,
      shots: 7,
      shotsOnTarget: 2,
      passes: 119,
      passAccuracy: 80,
      corners: 4,
      fouls: 8,
    },
  },
};

export const PREVIEW_POSTS: PreviewCommunityPost[] = [
  {
    id: 'post-1',
    kind: 'achievement',
    authorId: 'p1',
    body: 'Nexus avançou às semifinais da Copa Cupperfy FC. 3 a 1 sobre Kite, com VOD no ar.',
    createdAt: '2026-09-12T22:40:00-03:00',
  },
  {
    id: 'post-2',
    kind: 'match',
    authorId: 'p3',
    body: 'Velo fecha as quartas com 2 a 0. Semifinal contra Nexus na sexta, 21h.',
    createdAt: '2026-09-12T23:10:00-03:00',
  },
  {
    id: 'post-3',
    kind: 'text',
    authorId: 'p6',
    body: 'Quartas amanhã contra Orbit. Live no YouTube obrigatória — placar só vale com prova.',
    createdAt: '2026-09-15T18:05:00-03:00',
  },
  {
    id: 'post-4',
    kind: 'text',
    authorId: 'p5',
    body: 'Treino de posse feito. Quem vai assistir a chave de baixo?',
    createdAt: '2026-09-15T16:20:00-03:00',
  },
];

export const PREVIEW_SUGGESTED_PLAYER_IDS = ['p1', 'p3', 'p6'] as const;

export const PREVIEW_STANDINGS: PreviewStandingRow[] = [
  {
    position: 1,
    playerId: 'p1',
    played: 6,
    wins: 5,
    draws: 0,
    losses: 1,
    goalsFor: 16,
    goalsAgainst: 7,
    points: 15,
  },
  {
    position: 2,
    playerId: 'p3',
    played: 6,
    wins: 4,
    draws: 1,
    losses: 1,
    goalsFor: 13,
    goalsAgainst: 8,
    points: 13,
  },
  {
    position: 3,
    playerId: 'p5',
    played: 6,
    wins: 3,
    draws: 2,
    losses: 1,
    goalsFor: 11,
    goalsAgainst: 8,
    points: 11,
  },
  {
    position: 4,
    playerId: 'p7',
    played: 6,
    wins: 3,
    draws: 1,
    losses: 2,
    goalsFor: 10,
    goalsAgainst: 9,
    points: 10,
  },
  {
    position: 5,
    playerId: 'p6',
    played: 6,
    wins: 2,
    draws: 2,
    losses: 2,
    goalsFor: 12,
    goalsAgainst: 12,
    points: 8,
  },
  {
    position: 6,
    playerId: 'p8',
    played: 6,
    wins: 2,
    draws: 0,
    losses: 4,
    goalsFor: 8,
    goalsAgainst: 12,
    points: 6,
  },
  {
    position: 7,
    playerId: 'p2',
    played: 6,
    wins: 1,
    draws: 1,
    losses: 4,
    goalsFor: 7,
    goalsAgainst: 14,
    points: 4,
  },
  {
    position: 8,
    playerId: 'p4',
    played: 6,
    wins: 0,
    draws: 1,
    losses: 5,
    goalsFor: 5,
    goalsAgainst: 12,
    points: 1,
  },
];

export const PREVIEW_INDEX_LINKS = [
  {
    href: '/preview/competicao',
    title: 'Copa',
    summary: 'Chave, placar e inscritos da Copa Cupperfy FC.',
    phase2: false,
  },
  {
    href: '/preview/jogador/lucas-nexus',
    title: 'Perfil',
    summary: 'Página pública de Nexus — histórico e saldo de gols.',
    phase2: false,
  },
  {
    href: '/preview/agenda',
    title: 'Agenda',
    summary: 'Próximos confrontos, em ordem de horário.',
    phase2: false,
  },
  {
    href: '/preview/comunidade',
    title: 'Comunidade',
    summary: 'Feed, conquistas e quem está por perto.',
    phase2: true,
  },
  {
    href: '/preview/classificacao',
    title: 'Classificação',
    summary: 'Circuito com pontos corridos.',
    phase2: true,
  },
] as const;

const playerById = new Map(PREVIEW_PLAYERS.map((player) => [player.id, player]));
const playerBySlug = new Map(PREVIEW_PLAYERS.map((player) => [player.slug, player]));
const matchById = new Map(PREVIEW_MATCHES.map((match) => [match.id, match]));

export function getPreviewPlayer(id: string | null): PreviewPlayer | undefined {
  if (!id) return undefined;
  return playerById.get(id);
}

export function getPreviewPlayerBySlug(slug: string): PreviewPlayer | undefined {
  return playerBySlug.get(slug);
}

export function getPreviewMatch(id: string | null): PreviewMatch | undefined {
  if (!id) return undefined;
  return matchById.get(id);
}

export function getRoundLabel(round: number): string {
  const found = PREVIEW_ROUNDS.find((item) => item.round === round);
  return found?.label ?? `Round ${round}`;
}

export function getMatchTitle(match: PreviewMatch): string {
  if (match.round === 0) return 'Amistoso';
  if (match.round === 3) return 'Final';
  if (match.round === 2) return `Semifinal ${match.bracketSlot + 1}`;
  return `Quartas ${match.bracketSlot + 1}`;
}

export function getMatchesByRound() {
  return PREVIEW_ROUNDS.map((item) => ({
    ...item,
    matches: PREVIEW_MATCHES.filter((match) => match.round === item.round).sort(
      (a, b) => a.bracketSlot - b.bracketSlot,
    ),
  }));
}

export function getMatchStats(matchId: string) {
  return PREVIEW_MATCH_STATS[matchId];
}

export function careerToPreviewMatch(match: PreviewCareerMatch): PreviewMatch {
  return {
    id: match.id,
    competitionId: 'career',
    round: 0,
    bracketSlot: 0,
    playerAId: match.playerAId,
    playerBId: match.playerBId,
    scoreA: match.scoreA,
    scoreB: match.scoreB,
    winnerPlayerId: match.winnerPlayerId,
    status: 'completed',
    nextMatchId: null,
    scheduledAt: match.playedAt,
  };
}

export function getUpcomingMatches(): PreviewMatch[] {
  return PREVIEW_MATCHES.filter((match) => match.status !== 'completed').sort((a, b) =>
    a.scheduledAt.localeCompare(b.scheduledAt),
  );
}

export function getPlayerBracketMatches(playerId: string): PreviewMatch[] {
  return PREVIEW_MATCHES.filter(
    (match) => match.playerAId === playerId || match.playerBId === playerId,
  ).sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
}

export function getPlayerCareerMatches(playerId: string): PreviewCareerMatch[] {
  return PREVIEW_CAREER_MATCHES.filter(
    (match) => match.playerAId === playerId || match.playerBId === playerId,
  ).sort((a, b) => b.playedAt.localeCompare(a.playedAt));
}

export type PreviewPlayerStats = {
  played: number;
  wins: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
};

export function getPlayerStats(playerId: string): PreviewPlayerStats {
  const stats: PreviewPlayerStats = {
    played: 0,
    wins: 0,
    losses: 0,
    goalsFor: 0,
    goalsAgainst: 0,
  };

  PREVIEW_MATCHES.forEach((match) => {
    if (match.status !== 'completed') return;
    if (match.playerAId !== playerId && match.playerBId !== playerId) return;
    const isA = match.playerAId === playerId;
    const scored = isA ? match.scoreA : match.scoreB;
    const conceded = isA ? match.scoreB : match.scoreA;
    stats.played += 1;
    stats.goalsFor += scored ?? 0;
    stats.goalsAgainst += conceded ?? 0;
    if (match.winnerPlayerId === playerId) stats.wins += 1;
    else stats.losses += 1;
  });

  PREVIEW_CAREER_MATCHES.forEach((match) => {
    if (match.playerAId !== playerId && match.playerBId !== playerId) return;
    const isA = match.playerAId === playerId;
    stats.played += 1;
    stats.goalsFor += isA ? match.scoreA : match.scoreB;
    stats.goalsAgainst += isA ? match.scoreB : match.scoreA;
    if (match.winnerPlayerId === playerId) stats.wins += 1;
    else stats.losses += 1;
  });

  return stats;
}
