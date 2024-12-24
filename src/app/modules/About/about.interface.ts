export interface ISkillSchema {
  name: string;
  level: string;
  experience: string;
  details: string;
  projects?: string[];
  keywords?: string[];
}

export interface ISectionSchema {
  title: string;
  description: string;
  items: string[];
}

export interface IAbout {
  currentFocus: ISectionSchema;
  learning: ISectionSchema;
  interests: ISectionSchema;
  skills: {
    frontend: ISkillSchema[];
    backend: ISkillSchema[];
    tools: ISkillSchema[];
  };
}
