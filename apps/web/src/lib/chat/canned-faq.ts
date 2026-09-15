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
      'A Cupperfy é uma comunidade de competição — copas com resultado auditável (live + VOD) e um perfil que permanece. A visão inclui rede social e outros recursos; na temporada 0 o foco é abrir as copas e o lugar de cada um. Começa com a Copa Cupperfy FC (EA FC) e a Copa Cupperfy eFootball. Quem entra agora é da leva fundadora.',
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
      'São dois x1 de futebol e-sports: a Copa Cupperfy FC (EA FC) e a Copa Cupperfy eFootball. Eliminação simples, inscrição individual (sem time). O padrão é chave de 8 jogadores (também 4 ou 16 se precisar). Melhor de 1, seeding manual. Toda partida precisa ir ao vivo no YouTube e ficar salva — o resultado fica provado, não só registrado. Esses números podem ser levemente ajustados conforme a leva fundadora.',
  },
  {
    id: 'youtube-stream',
    question: 'As partidas precisam ir no YouTube?',
    aliases: [
      'preciso transmitir no youtube',
      'tem que transmitir no youtube',
      'as partidas sao transmitidas',
      'live no youtube',
      'vod da partida',
      'como conferem as regras',
    ],
    keywords: ['transmit', 'transmissao', 'live', 'vod', 'partida'],
    answer: () =>
      'Sim. Toda partida precisa ser transmitida ao vivo no YouTube e permanecer salva. Assim a organização confere se as regras foram cumpridas e, se surgir dúvida depois, o vídeo é a referência. O placar oficial continua na Cupperfy. O passo a passo da live entra no convite e na área logada.',
  },
  {
    id: 'how-join-alpha',
    question: 'Como entro na leva fundadora?',
    aliases: [
      'como participar do alfa',
      'como entro no alfa',
      'quero participar do alfa',
      'lista de interesse',
      'lista de espera',
      'como ser jogador fundador',
      'leva fundadora',
    ],
    keywords: ['alfa', 'particip', 'leva', 'fundador', 'temporada'],
    answer: () =>
      'Entre na leva fundadora na seção da página (#alfa), com seu e-mail. Você recebe o convite para criar conta, montar o perfil de jogador e se inscrever na Copa Cupperfy FC e/ou na de eFootball. Sem compromisso. Quem entra agora carrega o selo de jogador fundador — temporada 0.',
  },
  {
    id: 'need-team',
    question: 'Preciso de um time para jogar?',
    aliases: ['preciso de time', 'precisa de equipe', 'e em time', 'posso jogar sozinho'],
    keywords: ['time', 'equipe', 'sozinho', 'individual'],
    answer: () =>
      'Não. As copas da temporada 0 são x1 individual — você se inscreve sozinho no EA FC, no eFootball, ou nos dois, sem precisar de equipe.',
  },
  {
    id: 'which-games',
    question: 'Quais jogos entram na temporada 0?',
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
      'A temporada 0 abre com dois x1 de futebol e-sports: a Copa Cupperfy FC (EA FC) e a Copa Cupperfy eFootball. Você pode entrar em um deles ou nos dois.',
  },
  {
    id: 'eafc-edition',
    question: 'A Copa Cupperfy FC é no EA FC 26 ou no 27?',
    aliases: [
      'ea fc 26 ou 27',
      'e o 26 ou o 27',
      'vai ser o 26 ou o 27',
      'qual versao do ea fc',
      'qual edicao do ea fc',
      'vai ter ea fc 26 e 27',
      'vai ter os dois ea fc',
      'fifa 26 ou 27',
      'fc 26 ou fc 27',
    ],
    keywords: ['26', '27', 'versao', 'edicao'],
    answer: () =>
      'A Copa Cupperfy FC ainda não fecha se será no EA FC 26 ou no 27 — isso depende do interesse de quem entrar na leva fundadora. Se houver demanda e capacidade, dá para abrir os dois, cada um na sua chave. Não está garantido. Entre na leva; avisamos a edição quando o convite sair.',
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
    question: 'A leva fundadora é paga?',
    aliases: ['e pago', 'tem custo', 'quanto custa', 'e gratis', 'o alfa e pago'],
    keywords: ['pago', 'custa', 'gratis', 'preco'],
    answer: () =>
      'A leva fundadora não cobra inscrição. O acesso é por convite. Se houver qualquer custo no futuro, avisamos com clareza — não inventamos taxa aqui.',
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
