import React from 'react';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchPrices from '../../../../hooks/useFetchPrices';

export default function SelectPrice() {
  const [order, setOrder] = useOrderContext();
  console.log('render SelectPrice', order);
  const [prices] = useFetchPrices(
    order.performance.alternative_id,
    order.category !== undefined ? order.category.alternative_id : undefined
  );

  if (prices === undefined) {
    return <p>Catégorie non choisie</p>;
  } else {
    return (
      <ul>
        {prices.map(price => (
          <li key={price.id}>
            {price.rate.name}: {price.amount}&euro;
          </li>
        ))}
      </ul>
    );
  }
}
