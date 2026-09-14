import { OFFICIAL_EMAIL } from '@/lib/brand';

export type SupportContacts = {
  whatsappUrl: string;
  telegramUrl: string;
  email: string;
};

export type PixConfig = {
  /** Payload EMV / “copia e cola” do PIX estático. */
  payload: string | null;
  /** Chave legível (e-mail, telefone, aleatória) — opcional, só display. */
  keyLabel: string | null;
  beneficiary: string;
};

export function getSupportContacts(): SupportContacts {
  return {
    whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/adrianoanschau',
    telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL ?? 'https://t.me/adrianoanschau',
    email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || OFFICIAL_EMAIL,
  };
}

export function getPixConfig(): PixConfig {
  const payload = process.env.NEXT_PUBLIC_PIX_PAYLOAD?.trim() || null;
  const keyLabel = process.env.NEXT_PUBLIC_PIX_KEY_LABEL?.trim() || null;
  const beneficiary =
    process.env.NEXT_PUBLIC_PIX_BENEFICIARY?.trim() || 'Cupperfy / Adriano Anschau';

  return { payload, keyLabel, beneficiary };
}
