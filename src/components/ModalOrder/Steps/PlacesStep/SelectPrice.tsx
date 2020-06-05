import React, { useState, Dispatch } from 'react';
import { Button } from '@material-ui/core';
import ModalInfosPlace from './ModalInfosPlace';
import { OrderDto, PriceDto } from 'types';

interface SelectPriceProps {
  order: OrderDto;
  setOrder: Dispatch<React.SetStateAction<OrderDto>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectPrice({
  order,
  setOrder,
  setOpen
}: SelectPriceProps) {
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
