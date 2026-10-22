import type { Testimonial } from './schema';

export const testimonialsData: Testimonial[] = [
  {
    author: 'Lilian Amélia Pereira',
    role: {
      pt: 'Sócia e Líder Técnica SAP',
      en: 'Partner and SAP Technical Lead',
      es: 'Socia y Líder Técnica SAP',
    },
    relation: { pt: 'supervisora direta', en: 'direct supervisor', es: 'supervisora directa' },
    quote:
      'O Tiago naturalmente puxa discussões relevantes, tanto técnicas quanto funcionais, promovendo trocas riquíssimas que contribuem para o crescimento de todos. […] Sem dúvida, o Tiago é um exemplo de profissional, alguém em quem confiamos plenamente e que agrega valor em qualquer contexto em que atua.',
    highlight: 'alguém em quem confiamos plenamente',
    quoteTranslation: {
      en: 'Tiago naturally drives relevant discussions, both technical and functional, fostering rich exchanges that help everyone grow. […] Without a doubt, Tiago is a model professional, someone we fully trust and who adds value in any context.',
      es: 'Tiago impulsa naturalmente discusiones relevantes, tanto técnicas como funcionales, promoviendo intercambios muy enriquecedores que contribuyen al crecimiento de todos. […] Sin duda, Tiago es un profesional ejemplar, alguien en quien confiamos plenamente y que aporta valor en cualquier contexto en el que actúa.',
    },
  },
];
