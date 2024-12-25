import { model, Schema } from 'mongoose';
import { ILink, IMedia, IProject } from './project.interface';

const mediaSchema = new Schema<IMedia>({
  type: {
    type: String,
    enum: ['youtube', 'video', 'image'],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  videoId: String,
  thumbnail: String,
});

const linkSchema = new Schema<ILink>({
  live: String,
  client: String,
  server: String,
  github: String,
});

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: {
      type: String,
      required: true,
    },
    media: [mediaSchema],
    username: {
      type: String,
      required: true,
    },
    repo: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    technologies: [
      {
        type: String,
        required: true,
      },
    ],
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Full Stack'],
      required: true,
    },
    links: {
      type: linkSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Project = model('Project', projectSchema);
