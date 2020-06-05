import React, { Dispatch } from 'react';
import { Button } from '@material-ui/core';
import { CategoryDto, OrderDto } from 'types';

interface SelectCategoryProps {
  order: OrderDto;
  setOrder: Dispatch<React.SetStateAction<OrderDto>>;
}

export default function SelectCategory({
  order,
  setOrder
}: SelectCategoryProps) {
  const handleOnClick = (categorySelected: CategoryDto) => {
    setOrder({ ...order, category: categorySelected });
  };

  const categories: CategoryDto[] =
    order.performance?.categories !== undefined
      ? order.performance.categories
      : [];

  return (
    <>
      <ul>
        {categories.map(item => (
          <li key={item.alternative_id}>
            {item.name} => {item.nb_places}
            <Button
              onClick={() => {
                handleOnClick(item);
              }}
            >
              Choisir
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
