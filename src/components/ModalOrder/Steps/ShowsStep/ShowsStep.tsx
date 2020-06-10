import React from 'react';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@material-ui/core';
import { ShowDto } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances, getCategories } from '../../../../utils';

const useStyles = makeStyles(() => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap'
  },
  showItem: {
    flex: '25%'
  }
}));

interface ShowsStepProps {
  shows: ShowDto[];
}

export default function ShowsStep({ shows }: ShowsStepProps) {
  const classes = useStyles();
  const [order, setOrder, activeStep, setActiveStep] = useOrderContext();

  const handleOnClick = (showSelected: ShowDto) => {
    setOrder({ ...order, show: showSelected });
    const performances = getPerformances(showSelected);
    if (performances.length === 1) {
      const performance = performances[0];
      const categories = getCategories(performance);
      if (categories.length === 1) {
        setOrder({
          ...order,
          show: showSelected,
          performance: performance,
          category: categories[0]
        });
      } else {
        setOrder({
          ...order,
          show: showSelected,
          performance: performance,
          category: undefined
        });
      }
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <List>
      {shows.map(item => (
        <>
          <ListItem button>
            <ListItemText
              onClick={() => {
                handleOnClick(item);
              }}
              primary={item.title}
              secondary={getPerformances(item).length + ' représentations'}
            />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
}
