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
    allInternalDomains {
      edges {
        node {
          domain
        }
      }
    }
  }
`;

const ModalOrder = () => {
  const data = useStaticQuery(query);
  const { edges: showsList } = data.allInternalShows;
  const { edges: domains } = data.allInternalDomains;

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
      <ul>
        {domains.map(item => (
          <li>{item.node.domain}</li>
        ))}
      </ul>
    </>
  );
};

export default ModalOrder;
