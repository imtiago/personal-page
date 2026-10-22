import type { Certification } from './schema';

export const certificationsData: Certification[] = [
  {
    title: 'SAP Fiori Application Developer',
    level: { pt: 'SAP Certified Associate', en: 'SAP Certified Associate', es: 'SAP Certified Associate' },
  },
  {
    title: 'SAP Field Service Management',
    level: { pt: 'SAP Certified', en: 'SAP Certified', es: 'SAP Certified' },
  },
  {
    title: 'SAP Build Developer',
    level: { pt: 'SAP Certified', en: 'SAP Certified', es: 'SAP Certified' },
  },
  {
    title: 'SAP Business Data Cloud',
    level: { pt: 'SAP Certified', en: 'SAP Certified', es: 'SAP Certified' },
  },
];

export const coursesData: string[] = [
  'Connecting SAP BTP and On-Premise Systems using the Cloud Connector',
  'Developing Apps with SAP Build Apps',
  'Introducing SAP Cloud Identity Services',
  'Discovering SAP Business Technology Platform',
  'Exploring SAP Analytics Cloud',
  'Developing SAPUI5 Applications',
  'Composing and Automating with SAP Build the No-Code Way',
  'Managing Clean Core for SAP S/4HANA Cloud',
];
