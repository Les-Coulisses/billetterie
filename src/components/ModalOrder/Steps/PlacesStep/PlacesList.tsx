import React, { useContext } from 'react';
import { OrderDto, OrderState } from '../../../../types';
import { OrderStateContext } from '../../LinkOrder';

export default function PlacesList() {
  const orderState: OrderState | undefined = useContext(OrderStateContext);
  if (orderState === undefined) {
    throw new Error(
      'rendering PlacesStep, orderState has unexpected value undefined'
    );
  }
  const order = orderState.order;

  return (
    <>
      {Array.isArray(order.places) && (
        <ul>
          {order.places.map((place, index) => (
            <li key={index}>
              {place.firstName} {place.name} {place?.price?.rate?.name}{' '}
              {place?.price?.amount} &euro;
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
