import React, { useState } from 'react';
import SelectCategory from './SelectCategory';
import SelectPrice from './SelectPrice';
import PlacesList from './PlacesList';
import ModalInfosPlace from './ModalInfosPlace';
import { Button } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';

export default function PlacesStep() {
  const [order, , activeStep, setActiveStep] = useOrderContext();
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => {
    setOpen(false);
  };

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
        onClick={() => {
          setActiveStep(activeStep + 1);
        }}
        disabled={order.places === undefined || order.places.length === 0}
      >
        Suivant
      </Button>
    </>
  );
}
