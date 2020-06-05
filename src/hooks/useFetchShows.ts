import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { ShowDto } from '../types';

const query = graphql`
  {
    allInternalShows(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          alternative_id
          id
          account_id
          title
          slug
          featuredCover {
            childImageSharp {
              fluid(maxWidth: 1500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

const useFetchShows = (): [ShowDto[], Dispatch<SetStateAction<ShowDto[]>>] => {
  const data = useStaticQuery(query);
  const [shows, setShows] = useState<ShowDto[]>(undefined);

  useEffect(() => {
    setShows(data.allInternalShows.edges.map(item => item.node));
  }, []);

  return [shows, setShows];
};

export default useFetchShows;
