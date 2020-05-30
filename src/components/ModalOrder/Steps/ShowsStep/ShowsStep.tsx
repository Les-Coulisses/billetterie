import React from 'react';
import Img from 'gatsby-image';
import { makeStyles, Button } from '@material-ui/core';
import { useOrderContext } from '../../../../hooks/OrderContext';
import useFetchShows from '../../../../hooks/useFetchShows';

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
  const [showsList] = useFetchShows();
  const classes = useStyles();
  const [order, setOrder] = useOrderContext();
  console.log('render ShowStep', order);

  const handleOnClick = showSelected => {
    setOrder({ show: showSelected });
    goNext();
  };

  if (showsList === undefined) {
    return <p>Loading</p>;
  }

  console.log('shows list', showsList);

  return (
    <ul className={classes.list}>
      {showsList.map(item => (
        <li className={classes.showItem} key={item.id}>
          <Img
            durationFadeIn={1000}
            draggable={false}
            fluid={item.featuredCover.childImageSharp.fluid}
          />
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
