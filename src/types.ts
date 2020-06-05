import { Dispatch } from 'react';

export type Image = {
  id?: string;
  url?: string;
  path?: string;
  thumb?: string[];
};

export type Date = {
  timestamp?: number;
  default?: string;
  french?: string;
};

export type FluidImage = { childImageSharp: { fluid: any } };

export type RateDto = {
  alternative_id?: number;
  name?: string;
  informations?: string | null;
  groupe_rate?: boolean;
  min?: number | null;
  max?: number | null;
};

export type PriceDto = {
  alternative_id?: number;
  amount?: string;
  performance_id?: number;
  category_id?: number;
  performance: {
    alternative_id: string | undefined;
  };
  category: {
    alternative_id: string | undefined;
  };
  rate?: RateDto;
};

export type CategoryDto = {
  alternative_id?: string;
  name?: string;
  nb_places?: number;
  prices: PriceDto[];
};

export type PerformanceDto = {
  alternative_id?: string;
  show_id?: string;
  ticketing_opened: boolean;
  programmed_closing: boolean;
  datetime_closing: Date | undefined;
  programmed_opening: boolean;
  datetime_opening: Date | undefined;
  date?: Date;
  categories: CategoryDto[];
};

export type ShowDto = {
  alternative_id: string | undefined;
  id?: number;
  slug?: string;
  title?: string;
  cover?: string;
  featuredCover?: FluidImage;
  performances: PerformanceDto[];
};

export type PlaceDto = {
  name?: string;
  firstName?: string;
  price?: PriceDto;
};

export type OrderDto = {
  category?: CategoryDto;
  performance?: PerformanceDto;
  places: PlaceDto[];
  price?: PriceDto;
  show?: ShowDto;
};

export interface OrderStepProps {
  goNext: () => void;
  order: OrderDto;
  setOrder: Dispatch<React.SetStateAction<OrderDto>>;
}

export interface ModalProps {
  opened?: boolean;
  close: () => void;
}
