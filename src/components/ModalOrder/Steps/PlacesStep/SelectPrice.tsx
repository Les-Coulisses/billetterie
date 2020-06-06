import React, { Dispatch } from 'react';
import { Button } from '@material-ui/core';
import { PriceDto } from 'types';
import { useOrderContext } from '../../../../hooks/OrderContext';

interface SelectPriceProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function SelectPrice({ setOpen }: SelectPriceProps) {
  const [order, setOrder] = useOrderContext();

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
