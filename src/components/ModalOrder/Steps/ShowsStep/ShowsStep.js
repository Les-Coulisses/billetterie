import React from 'react';
import Img from 'gatsby-image';
import { makeStyles, Button } from '@material-ui/core';
import { getShows } from '../../../../utils';
import { useOrderContext } from '../../../../hooks/OrderContext';

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

export default function ShowsStep({ goNext }) {
  const showsList = getShows();
  const classes = useStyles();
  const [order, setOrder] = useOrderContext();

  const handleOnClick = showId => {
    setOrder({ ...order, show: showId });
    goNext();
  };

  return (
    <ul className={classes.list}>
      {showsList.map(item => (
        <li className={classes.showItem} key={item.node.id}>
          {item.node.alternative_id === order.show && <span>Choisi</span>}
          <Img
            durationFadeIn={1000}
            draggable={false}
            fluid={item.node.featuredCover.childImageSharp.fluid}
          />
          <Button
            onClick={() => {
              handleOnClick(item.node.alternative_id);
            }}
          >
            Prendre un billet
          </Button>
        </li>
      ))}
    </ul>
  );
}
