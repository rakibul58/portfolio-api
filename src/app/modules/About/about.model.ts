import { model, Schema } from 'mongoose';
import { IAbout, ISectionSchema, ISkillSchema } from './about.interface';

const skillSchema = new Schema<ISkillSchema>({
  name: { type: String, required: true },
  level: { type: String, required: true },
  experience: { type: String, required: true },
  details: { type: String, required: true },
  projects: [String],
  keywords: [String],
});

const sectionSchema = new Schema<ISectionSchema>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  items: [String],
});

const aboutSchema = new Schema<IAbout>({
  currentFocus: sectionSchema,
  learning: sectionSchema,
  interests: sectionSchema,
  skills: {
    frontend: [skillSchema],
    backend: [skillSchema],
    tools: [skillSchema],
  },
});

export const About = model('About', aboutSchema);
