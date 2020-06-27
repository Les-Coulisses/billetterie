import React from 'react';
import Img from 'gatsby-image';
import { ShowDto } from '../../../../types';
import { useOrderContext } from '../../../../hooks/OrderContext';
import { getPerformances, getCategories } from '../../../../utils';

interface ShowsItemProps {
  show: ShowDto;
}

export default function ShowsItem({ show }: ShowsItemProps) {
  const [order, setOrder, activeStep, setActiveStep] = useOrderContext();
  console.log('charge ShowItem');
  console.log('ShowItem, show', show);

  const handleOnClick = () => {
    setOrder({ ...order, show: show });
    const performances = getPerformances(show);
    if (performances.length === 1) {
      const performance = performances[0];
      const categories = getCategories(performance);
      if (categories.length === 1) {
        setOrder({
          ...order,
          show: show,
          performance: performance,
          category: categories[0]
        });
      } else {
        setOrder({
          ...order,
          show: show,
          performance: performance,
          category: undefined
        });
      }
    }
    setActiveStep(activeStep + 1);
  };
  return (
    <div onClick={handleOnClick}>
      {show.featuredCover && (
        <Img fluid={show.featuredCover?.childImageSharp.fluid} />
      )}
    </div>
  );
}
