import { FOUNDER_NAME } from '@/lib/site-config';

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
      'A Cupperfy é uma comunidade de competição — copas com resultado auditável (live + VOD) e um perfil que permanece. A visão inclui rede social e outros recursos; na temporada 0 o foco é abrir as copas e o lugar de cada um. O primeiro campeonato é a Copa Cupperfy FC, no EA FC, todo em um único dia. Quem se cadastra entra na lista de interesse e espera um convite pessoal.',
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
      'Os campeonatos acontecem um de cada vez. O primeiro é a Copa Cupperfy FC (EA FC): eliminação simples, inscrição individual (sem time). O padrão é chave de 8 jogadores (também 4 ou 16 se precisar). Melhor de 3 — uma partida atrás da outra até alguém vencer duas. Seeding manual. Neste lançamento o campeonato inteiro acontece em um único dia; a data será discutida e comunicada com antecedência. A final vai no canal da Cupperfy. Esses números podem ser levemente ajustados conforme a lista.',
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
      `Sim. Toda partida precisa ser transmitida ao vivo no YouTube e permanecer salva. A final de cada campeonato vai no canal da Cupperfy, narrada por ${FOUNDER_NAME}. O placar oficial continua na Cupperfy. O passo a passo da live entra no convite e na área logada.`,
  },
  {
    id: 'how-join-alpha',
    question: 'Como entro na lista de interesse?',
    aliases: [
      'como participar do alfa',
      'como entro no alfa',
      'quero participar do alfa',
      'lista de interesse',
      'lista de espera',
      'como ser jogador fundador',
      'leva fundadora',
    ],
    keywords: ['alfa', 'particip', 'leva', 'fundador', 'temporada', 'lista', 'espera', 'convite'],
    answer: () =>
      'Entre na lista de interesse na seção da página (#alfa), com seu e-mail. Você fica na lista de espera e recebe um convite pessoal — um link exclusivo para confirmar presença no campeonato de EA FC. A data será comunicada com antecedência. Sem compromisso.',
  },
  {
    id: 'need-team',
    question: 'Preciso de um time para jogar?',
    aliases: ['preciso de time', 'precisa de equipe', 'e em time', 'posso jogar sozinho'],
    keywords: ['time', 'equipe', 'sozinho', 'individual'],
    answer: () =>
      'Não. O lançamento é x1 individual de EA FC — você se inscreve sozinho, sem precisar de equipe. A Copa Cupperfy eFootball entra depois, em sequência.',
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
      'O primeiro campeonato é a Copa Cupperfy FC, no EA FC. Os campeonatos acontecem um de cada vez, cada um em um único dia neste lançamento. A Copa Cupperfy eFootball entra depois, em sequência — não ao mesmo tempo.',
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
      'A Copa Cupperfy FC ainda não fecha se será no EA FC 26 ou no 27 — isso depende do interesse de quem entrar na lista. Se houver demanda e capacidade, dá para abrir os dois em sequência, nunca ao mesmo tempo. Não está garantido. Entre na lista; avisamos a edição no convite pessoal.',
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
    question: 'A lista de interesse é paga?',
    aliases: ['e pago', 'tem custo', 'quanto custa', 'e gratis', 'o alfa e pago'],
    keywords: ['pago', 'custa', 'gratis', 'preco'],
    answer: () =>
      'A lista de interesse não cobra inscrição. O acesso é por convite pessoal. Se houver qualquer custo no futuro, avisamos com clareza — não inventamos taxa aqui.',
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
