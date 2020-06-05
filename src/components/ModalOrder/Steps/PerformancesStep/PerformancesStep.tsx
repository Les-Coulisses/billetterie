import React, { Dispatch } from 'react';
import { Button } from '@material-ui/core';
import { OrderStepProps, PerformanceDto, OrderDto } from '../../../../types';

interface OrderPerformanceStepProps extends OrderStepProps {
  goPrev: () => void;
  order: OrderDto;
  setOrder: Dispatch<React.SetStateAction<OrderDto>>;
}

export default function PerformancesStep({
  goNext,
  goPrev,
  order,
  setOrder
}: OrderPerformanceStepProps) {
  if (order.show === undefined || order.show.performances === undefined) {
    goPrev();
    return <p>Impossible d'afficher cette étape</p>;
  }

  const handleOnClick = (perfSelected: PerformanceDto) => {
    setOrder({ ...order, performance: perfSelected, category: undefined });
    goNext();
  };

  const performances: PerformanceDto[] = order.show.performances;

  return (
    <>
      <h1>{order.show.title}</h1>
      <ul>
        {performances.map((item: PerformanceDto) => (
          <li key={item.alternative_id}>
            {item.date !== undefined ? item.date.french : 'Date inconnue'}
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
