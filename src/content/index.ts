import { z } from 'zod';
import { aboutData } from './about';
import { certificationsData, coursesData } from './certifications';
import { diagramData } from './diagram';
import { expertiseData } from './expertise';
import { processData } from './process';
import { profileData } from './profile';
import { projectsData } from './projects';
import {
  aboutSchema,
  certificationSchema,
  diagramNodeSchema,
  expertiseSchema,
  processStepSchema,
  profileSchema,
  projectSchema,
  testimonialSchema,
} from './schema';
import { testimonialsData } from './testimonials';

export const profile = profileSchema.parse(profileData);
export const expertise = z.array(expertiseSchema).length(3).parse(expertiseData);
export const processSteps = z.array(processStepSchema).length(4).parse(processData);
export const diagramNodes = z.array(diagramNodeSchema).length(4).parse(diagramData);
export const projects = z.array(projectSchema).parse(projectsData);
export const certifications = z.array(certificationSchema).parse(certificationsData);
export const courses = z.array(z.string().min(1)).parse(coursesData);
export const testimonials = z.array(testimonialSchema).min(1).parse(testimonialsData);
export const about = aboutSchema.parse(aboutData);
