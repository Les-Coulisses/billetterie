import { ShowDto, OrderDto } from 'types';
import { getPerformances, getCategories } from '../../utils';

// Retourne true si on doit afficher le step pour le choix du spectacle
export const displayShowStep = (shows: ShowDto[]): boolean => {
  return shows.length > 1;
};

//Retourne true si on doit afficher le step pour la représentation
export const displayPerformanceStep = (order: OrderDto): boolean => {
  if (order.show !== undefined) {
    return getPerformances(order.show).length > 1;
  } else {
    return true;
  }
};

//Retourne true si on doit afficher le step categories
export const displayCategoryStep = (order: OrderDto): boolean => {
  if (order.performance !== undefined) {
    return getCategories(order.performance).length > 1;
  } else {
    return true;
  }
};

//Retourne le label à afficher pour le step show
export const showLabelDisplayed = (order: OrderDto): string => {
  return order.show !== undefined && order.show.title !== undefined
    ? order.show.title
    : 'Spectacles';
};

//Retourne le label à afficher pour le step représentation
export const performanceLabelDisplayed = (order: OrderDto): string => {
  return order.performance !== undefined &&
    order.performance.date !== undefined &&
    order.performance.date.french !== undefined
    ? order.performance.date.french
    : 'Représentations';
};

//Retourne le label à afficher pour le step places
export const placeLabelDisplayed = (order: OrderDto): string => {
  return order.places.length > 0
    ? order.places.length + ' place' + (order.places.length > 1 ? 's' : '')
    : 'Places';
};
