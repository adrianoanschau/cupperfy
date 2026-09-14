'use client';

import { useChat } from '@ai-sdk/react';
import { Send, X } from 'lucide-react';
import {
  Component,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';

import { BrandIcon, BrandMark } from '@/components/brand-mark';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SUGGESTED_QUESTIONS } from '@/lib/chat/canned-faq';
import { getSupportContacts } from '@/lib/support/config';
import { cn } from '@/lib/utils';

class ChatPanelErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="cf-glass-strong text-muted-foreground max-w-xs rounded-2xl px-4 py-3 text-sm">
          Não foi possível carregar o assistente. Use WhatsApp, Telegram ou o e-mail no rodapé.
        </p>
      );
    }
    return this.props.children;
  }
}

function contactLinks() {
  const contacts = getSupportContacts();
  return {
    whatsapp: contacts.whatsappUrl,
    telegram: contacts.telegramUrl,
    email: contacts.email,
  };
}

function messageText(parts: { type: string; text?: string }[]): string {
  return parts
    .filter((part) => part.type === 'text' && typeof part.text === 'string')
    .map((part) => part.text)
    .join('');
}

function StatusDots({ label }: { label: string }) {
  return (
    <div
      className="bg-muted/70 text-muted-foreground inline-flex max-w-[85%] items-center gap-2 rounded-2xl px-3 py-2 text-sm"
      role="status"
      aria-live="polite"
    >
      <span key={label} className="cf-chat-status-label">
        {label}
      </span>
      <span className="cf-chat-dots inline-flex gap-1" aria-hidden>
        <span />
        <span />
        <span />
      </span>
    </div>
  );
}

const THINKING_PHRASES = [
  'Pensando',
  'Consultando documentos',
  'Verificando o alfa',
  'Buscando no FAQ',
  'Montando a resposta',
  'Checando o torneio x1',
] as const;

const TYPING_PHRASES = ['Digitando', 'Escrevendo a resposta'] as const;

function ChatPanel({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const contacts = contactLinks();

  const { messages, sendMessage, status, error, clearError } = useChat();

  const busy = status === 'submitted' || status === 'streaming';
  const thinking = status === 'submitted';
  const typing = status === 'streaming';

  const lastAssistant = [...messages].reverse().find((message) => message.role === 'assistant');
  const lastAssistantText = lastAssistant ? messageText(lastAssistant.parts) : '';
  const showThinkingBubble = thinking || (typing && lastAssistantText.length === 0);

  const statusPhrases = thinking ? THINKING_PHRASES : TYPING_PHRASES;
  const statusLabel = statusPhrases[phraseIndex % statusPhrases.length];

  useEffect(() => {
    if (!busy) return undefined;

    const intervalMs = thinking ? 1600 : 2200;
    const id = window.setInterval(() => {
      setPhraseIndex((current) => current + 1);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [busy, thinking]);

  useEffect(() => {
    const node = listRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, status, lastAssistantText, statusLabel]);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    clearError();
    setInput('');
    setPhraseIndex(0);
    await sendMessage({ text });
  }

  async function sendSuggestion(text: string) {
    if (busy) return;
    clearError();
    setInput('');
    setPhraseIndex(0);
    await sendMessage({ text });
  }

  return (
    <section
      aria-label="Assistente Cupperfy"
      className="cf-glass-strong flex h-[min(32rem,calc(100svh-6rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl shadow-lg"
    >
      <header className="border-border flex items-start justify-between gap-3 border-b px-4 py-3">
        <div>
          <BrandMark className="text-foreground text-sm font-semibold" />
          <p className="text-muted-foreground mt-0.5 text-xs">
            {busy ? `${statusLabel}…` : 'Assistente · alfa · FAQ'}
          </p>
        </div>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Fechar chat"
          onClick={onClose}
        >
          <X />
        </Button>
      </header>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {messages.length === 0 && !busy ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Pergunte sobre o alfa, o que é a Cupperfy ou como funciona o torneio x1. Ou escolha
              uma pergunta:
            </p>
            <ul className="space-y-2">
              {SUGGESTED_QUESTIONS.map((question) => (
                <li key={question}>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 text-left text-sm underline-offset-4 hover:underline"
                    onClick={() => {
                      void sendSuggestion(question);
                    }}
                  >
                    {question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {messages.map((message) => {
          const text = messageText(message.parts);
          if (!text) return null;
          const isUser = message.role === 'user';
          const isStreamingAssistant = typing && !isUser && message.id === lastAssistant?.id;
          return (
            <div key={message.id} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
              <p
                className={cn(
                  'max-w-[85%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap',
                  isUser ? 'bg-primary text-primary-foreground' : 'bg-muted/70 text-foreground',
                )}
              >
                {text}
                {isStreamingAssistant ? (
                  <span className="cf-chat-caret text-primary ml-0.5" aria-hidden>
                    ▍
                  </span>
                ) : null}
              </p>
            </div>
          );
        })}
        {showThinkingBubble ? (
          <div className="flex justify-start">
            <StatusDots label={statusLabel} />
          </div>
        ) : null}
        {error ? (
          <p className="text-destructive text-sm" role="alert">
            {error.message || 'Não foi possível responder agora. Tente de novo.'}
          </p>
        ) : null}
      </div>

      <div className="border-border space-y-3 border-t px-4 py-3">
        {messages.length > 0 && !busy ? (
          <div className="flex flex-col gap-1.5">
            <p className="text-muted-foreground text-xs">Perguntas rápidas</p>
            <ul className="flex flex-col gap-1">
              {SUGGESTED_QUESTIONS.slice(0, 3).map((question) => (
                <li key={question}>
                  <button
                    type="button"
                    className="text-primary hover:text-primary/80 text-left text-xs underline-offset-2 hover:underline"
                    onClick={() => {
                      void sendSuggestion(question);
                    }}
                  >
                    {question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href={contacts.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={contacts.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          </Button>
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={busy ? 'Aguarde a resposta…' : 'Sua dúvida…'}
            disabled={busy}
            aria-label="Mensagem para o assistente"
            className="bg-background/60"
          />
          <Button type="submit" size="icon" disabled={busy || !input.trim()} aria-label="Enviar">
            <Send />
          </Button>
        </form>
      </div>
    </section>
  );
}

export function SiteChat() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  function close() {
    detailsRef.current?.removeAttribute('open');
  }

  return (
    <details
      ref={detailsRef}
      className="group/chat fixed right-4 bottom-4 z-[70] flex flex-col items-end gap-3 md:right-6 md:bottom-6"
    >
      <div className="hidden group-open/chat:block">
        <ChatPanelErrorBoundary>
          <ChatPanel onClose={close} />
        </ChatPanelErrorBoundary>
      </div>
      <summary
        className={cn(
          buttonVariants({ size: 'lg' }),
          'relative z-10 cursor-pointer list-none rounded-full shadow-md marker:content-none [&::-webkit-details-marker]:hidden',
        )}
      >
        <BrandIcon className="h-5 w-auto" />
        <span className="group-open/chat:hidden">Dúvidas</span>
        <span className="hidden group-open/chat:inline">Fechar</span>
      </summary>
    </details>
  );
}
