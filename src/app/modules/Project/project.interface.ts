export interface IMedia {
  type: 'youtube' | 'video' | 'image';
  url: string;
  videoId?: string;
  thumbnail?: string;
}

export interface ILink {
  live?: string;
  client?: string;
  server?: string;
  github?: string;
}

export interface IProject {
  title: string;
  description: string;
  longDescription: string;
  media: IMedia[];
  username: string;
  repo: string;
  image: string;
  technologies: string[];
  category: 'Frontend' | 'Backend' | 'Full Stack';
  links: ILink;
}
