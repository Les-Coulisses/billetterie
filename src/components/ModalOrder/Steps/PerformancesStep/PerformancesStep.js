import React from 'react';
import { Button } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchPerformances from '../../../../hooks/useFetchPerformances';

export default function PerformancesStep({ goNext }) {
  const [order, setOrder] = useOrderContext();
  const performanceHook = useFetchPerformances(order.show.alternative_id);
  const [performances] = performanceHook;

  const handleOnClick = perfSelected => {
    setOrder({ ...order, performance: perfSelected });
    goNext();
  };

  if (performances === undefined) {
    return <p>test</p>;
  }

  return (
    <ul>
      {performances.map(item => (
        <li key={item.node.id}>
          {item.node.date.french}
          <Button
            onClick={() => {
              handleOnClick(item.node);
            }}
          >
            Choisir
          </Button>
          {item.node.alternative_id === order.performance.alternative_id && (
            <span>Choisi</span>
          )}
        </li>
      ))}
    </ul>
  );
}
