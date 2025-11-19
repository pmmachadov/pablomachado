import { ReactElement } from "react";

export interface ProjectCardType {
  title: string;
  image: string;
  slug?: string; // For internal routing
  description?: string; // Short description for the card
  longDescription?: string; // Long description for the case study
  technologies?: string[];
  challenges?: string;
  solutions?: string;
  links: {
    name: string;
    path: string;
    icon?: ReactElement;
    id?: string;
    style?: React.CSSProperties;
  }[];
}

export interface BlogPostType {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string; // Simple markdown or HTML string for now
  tags: string[];
}

export interface NavLinkType {
  name: string;
  path: string;
  icon?: ReactElement;
}

export interface SkillItemType {
  icon?: ReactElement;
  text: string;
  skillLevel: string;
}

export interface SocialLinkType {
  icon: ReactElement;
  link: string;
  title: string;
  target: string;
  rel: string;
}

export interface MediaImageType {
  src: string;
  alt: string;
  height: number;
  width: number;
  mobileImg?: {
    src: string;
    height: number;
    width: number;
  };
}

export interface ImageComponentProps {
  src?: string;
  alt: string;
  className?: string;
  width?: string;
  height?: string;
}

export interface Props {
  project: ProjectCardType;
}
