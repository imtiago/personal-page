export function whatsappUrl(phoneDigits: string, message: string): string {
  if (!/^\d{10,}$/.test(phoneDigits)) throw new Error(`Número de WhatsApp inválido: ${phoneDigits}`);
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
