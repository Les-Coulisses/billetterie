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
};

export const OrderStateContext = createContext<OrderState | undefined>(
  undefined
);

export const useOrderContext = (): [OrderDto, (order: OrderDto) => void] => {
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

  return [context.order, setOrderNonNull];
};
