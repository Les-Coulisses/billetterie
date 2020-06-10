import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useCallback
} from 'react';
import { OrderDto } from 'types';

export type OrderState = {
  order: OrderDto;
  setOrder: Dispatch<SetStateAction<OrderDto>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

export const OrderStateContext = createContext<OrderState | undefined>(
  undefined
);

export const useOrderContext = (): [
  OrderDto,
  (order: OrderDto) => void,
  number,
  (activeStep: number) => void
] => {
  const context = useContext(OrderStateContext);
  if (context === undefined) {
    throw new Error('useOrderContext called outside Context.');
  }

  const setterOrder = context.setOrder;
  const setOrderNonNull = useCallback(
    (order: OrderDto) => {
      setterOrder(order);
    },
    [setterOrder]
  );

  const setterStep = context.setActiveStep;
  const setStepNonNull = useCallback(
    (activeStep: number) => {
      setterStep(activeStep);
    },
    [setterStep]
  );

  return [context.order, setOrderNonNull, context.activeStep, setStepNonNull];
};
