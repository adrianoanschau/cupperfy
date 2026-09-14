import nodemailer from 'nodemailer';

import { OFFICIAL_EMAIL } from '@/lib/brand';

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type SendEmailResult = { ok: true; id?: string } | { ok: false; error: string };

const DEFAULT_REPLY_TO = OFFICIAL_EMAIL;

function getFromAddress(): string | null {
  return process.env.EMAIL_FROM?.trim() || null;
}

function getReplyToAddress(): string {
  return (
    process.env.EMAIL_REPLY_TO?.trim() ||
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() ||
    DEFAULT_REPLY_TO
  );
}

/** SMTP local (Mailpit) ou qualquer SMTP — prioridade sobre Resend. */
async function sendViaSmtp(input: SendEmailInput): Promise<SendEmailResult | null> {
  const host = process.env.SMTP_HOST?.trim();
  if (!host) return null;

  const from = getFromAddress() || 'Cupperfy <noreply@cupperfy.local>';
  const replyTo = getReplyToAddress();
  const port = Number(process.env.SMTP_PORT || '54325');
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user ? { user, pass: pass || '' } : undefined,
      tls: { rejectUnauthorized: false },
    });

    const info = await transport.sendMail({
      from,
      replyTo,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html,
    });

    return { ok: true, id: info.messageId };
  } catch (error) {
    console.error('smtp send failed', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Falha no envio SMTP.',
    };
  }
}

async function sendViaResend(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = getFromAddress();
  const replyTo = getReplyToAddress();

  if (!apiKey) {
    return {
      ok: false,
      error: 'Configure SMTP_HOST (Mailpit local) ou RESEND_API_KEY para enviar e-mails.',
    };
  }

  if (!from) {
    return {
      ok: false,
      error: 'Configure EMAIL_FROM (ex.: Cupperfy <contato@cupperfy.com>).',
    };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      reply_to: replyTo,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  const body = (await response.json().catch(() => null)) as {
    id?: string;
    message?: string;
    error?: { message?: string };
  } | null;

  if (!response.ok) {
    const message =
      body?.error?.message || body?.message || `Falha no envio (HTTP ${response.status}).`;
    console.error('resend send failed', response.status, body);
    return { ok: false, error: message };
  }

  return { ok: true, id: body?.id };
}

/**
 * Local: SMTP → Mailpit (`SMTP_HOST=127.0.0.1`, `SMTP_PORT=54325`).
 * Produção: Resend (`RESEND_API_KEY`).
 * Reply-To: `EMAIL_REPLY_TO` → `NEXT_PUBLIC_SUPPORT_EMAIL` → contato@cupperfy.com
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const smtpResult = await sendViaSmtp(input);
  if (smtpResult) return smtpResult;
  return sendViaResend(input);
}
