import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

type ShowPageProps = {
  pageContext: any;
  data: any;
};

const ShowPage = ({ pageContext, data }: ShowPageProps) => {
  const { fluid: coverFluid } = data.internalAccounts.shows
    .filter((show: any) => show.slug === pageContext.slug)
    .shift().featuredCover.childImageSharp;

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
      <Img
        durationFadeIn={1000}
        draggable={false}
        fluid={coverFluid}
        style={{ width: 600 }}
      />
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
