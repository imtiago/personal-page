import type { ProcessStep } from './schema';

export const processData: ProcessStep[] = [
  {
    title: { pt: 'Diagnóstico', en: 'Discovery', es: 'Diagnóstico' },
    body: {
      pt: 'Entendo o processo de campo e os requisitos do negócio.',
      en: 'I map the field process and the business requirements.',
      es: 'Entiendo el proceso de campo y los requisitos del negocio.',
    },
  },
  {
    title: { pt: 'Configuração & regras', en: 'Configuration & rules', es: 'Configuración y reglas' },
    body: {
      pt: 'Configuro a solução e desenvolvo as regras de negócio.',
      en: 'I configure the solution and build the business rules.',
      es: 'Configuro la solución y desarrollo las reglas de negocio.',
    },
  },
  {
    title: { pt: 'Testes & validação', en: 'Testing & validation', es: 'Pruebas y validación' },
    body: {
      pt: 'Testes integrados, documentados e validados com o cliente.',
      en: 'Integrated, documented tests validated with the client.',
      es: 'Pruebas integradas, documentadas y validadas con el cliente.',
    },
  },
  {
    title: { pt: 'Go-live & suporte', en: 'Go-live & support', es: 'Go-live y soporte' },
    body: {
      pt: 'Entrada em produção, manuais e capacitação do time.',
      en: 'Production rollout, manuals and team enablement.',
      es: 'Puesta en producción, manuales y capacitación del equipo.',
    },
  },
];
