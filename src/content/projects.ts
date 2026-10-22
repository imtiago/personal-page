import type { Project } from './schema';

export const projectsData: Project[] = [
  {
    id: 'minasligas',
    client: 'Minasligas',
    period: { pt: 'jan–jun 2026', en: 'Jan–Jun 2026', es: 'ene–jun 2026' },
    kind: 'sap',
    featured: true,
    tags: ['SAP SSAM', 'Dynamic Forms'],
    challenge: {
      pt: 'Implementar e apoiar a adoção do SAP SSAM.',
      en: 'Implement SAP SSAM and support its adoption.',
      es: 'Implementar SAP SSAM y apoyar su adopción.',
    },
    delivery: {
      pt: 'Configuração do SSAM, regras de negócio, SAP Dynamic Forms, testes e go-live.',
      en: 'SSAM configuration, business rules, SAP Dynamic Forms, testing and go-live.',
      es: 'Configuración de SSAM, reglas de negocio, SAP Dynamic Forms, pruebas y go-live.',
    },
  },
  {
    id: 'pluz',
    client: 'Pluz',
    period: { pt: 'mai 2025 – jan 2026', en: 'May 2025 – Jan 2026', es: 'may 2025 – ene 2026' },
    kind: 'sap',
    featured: true,
    tags: ['SAP FSM', 'Proaxia'],
    challenge: {
      pt: 'Implementar o SAP FSM integrado ao S/4HANA.',
      en: 'Implement SAP FSM integrated with S/4HANA.',
      es: 'Implementar SAP FSM integrado con S/4HANA.',
    },
    delivery: {
      pt: 'Configuração do FSM, conector Proaxia, regras de negócio, testes e go-live.',
      en: 'FSM configuration, Proaxia connector, business rules, testing and go-live.',
      es: 'Configuración de FSM, conector Proaxia, reglas de negocio, pruebas y go-live.',
    },
  },
  {
    id: 'armac',
    client: 'Armac',
    period: { pt: 'jun 2024 – abr 2025', en: 'Jun 2024 – Apr 2025', es: 'jun 2024 – abr 2025' },
    kind: 'sap',
    featured: true,
    tags: ['SAP FSM', 'Proaxia'],
    challenge: {
      pt: 'Adotar o SAP FSM e estabilizar a operação após o go-live.',
      en: 'Adopt SAP FSM and stabilize operations after go-live.',
      es: 'Adoptar SAP FSM y estabilizar la operación tras el go-live.',
    },
    delivery: {
      pt: 'Implementação do FSM com conector Proaxia, go-live e melhorias pós-implantação.',
      en: 'FSM implementation with the Proaxia connector, go-live and post-launch improvements.',
      es: 'Implementación de FSM con conector Proaxia, go-live y mejoras post-implementación.',
    },
  },
  {
    id: 'inventory-system',
    client: 'Sistema de Gestão Comercial e Estoque',
    period: { pt: '2026', en: '2026', es: '2026' },
    kind: 'dev',
    featured: true,
    tags: ['Node', 'TypeScript', 'React', 'Prisma', 'Clean Architecture'],
    challenge: {
      pt: 'Um ERP enxuto para pequenas empresas controlarem compras, vendas, financeiro e estoque.',
      en: 'A lean ERP for small businesses to manage purchasing, sales, finance and inventory.',
      es: 'Un ERP ligero para que pequeñas empresas gestionen compras, ventas, finanzas e inventario.',
    },
    delivery: {
      pt: 'Sistema completo com importação automática de NF-e (XML/PDF), leitura de QR code e testes automatizados.',
      en: 'Full system with automatic Brazilian e-invoice (NF-e) import from XML/PDF, QR code scanning and automated tests.',
      es: 'Sistema completo con importación automática de facturas electrónicas brasileñas (NF-e) desde XML/PDF, lectura de códigos QR y pruebas automatizadas.',
    },
    repoUrl: 'https://github.com/imtiago/inventory-system',
  },
  {
    id: 'norte-energia',
    client: 'Norte Energia',
    period: { pt: 'jan–jun 2024', en: 'Jan–Jun 2024', es: 'ene–jun 2024' },
    kind: 'sap',
    featured: false,
    tags: ['SAP FSM'],
    challenge: {
      pt: 'Capacitar o time do cliente em regras de negócio do FSM.',
      en: "Train the client's team on FSM business rules.",
      es: 'Capacitar al equipo del cliente en reglas de negocio de FSM.',
    },
    delivery: {
      pt: 'Curso de regras de negócio FSM, consultas avançadas e suporte.',
      en: 'FSM business rules course, advanced queries and support.',
      es: 'Curso de reglas de negocio FSM, consultas avanzadas y soporte.',
    },
  },
  {
    id: 'wps',
    client: 'WPS',
    period: { pt: '2023', en: '2023', es: '2023' },
    kind: 'sap',
    featured: false,
    tags: ['SAP FSM', 'Fiori'],
    challenge: {
      pt: 'Implementar o SAP FSM com integração.',
      en: 'Implement SAP FSM with integration.',
      es: 'Implementar SAP FSM con integración.',
    },
    delivery: {
      pt: 'FSM com integração: líder de integração técnica e desenvolvedor Fiori.',
      en: 'FSM with integration: technical integration lead and Fiori developer.',
      es: 'FSM con integración: líder de integración técnica y desarrollador Fiori.',
    },
  },
];
