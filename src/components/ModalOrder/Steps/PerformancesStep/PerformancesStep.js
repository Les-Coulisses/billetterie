import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances } from '../../../../utils';

const useStyles = makeStyles(() => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap'
  },
  showItem: {
    flex: '25%'
  }
}));

export default function PerformancesStep({ goNext }) {
  const [order, setOrder] = useOrderContext();
  const [performances, setPerformances] = useState([]);
  /* const retrievedPerformances = getPerformances(order.id);
  useEffect(() => {
    setPerformances(retrievedPerformances);
  }, [retrievedPerformances]); */
  console.log('performances', performances);
  return (
    <ul>
      {performances.map(item => (
        <li>{item.node.daet.french}</li>
      ))}
    </ul>
  );
}
