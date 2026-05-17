export interface Project {
  title: string;
  description: string;
  image: string;
  skills: string[];
  github?: string | null;
  demo?: string | null;
  details?: string[];
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  icon: string | null;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Certification {
  name: string;
  issuer: string;
  link: string;
}

export interface ToolItem {
  name: string;
  icon: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  current?: boolean;
}
