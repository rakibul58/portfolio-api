import { model, Schema } from 'mongoose';
import { IExperience } from './experience.interface';

const experienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    description: { type: String, required: true },
    achievements: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Experience = model<IExperience>('Experience', experienceSchema);
