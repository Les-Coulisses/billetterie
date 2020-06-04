import React from 'react';
import { useOrderContext } from '../../../../hooks/OrderContext';

export default function PlacesList({ order }) {
  return (
    <>
      {Array.isArray(order.places) && (
        <ul>
          {order.places.map((place, index) => (
            <li key={index}>
              {place.firstName} {place.name} {place.price.rate.name}{' '}
              {place.price.amount} &euro;
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
