import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

type ShowPageProps = {
  pageContext: any;
  data: any;
};

const ShowPage = ({ pageContext, data }: ShowPageProps) => {
  const { childImageSharp: image } = data.internalAccounts.shows
    .filter((show: any) => show.slug === pageContext.slug)
    .shift().featuredCover;

  return (
    <div
      style={{
        height: '100vh',
        width: '100eh',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {image !== null && (
        <Img
          durationFadeIn={1000}
          draggable={false}
          fluid={image.fluid}
          style={{ width: 600 }}
        />
      )}

      {pageContext.title}
    </div>
  );
};

export default ShowPage;

export const query = graphql`
  query PageBySlug($accountId: String!) {
    internalAccounts(id: { eq: $accountId }) {
      shows {
        slug
        featuredCover {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
