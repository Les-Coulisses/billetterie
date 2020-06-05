import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from '@material-ui/core';
import { PriceDto, ModalProps, OrderDto } from '../../../../types';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textField: {
    margin: '0 10px'
  },

  submitWrapper: {
    marginTop: '1em',
    textAlign: 'center'
  }
}));

type PlaceType = {
  name: string;
  firstName: string;
  price: PriceDto | undefined;
};

interface ModalInfosPlaceProps extends ModalProps {
  order: OrderDto;
}

export default function ModalInfosPlace({
  opened,
  close,
  order
}: ModalInfosPlaceProps) {
  const classes = useStyles();
  const [place, setPlace] = useState<PlaceType>({
    name: '',
    firstName: '',
    price: undefined
  });
  const body = (
    <div className={classes.paper}>
      <form
        onSubmit={event => {
          event.preventDefault();
          place.price = order.price;
          if (Array.isArray(order.places)) {
            order.places.push(place);
          } else {
            order.places = [place];
          }
          setPlace({
            name: '',
            firstName: '',
            price: order.price
          });
          console.log(place);
          close();
        }}
      >
        <TextField
          id='place-firstname'
          label='Prénom'
          variant='outlined'
          className={classes.textField}
          value={place.firstName}
          required={true}
          onChange={event => {
            setPlace({ ...place, firstName: event.target.value });
          }}
        />
        <TextField
          id='place-name'
          label='Nom'
          variant='outlined'
          className={classes.textField}
          value={place.name}
          required={true}
          onChange={event => {
            setPlace({ ...place, name: event.target.value });
          }}
        />
        <div className={classes.submitWrapper}>
          <Button type='submit' variant='contained' color='primary'>
            Ajouter la place
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <Modal
        open={opened || false}
        onClose={close}
        className={classes.modal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Fade in={opened}>{body}</Fade>
      </Modal>
    </>
  );
}
