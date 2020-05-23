import React from 'react';
import Img from 'gatsby-image';
import { getShows } from '../utils';

const ModalOrder = () => {
  const showsList = getShows();

  return (
    <>
      <ul>
        {showsList.map(item => (
          <li style={{ width: 250 }} key={item.node.id}>
            <Img
              durationFadeIn={1000}
              draggable={false}
              fluid={item.node.featuredCover.childImageSharp.fluid}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ModalOrder;
