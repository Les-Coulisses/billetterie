import React, { useState, createContext } from 'react';
import { Link } from 'gatsby';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import ModalOrder from './ModalOrder';
import { OrderDto } from 'types';
import { OrderState, OrderStateContext } from '../../hooks/OrderContext';

type LinkOrderProps = {
  style: CSSProperties;
};

const LinkOrder = ({ style }: LinkOrderProps) => {
  const [order, setOrder] = useState<OrderDto>({
    show: undefined,
    performance: undefined,
    category: undefined,
    places: []
  });
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const initialContextValues: OrderState = {
    order: order,
    setOrder: setOrder,
    activeStep: activeStep,
    setActiveStep: setActiveStep
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <OrderStateContext.Provider value={initialContextValues}>
      <Link to='/#' style={style} onClick={handleOpen}>
        Réserver
      </Link>

      <ModalOrder close={handleClose} opened={open} />
    </OrderStateContext.Provider>
  );
};

export default LinkOrder;
