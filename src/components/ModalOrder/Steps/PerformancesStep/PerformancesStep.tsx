import React from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import { PerformanceDto } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances, getCategories } from '../../../../utils';

export default function PerformancesStep() {
  const [order, setOrder, activeStep, setActiveStep] = useOrderContext();

  if (order.show === undefined || order.show.performances === undefined) {
    return <p>Impossible d'afficher les représentations</p>;
  }

  const handleOnClick = (perfSelected: PerformanceDto) => {
    const categories = getCategories(perfSelected);
    if (categories.length === 1) {
      setOrder({
        ...order,
        performance: perfSelected,
        category: categories[0]
      });
    } else {
      setOrder({ ...order, performance: perfSelected, category: undefined });
    }
    setActiveStep(activeStep + 1);
  };

  const performances: PerformanceDto[] = getPerformances(order.show);

  return (
    <>
      <Typography variant={'h4'}>{order.show.title}</Typography>
      <List>
        {performances.map((item: PerformanceDto) => (
          <>
            <ListItem button>
              <ListItemText
                onClick={() => {
                  handleOnClick(item);
                }}
                primary={
                  item.date !== undefined ? item.date.french : 'Date inconnue'
                }
                secondary={getCategories(item).length + ' catégories'}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
}
