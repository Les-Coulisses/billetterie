import React from 'react';
import { OrderDto } from '../../../../types';

interface PlacesListProps {
  order: OrderDto;
}
export default function PlacesList({ order }: PlacesListProps) {
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
