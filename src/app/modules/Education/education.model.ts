import { model, Schema } from 'mongoose';
import { IEducation } from './education.interface';

const educationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    result: { type: String, required: true },
  },
  { timestamps: true },
);

export const Education = model<IEducation>('Education', educationSchema);
