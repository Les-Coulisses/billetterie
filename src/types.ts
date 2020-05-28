export type Image = {
  id: string;
  url: string;
  path: string;
  thumb: string[];
};

export type Date = {
  timestamp: number;
  default: string;
  french: string;
};

export type FluidImage = { childImageSharp: { fluid: any } };

export type ShowDto = {
  alternative_id: string;
  id: number;
  slug: string;
  title: string;
  cover: Image;
  featuredCover: FluidImage;
};

export type PerformanceDto = {
  id: string;
  alternative_id: number;
  show_id: number;
  date: Date;
};

export type CategoryDto = {
  id: string;
  alternative_id: number;
  name: string;
  nb_places: number;
};
