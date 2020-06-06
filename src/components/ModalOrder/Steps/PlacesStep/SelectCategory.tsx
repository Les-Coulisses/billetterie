import React from 'react';
import { Button } from '@material-ui/core';
import { CategoryDto } from 'types';
import { useOrderContext } from '../../../../hooks/OrderContext';

export default function SelectCategory() {
  const [order, setOrder] = useOrderContext();

  const handleOnClick = (categorySelected: CategoryDto) => {
    setOrder({ ...order, category: categorySelected });
  };

  const categories: CategoryDto[] =
    order.performance?.categories !== undefined
      ? order.performance.categories
      : [];

  return (
    <>
      <ul>
        {categories.map(item => (
          <li key={item.alternative_id}>
            {item.name} => {item.nb_places}
            <Button
              onClick={() => {
                handleOnClick(item);
              }}
            >
              Choisir
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
