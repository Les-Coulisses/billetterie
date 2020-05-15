import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  {
    allInternalShows(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          alternative_id
          id
          featuredCover {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

const ModalOrder = () => {
  const data = useStaticQuery(query);
  const { edges: shows } = data.allInternalShows;

  console.log(shows);

  return (
    <ul>
      {shows.map((item) => (
        <li style={{ width: '250px' }} key={item.node.id}>
          <Img
            durationFadeIn={1000}
            draggable={false}
            fluid={item.node.featuredCover.childImageSharp.fluid}
          />
        </li>
      ))}
    </ul>
  );
};

export default ModalOrder;
