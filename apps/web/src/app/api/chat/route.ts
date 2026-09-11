import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  smoothStream,
  streamText,
  type UIMessage,
} from 'ai';

import { findCannedAnswer } from '@/lib/chat/canned-faq';
import { buildSupportSystemPrompt, getPublicContactLinks } from '@/lib/chat/knowledge';

export const maxDuration = 30;

const MAX_MESSAGES = 24;

function lastUserText(messages: UIMessage[]): string {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (message.role !== 'user') continue;
    return message.parts
      .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
      .map((part) => part.text)
      .join('')
      .trim();
  }
  return '';
}

function cannedStreamResponse(answer: string) {
  const textId = generateId();
  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      writer.write({ type: 'start' });
      writer.write({ type: 'text-start', id: textId });

      // Buffer leve: entrega em pedaços curtos para o mesmo efeito “digitando”.
      const chunks = answer.match(/\S+\s*/g) ?? [answer];
      for (const chunk of chunks) {
        writer.write({ type: 'text-delta', id: textId, delta: chunk });
      }

      writer.write({ type: 'text-end', id: textId });
      writer.write({ type: 'finish' });
    },
  });

  return createUIMessageStreamResponse({ stream });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { messages?: UIMessage[] };
  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];

  if (messages.length === 0) {
    return Response.json({ error: 'Mensagens inválidas.' }, { status: 400 });
  }

  const contacts = getPublicContactLinks();
  const question = lastUserText(messages);
  const canned = question ? findCannedAnswer(question, contacts) : null;

  if (canned) {
    return cannedStreamResponse(canned);
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return Response.json(
      { error: 'Chat indisponível: configure GOOGLE_GENERATIVE_AI_API_KEY.' },
      { status: 503 },
    );
  }

  const result = streamText({
    model: google('gemini-3.5-flash-lite'),
    system: buildSupportSystemPrompt(contacts),
    messages: await convertToModelMessages(messages),
    temperature: 0.4,
    experimental_transform: smoothStream({
      delayInMs: 16,
      chunking: 'word',
    }),
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      console.error('chat gemini error', error);
      return error instanceof Error ? error.message : 'Falha ao falar com o assistente.';
    },
  });
}
