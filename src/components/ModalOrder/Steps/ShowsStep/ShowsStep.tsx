import React from 'react';
import { List, Typography } from '@material-ui/core';
import { ShowDto } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances, getCategories } from '../../../../utils';
import ShowItem from './ShowItem';
import './ShowsStep.scss';

interface ShowsStepProps {
  shows: ShowDto[];
}

export default function ShowsStep({ shows }: ShowsStepProps) {
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
    <div>
      <Typography variant='h2'>Les spectacles</Typography>
      <div className='ShowsList'>
        {shows.map(item => (
          <ShowItem onSelect={handleOnClick} show={item} />
        ))}
      </div>
    </div>
  );
}
