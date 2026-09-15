export type ContactLinks = {
  whatsappUrl: string;
  telegramUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  email: string;
};

export type CannedFaqEntry = {
  id: string;
  question: string;
  aliases: string[];
  keywords: string[];
  answer: (contacts: ContactLinks) => string;
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const CANNED_FAQ: CannedFaqEntry[] = [
  {
    id: 'what-is-cupperfy',
    question: 'O que é a Cupperfy?',
    aliases: [
      'o que e a cupperfy',
      'o que e cupperfy',
      'me fala da cupperfy',
      'sobre a cupperfy',
      // Nome antigo: quem ainda pergunta "Leaguefy" cai na mesma resposta.
      'o que e a leaguefy',
      'o que e leaguefy',
    ],
    keywords: ['o que e', 'cupperfy', 'plataforma'],
    answer: () =>
      'A Cupperfy é uma plataforma para criar e organizar competições — inscrição, chaveamento, resultados e perfil de jogador no mesmo lugar. O lançamento começa pelo alfa de dois torneios x1 de futebol e-sports: EA FC e eFootball. Rede social e transferências ficam para depois.',
  },
  {
    id: 'how-x1-works',
    question: 'Como funcionam os torneios x1?',
    aliases: [
      'como funciona o torneio',
      'como funcionam os torneios',
      'como funciona o x1',
      'como e o chaveamento',
      'formato do torneio',
    ],
    keywords: ['torneio', 'x1', 'chave', 'eliminacao'],
    answer: () =>
      'São dois x1 de futebol e-sports: um de EA FC e outro de eFootball. Eliminação simples, inscrição individual (sem time). O padrão é chave de 8 jogadores (também 4 ou 16 se precisar). Melhor de 1, seeding manual. Esses números podem ser levemente ajustados conforme a lista e a disponibilidade dos interessados.',
  },
  {
    id: 'how-join-alpha',
    question: 'Como participo do alfa?',
    aliases: [
      'como participar do alfa',
      'como entro no alfa',
      'quero participar do alfa',
      'lista de interesse',
    ],
    keywords: ['alfa', 'particip', 'lista', 'interesse', 'vaga'],
    answer: () =>
      'Entre na lista de interesse na seção Alfa da página (#alfa), com seu e-mail. Liberamos acesso em ondas. Depois você cria conta, monta o perfil de jogador, se inscreve no x1 de EA FC e/ou no de eFootball e nos dá feedback. Sem compromisso na lista.',
  },
  {
    id: 'need-team',
    question: 'Preciso de um time para jogar?',
    aliases: ['preciso de time', 'precisa de equipe', 'e em time', 'posso jogar sozinho'],
    keywords: ['time', 'equipe', 'sozinho', 'individual'],
    answer: () =>
      'Não. O alfa e os torneios de lançamento são x1 individual — você se inscreve sozinho no EA FC, no eFootball, ou nos dois, sem precisar de equipe.',
  },
  {
    id: 'which-games',
    question: 'Quais jogos entram no alfa?',
    aliases: [
      'quais jogos',
      'qual jogo',
      'ea fc',
      'fifa',
      'efootball',
      'pes',
      'e ea fc ou efootball',
    ],
    keywords: ['jogo', 'jogos', 'ea', 'fifa', 'efootball', 'pes'],
    answer: () =>
      'O alfa abre com dois torneios x1 de futebol e-sports: um de EA FC e outro de eFootball. Você pode entrar em um deles ou nos dois.',
  },
  {
    id: 'talk-to-human',
    question: 'Quero falar com alguém do time',
    aliases: [
      'falar com humano',
      'falar com o time',
      'atendimento',
      'whatsapp',
      'telegram',
      'suporte',
      'email',
      'e-mail',
    ],
    keywords: ['falar', 'humano', 'whatsapp', 'telegram', 'suporte', 'contato', 'email'],
    answer: (contacts) =>
      `Pode falar direto com a gente:\n• WhatsApp: ${contacts.whatsappUrl}\n• Telegram: ${contacts.telegramUrl}\n• E-mail: ${contacts.email}\nConta o contexto da dúvida que respondemos por lá.`,
  },
  {
    id: 'social-networks',
    question: 'Quais são as redes da Cupperfy?',
    aliases: [
      'instagram',
      'youtube',
      'redes sociais',
      'rede social',
      'tem instagram',
      'tem youtube',
      'canal no youtube',
    ],
    keywords: ['instagram', 'youtube', 'rede', 'redes', 'social'],
    answer: (contacts) =>
      `Redes oficiais:\n• Instagram: ${contacts.instagramUrl} (@cupperfy.oficial)\n• YouTube: ${contacts.youtubeUrl} (@Cupperfy)\nPara dúvidas rápidas, WhatsApp e Telegram também estão no chat.`,
  },
  {
    id: 'is-paid',
    question: 'O alfa é pago?',
    aliases: ['e pago', 'tem custo', 'quanto custa', 'e gratis'],
    keywords: ['pago', 'custa', 'gratis', 'preco'],
    answer: () =>
      'A lista de interesse do alfa não cobra inscrição. O acesso é por convite em ondas. Se houver qualquer custo no futuro, avisamos com clareza — não inventamos taxa aqui.',
  },
];

export const SUGGESTED_QUESTIONS = CANNED_FAQ.filter((entry) =>
  ['what-is-cupperfy', 'how-x1-works', 'which-games', 'how-join-alpha', 'talk-to-human'].includes(
    entry.id,
  ),
).map((entry) => entry.question);

export function findCannedAnswer(question: string, contacts: ContactLinks): string | null {
  const normalized = normalize(question);
  if (!normalized) return null;

  for (const entry of CANNED_FAQ) {
    const candidates = [entry.question, ...entry.aliases].map(normalize);
    if (candidates.includes(normalized)) {
      return entry.answer(contacts);
    }
  }

  // Match por palavras-chave quando a pergunta é curta/objetiva.
  const words = new Set(normalized.split(' '));
  let best: { entry: CannedFaqEntry; score: number } | null = null;

  for (const entry of CANNED_FAQ) {
    const score = entry.keywords.reduce(
      (total, keyword) => total + (normalized.includes(keyword) || words.has(keyword) ? 1 : 0),
      0,
    );
    if (score >= 2 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }

  return best ? best.entry.answer(contacts) : null;
}
