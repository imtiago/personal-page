import { z } from 'zod';
import type { Lang } from '../i18n/langs';

export type Localized<T> = Record<Lang, T>;

export function localized<T extends z.ZodType>(schema: T) {
  return z.object({ pt: schema, en: schema, es: schema });
}

const text = z.string().min(1);
const url = z.url();

export const profileSchema = z.object({
  name: text,
  role: localized(text),
  location: localized(text),
  available: z.boolean(),
  stats: z.object({ years: z.literal('5+'), sapProjects: z.literal(5), certs: z.literal(4) }),
  email: z.email(),
  whatsapp: z.string().regex(/^\d{10,15}$/),
  linkedin: url,
  github: url,
  scheduleUrl: url.optional(),
  cv: z.object({ pt: text.optional(), en: text.optional(), es: text.optional() }),
  heroSpecialties: z.array(text).min(1),
});

export const expertiseSchema = z.object({
  id: z.enum(['fsm', 'btp', 'dev']),
  icon: text,
  title: localized(text),
  summary: localized(text),
  items: localized(z.array(text).length(4)),
});

export const processStepSchema = z.object({
  title: localized(text),
  body: localized(text),
});

export const diagramNodeSchema = z.object({
  id: z.enum(['erp', 'btp', 'fsm', 'field']),
  badge: z.enum(['ERP', 'BTP', 'FSM', 'APP']),
  title: localized(text),
  subtitle: localized(text),
  panelTitle: localized(text),
  bullets: localized(z.array(text).min(2)),
  core: z.boolean().optional(),
});

export const projectSchema = z.object({
  id: text,
  client: text,
  /** Título exibido no card quando difere do nome do cliente (ex.: projeto próprio). */
  title: localized(text).optional(),
  period: localized(text),
  kind: z.enum(['sap', 'dev']),
  featured: z.boolean(),
  tags: z.array(text).min(1),
  challenge: localized(text),
  delivery: localized(text),
  result: localized(text).optional(),
  repoUrl: url.optional(),
});

export const certificationSchema = z.object({
  title: text,
  level: localized(text),
  credlyUrl: url.optional(),
});

export const testimonialSchema = z.object({
  author: text,
  role: localized(text),
  relation: localized(text),
  quote: text,
  highlight: text,
  quoteTranslation: z.object({ en: text.optional(), es: text.optional() }),
});

export const aboutSchema = z.object({
  title: localized(z.object({ before: text, highlight: text, after: z.string() })),
  paragraphs: localized(z.array(text).length(3)),
  milestones: z.array(z.object({ year: localized(text), label: localized(text) })).length(4),
  education: z.array(z.object({ course: localized(text), school: text })).length(2),
  languages: localized(z.array(text).length(3)),
});

export type Profile = z.infer<typeof profileSchema>;
export type ExpertiseArea = z.infer<typeof expertiseSchema>;
export type ProcessStep = z.infer<typeof processStepSchema>;
export type DiagramNode = z.infer<typeof diagramNodeSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type About = z.infer<typeof aboutSchema>;
