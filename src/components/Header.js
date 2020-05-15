import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const styles = {
  image: {
    maxHeight: '100vh',
    height: '120%',
    overflow: 'hidden',
    zIndex: -1
  }
};

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "header" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Img
      style={styles.image}
      fluid={data.file.childImageSharp.fluid}
      // fadeIn={false}
      durationFadeIn={1000}
      draggable={false}
    />
  );
};

export default Header;
