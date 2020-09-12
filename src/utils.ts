import { ShowDto, PerformanceDto, CategoryDto } from 'types';

export const getCategories = (performance: PerformanceDto): CategoryDto[] => {
  return performance.categories.filter(category => category.prices.length > 0);
};

export const getPerformances = (show: ShowDto): PerformanceDto[] => {
  return show.performances.filter(
    performance => getCategories(performance).length > 0
  );
};
