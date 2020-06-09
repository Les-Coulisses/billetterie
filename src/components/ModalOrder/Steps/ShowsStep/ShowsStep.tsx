import React from 'react';
import Img from 'gatsby-image';
import { makeStyles, Button } from '@material-ui/core';
import { ShowDto, PerformanceDto } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances } from '../../../../utils';

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

interface ShowsStepProps {
  shows: ShowDto[];
}

export default function ShowsStep({ shows }: ShowsStepProps) {
  const classes = useStyles();
  const [order, setOrder, activeStep, setActiveStep] = useOrderContext();
  console.log('render show step', order);

  const handleOnClick = (showSelected: ShowDto) => {
    setOrder({ ...order, show: showSelected });
    const performances: PerformanceDto[] = getPerformances(showSelected);
    if (performances.length === 1) {
      setOrder({ ...order, show: showSelected, performance: performances[0] });
    }
    console.log('on chose show', order);
    setActiveStep(activeStep + 1);
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
