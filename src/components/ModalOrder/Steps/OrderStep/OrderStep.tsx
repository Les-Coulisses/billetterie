import React, { useContext } from 'react';
import { Button, TextField, FormControl } from '@material-ui/core';
import PlacesList from '../PlacesStep/PlacesList';
import { OrderStepProps, OrderState } from '../../../../types';
import { OrderStateContext } from 'components/ModalOrder/LinkOrder';

export default function OrderStep({ goNext }: OrderStepProps) {
  const orderState: OrderState | undefined = useContext(OrderStateContext);
  if (orderState === undefined) {
    throw new Error(
      'rendering OrderStep, orderState has unexpected value undefined'
    );
  }
  const order = orderState.order;
  const setOrder = orderState.setOrder;
  return (
    <>
      <PlacesList />
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Prénom'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Nom'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Email'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Confirmation email'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Adresse'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Complément adresse'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Code postal'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id='place-firstname'
          label='Ville'
          variant='outlined'
          required={true}
        />
      </FormControl>
      <Button color='primary' variant='contained'>
        Payer
      </Button>
    </>
  );
}
