import React, { Dispatch, useContext } from 'react';
import { Button } from '@material-ui/core';
import { CategoryDto, OrderDto, OrderState } from 'types';
import { OrderStateContext } from '../../LinkOrder';

export default function SelectCategory() {
  const orderState: OrderState | undefined = useContext(OrderStateContext);
  if (orderState === undefined) {
    throw new Error(
      'rendering PlacesStep, orderState has unexpected value undefined'
    );
  }
  const order = orderState.order;
  const setOrder = orderState.setOrder;

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
