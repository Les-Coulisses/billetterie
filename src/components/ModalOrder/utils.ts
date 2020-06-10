import { ShowDto, OrderDto } from 'types';
import { getPerformances, getCategories } from '../../utils';

export const hasToDisplayShowStep = (shows: ShowDto[]): boolean => {
  return shows.length > 1;
};

export const hasToDisplayPerformanceStep = (order: OrderDto): boolean => {
  if (order.show !== undefined) {
    return getPerformances(order.show).length > 1;
  } else {
    return true;
  }
};

export const hasToDisplayCategoryStep = (order: OrderDto): boolean => {
  if (order.performance !== undefined) {
    return getCategories(order.performance).length > 1;
  } else {
    return true;
  }
};

export const getShowLabel = (order: OrderDto): string => {
  return order.show !== undefined && order.show.title !== undefined
    ? order.show.title
    : 'Spectacles';
};

export const getPerformanceLabel = (order: OrderDto): string => {
  return order.performance !== undefined &&
    order.performance.date !== undefined &&
    order.performance.date.french !== undefined
    ? order.performance.date.french
    : 'Représentations';
};

export const getPlaceLabel = (order: OrderDto): string => {
  return order.places.length > 0
    ? order.places.length + ' place' + (order.places.length > 1 ? 's' : '')
    : 'Places';
};
