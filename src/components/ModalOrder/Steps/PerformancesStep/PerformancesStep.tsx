import React from 'react';
import { Button } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchPerformances from '../../../../hooks/useFetchPerformances';

export default function PerformancesStep({ goNext }) {
  const [order, setOrder] = useOrderContext();
  const performanceHook = useFetchPerformances(order.show.alternative_id);
  const [performances] = performanceHook;

  const handleOnClick = perfSelected => {
    setOrder({ ...order, performance: perfSelected, category: undefined });
    goNext();
  };

  if (performances === undefined) {
    return <p>test</p>;
  }

  return (
    <>
      <h1>{order.show.title}</h1>
      <ul>
        {performances.map(item => (
          <li key={item.id}>
            {item.date.french}
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
