import QRCode from 'qrcode';

/** Gera data URL PNG do QR a partir do payload PIX (copia e cola). */
export async function createPixQrDataUrl(payload: string): Promise<string> {
  return QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 2,
    width: 320,
    color: {
      dark: '#1a120c',
      light: '#ffffff',
    },
  });
}
