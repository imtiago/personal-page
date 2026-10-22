import type { Profile } from './schema';

export const profileData: Profile = {
  name: 'Tiago Oliveira',
  role: {
    pt: 'Consultor Técnico SAP FSM · SSAM · BTP',
    en: 'SAP FSM · SSAM · BTP Technical Consultant',
    es: 'Consultor Técnico SAP FSM · SSAM · BTP',
  },
  location: { pt: 'Rio Branco, AC · Brasil', en: 'Rio Branco, Brazil', es: 'Rio Branco, Brasil' },
  available: true,
  stats: { years: '5+', sapProjects: 5, certs: 4 },
  email: 'tiago.ufac@gmail.com',
  whatsapp: '5568999676543',
  linkedin: 'https://www.linkedin.com/in/tiago-oliveira-852a27201/',
  github: 'https://github.com/imtiago',
  cv: {},
  heroSpecialties: ['SAP FSM', 'SAP SSAM'],
};
