import type { ExpertiseArea } from './schema';

export const expertiseData: ExpertiseArea[] = [
  {
    id: 'fsm',
    icon: 'wrench',
    title: { pt: 'SAP FSM / SSAM', en: 'SAP FSM / SSAM', es: 'SAP FSM / SSAM' },
    summary: {
      pt: 'Implementação e adoção de Field Service Management e Service and Asset Manager.',
      en: 'Implementation and adoption of Field Service Management and Service and Asset Manager.',
      es: 'Implementación y adopción de Field Service Management y Service and Asset Manager.',
    },
    items: {
      pt: ['Configuração e regras de negócio', 'Conector Proaxia (FSM ⇄ S/4HANA)', 'SAP Dynamic Forms', 'Integração com SAP PM / ECC'],
      en: ['Configuration and business rules', 'Proaxia connector (FSM ⇄ S/4HANA)', 'SAP Dynamic Forms', 'Integration with SAP PM / ECC'],
      es: ['Configuración y reglas de negocio', 'Conector Proaxia (FSM ⇄ S/4HANA)', 'SAP Dynamic Forms', 'Integración con SAP PM / ECC'],
    },
  },
  {
    id: 'btp',
    icon: 'cloud',
    title: { pt: 'SAP BTP', en: 'SAP BTP', es: 'SAP BTP' },
    summary: {
      pt: 'Plataforma, extensões e integrações em nuvem.',
      en: 'Platform, extensions and cloud integrations.',
      es: 'Plataforma, extensiones e integraciones en la nube.',
    },
    items: {
      pt: ['Kyma e Cloud Foundry', 'Cloud Identity Services', 'Fiori / SAPUI5 e BAS', 'SAP Build e Cloud Connector'],
      en: ['Kyma and Cloud Foundry', 'Cloud Identity Services', 'Fiori / SAPUI5 and BAS', 'SAP Build and Cloud Connector'],
      es: ['Kyma y Cloud Foundry', 'Cloud Identity Services', 'Fiori / SAPUI5 y BAS', 'SAP Build y Cloud Connector'],
    },
  },
  {
    id: 'dev',
    icon: 'code-xml',
    title: { pt: 'Desenvolvimento de sistemas', en: 'Software development', es: 'Desarrollo de sistemas' },
    summary: {
      pt: 'Soluções sob medida e automação de processos.',
      en: 'Custom solutions and process automation.',
      es: 'Soluciones a medida y automatización de procesos.',
    },
    items: {
      pt: ['Aplicações web (Node, React)', 'Automação de processos', 'Integrações e APIs', 'Treinamento de equipes'],
      en: ['Web applications (Node, React)', 'Process automation', 'Integrations and APIs', 'Team training'],
      es: ['Aplicaciones web (Node, React)', 'Automatización de procesos', 'Integraciones y APIs', 'Capacitación de equipos'],
    },
  },
];

