export type StudioVariant = {
  id: string;
  name: string;
  html: string;
};

export type StudioProp = {
  name: string;
  type: string;
  default: string;
  values?: string[];
};

export type StudioComponent = {
  slug: string;
  name: string;
  screen: string;
  category?: string;
  tags: string[];
  notes: string;
  html: string;
  css: string;
  liveRoute?: string;
  tokens?: string[];
  props?: StudioProp[];
  variants?: StudioVariant[];
  angular?: string;
};

export type StudioQuestion = {
  id: string;
  slug: string;
  author: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  createdAt: string;
  answeredAt?: string;
};
