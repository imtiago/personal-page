import type { DiagramNode } from './schema';

export const diagramData: DiagramNode[] = [
  {
    id: 'erp',
    badge: 'ERP',
    title: { pt: 'S/4HANA · ECC', en: 'S/4HANA · ECC', es: 'S/4HANA · ECC' },
    subtitle: {
      pt: 'SAP PM: ordens, ativos e materiais',
      en: 'SAP PM: orders, assets and materials',
      es: 'SAP PM: órdenes, activos y materiales',
    },
    panelTitle: {
      pt: 'S/4HANA e ECC: a origem dos dados',
      en: 'S/4HANA and ECC: where the data starts',
      es: 'S/4HANA y ECC: el origen de los datos',
    },
    bullets: {
      pt: ['Ordens de manutenção e notas do SAP PM', 'Ativos, equipamentos e locais de instalação', 'Mapeamento dos dados que vão para o campo'],
      en: ['SAP PM maintenance orders and notifications', 'Assets, equipment and functional locations', 'Mapping the data that goes to the field'],
      es: ['Órdenes y avisos de mantenimiento de SAP PM', 'Activos, equipos y ubicaciones técnicas', 'Mapeo de los datos que van al campo'],
    },
  },
  {
    id: 'btp',
    badge: 'BTP',
    title: { pt: 'SAP BTP', en: 'SAP BTP', es: 'SAP BTP' },
    core: true,
    subtitle: {
      pt: 'Conector Proaxia · Kyma · Cloud Foundry · Identity',
      en: 'Proaxia connector · Kyma · Cloud Foundry · Identity',
      es: 'Conector Proaxia · Kyma · Cloud Foundry · Identity',
    },
    panelTitle: {
      pt: 'SAP BTP: a ponte entre o ERP e o campo',
      en: 'SAP BTP: the bridge between ERP and the field',
      es: 'SAP BTP: el puente entre el ERP y el campo',
    },
    bullets: {
      pt: ['Implementação técnica do conector Proaxia (S/4HANA ⇄ FSM)', 'Provisionamento de Kyma e Cloud Foundry', 'Configuração do SAP Cloud Identity Services', 'Extensões Fiori / SAPUI5 desenvolvidas no BAS'],
      en: ['Technical implementation of the Proaxia connector (S/4HANA ⇄ FSM)', 'Kyma and Cloud Foundry provisioning', 'SAP Cloud Identity Services setup', 'Fiori / SAPUI5 extensions built in BAS'],
      es: ['Implementación técnica del conector Proaxia (S/4HANA ⇄ FSM)', 'Aprovisionamiento de Kyma y Cloud Foundry', 'Configuración de SAP Cloud Identity Services', 'Extensiones Fiori / SAPUI5 desarrolladas en BAS'],
    },
  },
  {
    id: 'fsm',
    badge: 'FSM',
    title: { pt: 'SAP FSM / SSAM', en: 'SAP FSM / SSAM', es: 'SAP FSM / SSAM' },
    subtitle: {
      pt: 'Planejamento, despacho e regras de negócio',
      en: 'Planning, dispatching and business rules',
      es: 'Planificación, despacho y reglas de negocio',
    },
    panelTitle: {
      pt: 'SAP FSM / SSAM: o cérebro da operação',
      en: 'SAP FSM / SSAM: the brain of the operation',
      es: 'SAP FSM / SSAM: el cerebro de la operación',
    },
    bullets: {
      pt: ['Configuração de FSM e SSAM', 'Estudo, desenvolvimento e testes de regras de negócio', 'Consultas avançadas e automação de processos'],
      en: ['FSM and SSAM configuration', 'Designing, building and testing business rules', 'Advanced queries and process automation'],
      es: ['Configuración de FSM y SSAM', 'Estudio, desarrollo y pruebas de reglas de negocio', 'Consultas avanzadas y automatización de procesos'],
    },
  },
  {
    id: 'field',
    badge: 'APP',
    title: { pt: 'Técnico em campo', en: 'Field technician', es: 'Técnico en campo' },
    subtitle: {
      pt: 'App mobile · Dynamic Forms',
      en: 'Mobile app · Dynamic Forms',
      es: 'App móvil · Dynamic Forms',
    },
    panelTitle: {
      pt: 'Técnico em campo: onde o trabalho acontece',
      en: 'Field technician: where the work happens',
      es: 'Técnico en campo: donde ocurre el trabajo',
    },
    bullets: {
      pt: ['SAP Dynamic Forms para checklists e laudos', 'Definição de melhorias para o app de produtividade do FSM', 'Capacitação dos usuários e suporte no go-live'],
      en: ['SAP Dynamic Forms for checklists and reports', 'Defining improvements for the FSM productivity app', 'User training and go-live support'],
      es: ['SAP Dynamic Forms para checklists e informes', 'Definición de mejoras para la app de productividad de FSM', 'Capacitación de usuarios y soporte en el go-live'],
    },
  },
];

