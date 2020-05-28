import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import StepperOrder from './StepperOrder';
import { OrderProvider } from '../../hooks/OrderContext';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '75vw',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflowY: 'scroll',
    maxHeight: '95vh'
  },
  modal: {
    maxHeight: '90vh',
    top: '2.5vh !important',
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function SimpleModal({ opened, close }) {
  const classes = useStyles();
  const [order, setOrder] = useState({
    show: undefined,
    performance: undefined
  });
  // getModalStyle is not a pure function, we roll the style only on the first render

  const body = (
    <div className={classes.paper}>
      <StepperOrder />
    </div>
  );

  return (
    <OrderProvider value={{ order, setOrder }}>
      <Modal
        open={opened || false}
        onClose={close}
        className={classes.modal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Fade in={opened}>{body}</Fade>
      </Modal>
    </OrderProvider>
  );
}
