import { createContext, useContext, useCallback } from 'react';

const OrderContext = createContext(null);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === null) {
    throw new Error('useOrderContext called outside Context.');
  }

  const setter = context.setOrder;
  const setOrderNonNull = useCallback(
    order => {
      setter(order);
    },
    [setter]
  );

  return [context.order, setOrderNonNull];
};

export const OrderProvider = OrderContext.Provider;
