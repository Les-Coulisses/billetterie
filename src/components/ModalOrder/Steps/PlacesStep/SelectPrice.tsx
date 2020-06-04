import React, { useState } from 'react';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchPrices from '../../../../hooks/useFetchPrices';
import { Button } from '@material-ui/core';
import ModalInfosPlace from './ModalInfosPlace';

export default function SelectPrice({ order, setOrder, setOpen }) {
  const [prices] = useFetchPrices(
    order.performance.alternative_id,
    order.category !== undefined ? order.category.alternative_id : undefined
  );
  const handleSelectPrice = price => {
    setOrder({ ...order, price: price });
    setOpen(true);
  };

  if (prices === undefined) {
    return <p>Catégorie non choisie</p>;
  } else {
    return (
      <>
        <ul>
          {prices.map(price => (
            <li key={price.id}>
              {price.rate.name}: {price.amount}&euro;
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
