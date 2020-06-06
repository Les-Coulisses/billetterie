import React, { useState, Dispatch, useContext } from 'react';
import SelectCategory from './SelectCategory';
import SelectPrice from './SelectPrice';
import PlacesList from './PlacesList';
import ModalInfosPlace from './ModalInfosPlace';
import { Button } from '@material-ui/core';
import { OrderStepProps, OrderDto, OrderState } from '../../../../types';
import { OrderStateContext } from '../../LinkOrder';

interface PlacesStepProps extends OrderStepProps {
  goPrev: () => void;
}

export default function PlacesStep({ goNext, goPrev }: PlacesStepProps) {
  const orderState: OrderState | undefined = useContext(OrderStateContext);
  if (orderState === undefined) {
    throw new Error(
      'rendering PlacesStep, orderState has unexpected value undefined'
    );
  }
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };
  const order = orderState.order;
  const setOrder = orderState.setOrder;

  return (
    <>
      <h1>{order.show?.title}</h1>
      <h2>{order.performance?.date?.french}</h2>
      <SelectCategory />
      <SelectPrice setOpen={setOpen} />
      <PlacesList />
      <ModalInfosPlace opened={open} close={handleClose} />
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
