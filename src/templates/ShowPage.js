import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

const ShowPage = ({ pageContext, data }) => {
  const {
    fluid: coverFluid,
  } = data.internalShows.featuredCover.childImageSharp;

  return (
    <div
      style={{
        height: '100vh',
        width: '100eh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Img
        durationFadeIn={1000}
        draggable={false}
        fluid={coverFluid}
        style={{ width: 120 }}
      />
      {pageContext.slug}
    </div>
  );
};

export default ShowPage;

export const query = graphql`
  query PageBySlug($slug: String!) {
    internalShows(slug: { eq: $slug }) {
      featuredCover {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
