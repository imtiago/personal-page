import type { About } from './schema';

export const aboutData: About = {
  title: {
    pt: { before: 'Do código ao ', highlight: 'campo', after: '.' },
    en: { before: 'From code to the ', highlight: 'field', after: '.' },
    es: { before: 'Del código al ', highlight: 'terreno', after: '.' },
  },
  paragraphs: {
    pt: [
      'Escrevi minha primeira solução aos 16 anos: um sistema de gestão para um consultório odontológico em Rio Branco (AC). Desde então, faço a mesma coisa em escalas cada vez maiores: **transformar processos manuais em sistemas que funcionam**.',
      'Passei pela Secretaria de Planejamento do Acre e por projetos como desenvolvedor freelancer até encontrar, em 2021, o ponto em que tecnologia e operação se encontram: o **ecossistema SAP**. Hoje conduzo implementações de **SAP FSM, SSAM e SAP BTP** de ponta a ponta, da configuração e das regras de negócio às integrações com S/4HANA, ao go-live e à capacitação das equipes.',
      'Minha base de desenvolvedor faz diferença: entendo o processo de quem está em campo, falo a língua do time técnico e entrego soluções que o cliente consegue sustentar depois.',
    ],
    en: [
      'I wrote my first solution at 16: a management system for a dental clinic in Rio Branco, Brazil. Since then I have been doing the same thing at ever larger scale: **turning manual processes into systems that work**.',
      'I worked at the Acre State Planning Department and on freelance development projects until, in 2021, I found the place where technology and operations meet: the **SAP ecosystem**. Today I lead **SAP FSM, SSAM and SAP BTP** implementations end to end, from configuration and business rules to S/4HANA integrations, go-live and team enablement.',
      'My developer background makes the difference: I understand the people working in the field, I speak the technical team\'s language, and I deliver solutions the client can sustain afterwards.',
    ],
    es: [
      'Escribí mi primera solución a los 16 años: un sistema de gestión para un consultorio odontológico en Rio Branco, Brasil. Desde entonces hago lo mismo a escalas cada vez mayores: **transformar procesos manuales en sistemas que funcionan**.',
      'Pasé por la Secretaría de Planificación del Estado de Acre y por proyectos como desarrollador freelance hasta encontrar, en 2021, el punto donde la tecnología y la operación se encuentran: el **ecosistema SAP**. Hoy lidero implementaciones de **SAP FSM, SSAM y SAP BTP** de punta a punta, desde la configuración y las reglas de negocio hasta las integraciones con S/4HANA, el go-live y la capacitación de los equipos.',
      'Mi base de desarrollador marca la diferencia: entiendo el proceso de quien está en campo, hablo el idioma del equipo técnico y entrego soluciones que el cliente puede sostener después.',
    ],
  },
  milestones: [
    { year: { pt: '2012', en: '2012', es: '2012' }, label: { pt: 'Primeiro sistema', en: 'First system', es: 'Primer sistema' } },
    { year: { pt: '2019', en: '2019', es: '2019' }, label: { pt: 'SEPLAG-AC', en: 'SEPLAG-AC', es: 'SEPLAG-AC' } },
    { year: { pt: '2021', en: '2021', es: '2021' }, label: { pt: 'Entrada no SAP', en: 'Joined SAP world', es: 'Ingreso a SAP' } },
    { year: { pt: 'Hoje', en: 'Today', es: 'Hoy' }, label: { pt: 'FSM · SSAM · BTP', en: 'FSM · SSAM · BTP', es: 'FSM · SSAM · BTP' } },
  ],
  education: [
    {
      course: { pt: 'Sistemas de Informação', en: 'Information Systems (BSc)', es: 'Sistemas de Información' },
      school: 'UFAC',
    },
    {
      course: { pt: 'Técnico em Informática', en: 'IT Technician', es: 'Técnico en Informática' },
      school: 'IFAC',
    },
  ],
  languages: {
    pt: ['Português — nativo', 'Inglês — intermediário', 'Espanhol — intermediário'],
    en: ['Portuguese — native', 'English — intermediate', 'Spanish — intermediate'],
    es: ['Portugués — nativo', 'Inglés — intermedio', 'Español — intermedio'],
  },
};
