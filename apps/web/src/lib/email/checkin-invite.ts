import { FOUNDER_NAME } from '@/lib/site-config';

export function buildCheckinInviteEmail(input: {
  name: string | null;
  checkinUrl: string;
  iconUrl?: string;
}) {
  const greeting = input.name?.trim() ? `Olá, ${input.name.trim()}!` : 'Olá!';
  const subject = 'Cupperfy · convite pessoal · Copa EA FC';

  const text = `${greeting}

Este é o seu convite pessoal para a Copa Cupperfy FC (EA FC).
Neste lançamento o campeonato inteiro acontece em um único dia. Confirme em quais janelas você pode jogar o x1:

${input.checkinUrl}

O link é exclusivo e já identifica você.
A final vai ao vivo no YouTube da Cupperfy, com narração de ${FOUNDER_NAME}.
Se não esperava este e-mail, ignore.

— Equipe Cupperfy
`;

  const iconImg = input.iconUrl
    ? `<img src="${input.iconUrl}" width="22" height="20" alt="" style="vertical-align:middle;margin-right:8px;" />`
    : '';

  const html = `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background:#111;color:#f5f5f5;font-family:Manrope,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#111;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" style="max-width:520px;background:#1a1512;border:1px solid rgba(255,255,255,0.12);border-radius:20px;padding:28px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#f97316;font-weight:700;">${iconImg}Cupperfy · convite pessoal</p>
                <h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;color:#fff;">Copa Cupperfy FC · EA FC</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.5;color:rgba(255,255,255,0.78);">${greeting}</p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.5;color:rgba(255,255,255,0.78);">
                  Neste lançamento o campeonato inteiro acontece em um único dia. Este link é pessoal: escolha as janelas em que você consegue jogar o x1. A final vai ao vivo no YouTube da Cupperfy, com narração de ${FOUNDER_NAME}.
                </p>
                <p style="margin:0 0 28px;">
                  <a href="${input.checkinUrl}" style="display:inline-block;background:#f97316;color:#111;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:12px;">
                    Abrir check-in
                  </a>
                </p>
                <p style="margin:0;font-size:12px;line-height:1.5;color:rgba(255,255,255,0.45);word-break:break-all;">
                  Se o botão não funcionar: ${input.checkinUrl}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, text, html };
}
