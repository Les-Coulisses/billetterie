import React from 'react';
import { Button } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchCategories from '../../../../hooks/useFetchCategories';

export default function SelectCategory() {
  const [order, setOrder] = useOrderContext();
  console.log('render Cateogry select', order);
  const categoryHook = useFetchCategories(order.performance.alternative_id);
  const [categories] = categoryHook;

  const handleOnClick = categorySelected => {
    setOrder({ ...order, category: categorySelected });
  };

  if (categories === undefined) {
    return <p>loading</p>;
  }

  return (
    <>
      <ul>
        {categories.map(item => (
          <li key={item.id}>
            {item.name} => {item.nb_places}
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
