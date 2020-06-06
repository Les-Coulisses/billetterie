import React, { useState, Dispatch, useContext } from 'react';
import { Button } from '@material-ui/core';
import ModalInfosPlace from './ModalInfosPlace';
import { OrderDto, PriceDto, OrderState } from 'types';
import { OrderStateContext } from '../../LinkOrder';

interface SelectPriceProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectPrice({ setOpen }: SelectPriceProps) {
  const orderState: OrderState | undefined = useContext(OrderStateContext);
  if (orderState === undefined) {
    throw new Error(
      'rendering PlacesStep, orderState has unexpected value undefined'
    );
  }
  const order = orderState.order;
  const setOrder = orderState.setOrder;

  const handleSelectPrice = (price: PriceDto) => {
    setOrder({ ...order, price: price });
    setOpen(true);
  };

  const prices: PriceDto[] =
    order.category?.prices !== undefined ? order.category.prices : [];

  if (prices.length === 0) {
    return <p>Catégorie non choisie</p>;
  } else {
    return (
      <>
        <ul>
          {prices.map(price => (
            <li key={price.alternative_id}>
              {price?.rate?.name}: {price.amount}&euro;
              <Button
                onClick={() => {
                  handleSelectPrice(price);
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
}
