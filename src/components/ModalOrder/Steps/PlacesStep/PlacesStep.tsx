import React from 'react';
import { Button } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchCategories from '../../../../hooks/useFetchCategories';
import SelectCategory from './SelectCategory';
import SelectPrice from './SelectPrice';

export default function PlacesStep({ goNext }) {
  const [order] = useOrderContext();
  console.log('render places step', order);

  return (
    <>
      <h1>{order.show.title}</h1>
      <h2>{order.performance.date.french}</h2>
      <SelectCategory />
      <SelectPrice />
    </>
  );
}
