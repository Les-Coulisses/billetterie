import { useStaticQuery, graphql } from 'gatsby';

export const query = graphql`
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
    allInternalDomains {
      edges {
        node {
          domain
          account_id
        }
      }
    }
    allInternalPerformances {
      edges {
        node {
          id
          alternative_id
          show_id
          date {
            timestamp
            default
            french
          }
        }
      }
    }
    allInternalCategories {
      edges {
        node {
          id
          alternative_id
          performance_id
          name
          nb_places
        }
      }
    }
    allInternalPrices {
      edges {
        node {
          id
          alternative_id
          amount
          rate {
            alternative_id
            name
          }
          category {
            alternative_id
          }
          performance {
            alternative_id
          }
        }
      }
    }
  }
`;

export function getAccountId() {
  const data = useStaticQuery(query);
  const filterResult = data.allInternalDomains.edges.filter(
    item => item.node.domain === window.location.origin
  );
  const first = [...filterResult].shift();
  return first.node.account_id;
}

export function getShows() {
  const data = useStaticQuery(query);
  return data.allInternalShows.edges.filter(
    item => item.node.account_id === getAccountId()
  );
}
