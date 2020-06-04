import React, { useState } from 'react';
import { useOrderContext } from '../../../../hooks/OrderContext';
import SelectCategory from './SelectCategory';
import SelectPrice from './SelectPrice';
import PlacesList from './PlacesList';
import ModalInfosPlace from './ModalInfosPlace';

export default function PlacesStep({ goNext }) {
  const [order, setOrder] = useOrderContext();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  console.log('render places step', order);

  return (
    <>
      <h1>{order.show.title}</h1>
      <h2>{order.performance.date.french}</h2>
      <SelectCategory />
      <SelectPrice order={order} setOrder={setOrder} setOpen={setOpen} />
      <PlacesList order={order} />
      <ModalInfosPlace opened={open} close={handleClose} />
    </>
  );
}
