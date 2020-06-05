import React, { useState, Dispatch } from 'react';
import SelectCategory from './SelectCategory';
import SelectPrice from './SelectPrice';
import PlacesList from './PlacesList';
import ModalInfosPlace from './ModalInfosPlace';
import { Button } from '@material-ui/core';
import { OrderStepProps, OrderDto } from '../../../../types';

interface PlacesStepProps extends OrderStepProps {
  goPrev: () => void;
  order: OrderDto;
  setOrder: Dispatch<React.SetStateAction<OrderDto>>;
}

export default function PlacesStep({
  goNext,
  goPrev,
  order,
  setOrder
}: PlacesStepProps) {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <h1>{order.show?.title}</h1>
      <h2>{order.performance?.date?.french}</h2>
      <SelectCategory order={order} setOrder={setOrder} />
      <SelectPrice order={order} setOrder={setOrder} setOpen={setOpen} />
      <PlacesList order={order} />
      <ModalInfosPlace opened={open} close={handleClose} order={order} />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        disabled={order.places === undefined || order.places.length === 0}
        onClick={goNext}
      >
        Suivant
      </Button>
    </>
  );
}
