export type ContactLinks = {
  whatsappUrl: string;
  telegramUrl: string;
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
    id: 'what-is-leaguefy',
    question: 'O que é a Leaguefy?',
    aliases: ['o que e a leaguefy', 'o que e leaguefy', 'me fala da leaguefy', 'sobre a leaguefy'],
    keywords: ['o que e', 'leaguefy', 'plataforma'],
    answer: () =>
      'A Leaguefy é uma plataforma para criar e organizar competições — inscrição, chaveamento, resultados e perfil de jogador no mesmo lugar. O lançamento começa pelo alfa de um torneio x1 de futebol e-sports. Rede social e transferências ficam para depois.',
  },
  {
    id: 'how-x1-works',
    question: 'Como funciona o torneio x1?',
    aliases: [
      'como funciona o torneio',
      'como funciona o x1',
      'como e o chaveamento',
      'formato do torneio',
    ],
    keywords: ['torneio', 'x1', 'chave', 'eliminacao'],
    answer: () =>
      'O torneio de lançamento é x1 (jogador vs jogador) em futebol e-sports, com eliminação simples. A inscrição é individual — sem time. A chave (em geral ~8 jogadores no primeiro evento) avança até a final com placares lançados na plataforma.',
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
      'Entre na lista de interesse na seção Alfa da página (#alfa), com seu e-mail. Liberamos acesso em ondas. Depois você cria conta, monta o perfil de jogador, se inscreve no x1 e nos dá feedback. Sem compromisso na lista.',
  },
  {
    id: 'need-team',
    question: 'Preciso de um time para jogar?',
    aliases: ['preciso de time', 'precisa de equipe', 'e em time', 'posso jogar sozinho'],
    keywords: ['time', 'equipe', 'sozinho', 'individual'],
    answer: () =>
      'Não. O alfa e o torneio de lançamento são x1 individual — você se inscreve sozinho, sem precisar de equipe.',
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
    ],
    keywords: ['falar', 'humano', 'whatsapp', 'telegram', 'suporte', 'contato'],
    answer: (contacts) =>
      `Pode falar direto com a gente:\n• WhatsApp: ${contacts.whatsappUrl}\n• Telegram: ${contacts.telegramUrl}\nConta o contexto da dúvida que respondemos por lá.`,
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
  ['what-is-leaguefy', 'how-x1-works', 'how-join-alpha', 'need-team', 'talk-to-human'].includes(
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
