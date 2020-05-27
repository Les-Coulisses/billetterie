import React from 'react';
import Img from 'gatsby-image';
import { makeStyles } from '@material-ui/core';
import { getShows } from '../../../../utils';

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

export default function ShowsStep() {
  const showsList = getShows();
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {showsList.map(item => (
        <li className={classes.showItem} key={item.node.id}>
          <Img
            durationFadeIn={1000}
            draggable={false}
            fluid={item.node.featuredCover.childImageSharp.fluid}
          />
        </li>
      ))}
    </ul>
  );
}
