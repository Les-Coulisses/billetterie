import React, { useContext } from 'react';
import Img from 'gatsby-image';
import { makeStyles, Button } from '@material-ui/core';
import { OrderStepProps, ShowDto, OrderState } from '../../../../types';
import { OrderStateContext } from '../../LinkOrder';

const useStyles = makeStyles(() => ({
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap'
  },
  showItem: {
    flex: '25%'
  }
}));

interface ShowsStepProps extends OrderStepProps {
  shows: ShowDto[];
}

export default function ShowsStep({ goNext, shows }: ShowsStepProps) {
  const classes = useStyles();
  const orderState: OrderState | undefined = useContext(OrderStateContext);
  if (orderState === undefined) {
    throw new Error(
      'rendering ShowsStep, orderState has unexpected value undefined'
    );
  }

  const handleOnClick = (showSelected: ShowDto) => {
    orderState.setOrder({ ...orderState.order, show: showSelected });
    goNext();
  };

  return (
    <ul className={classes.list}>
      {shows.map(item => (
        <li className={classes.showItem} key={item.id}>
          {item?.featuredCover?.childImageSharp?.fluid !== undefined && (
            <Img
              durationFadeIn={1000}
              draggable={false}
              fluid={item.featuredCover.childImageSharp.fluid}
            />
          )}
          <p>{item.title}</p>
          <Button
            onClick={() => {
              handleOnClick(item);
            }}
          >
            Prendre un billet
          </Button>
        </li>
      ))}
    </ul>
  );
}
