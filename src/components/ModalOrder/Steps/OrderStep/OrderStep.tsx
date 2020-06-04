import React from 'react';
import { Button, TextField, FormControl } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import PlacesList from '../PlacesStep/PlacesList';

export default function OrderStep({ goNext }) {
  const [order, setOrder] = useOrderContext();

  return (
    <>
      <PlacesList order={order} />
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
