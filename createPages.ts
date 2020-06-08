import { resolve } from 'path';
import { ShowDto } from './src/types';

interface PageInput {
  path: string;
  component: string;
  layout?: string;
  context?: any;
}

interface BoundActionCreators {
  createPage: (page: PageInput) => void;
  deletePage: (page: PageInput) => void;
  createRedirect: (opts: {
    fromPath: string;
    isPermanent?: boolean;
    redirectInBrowser?: boolean;
    toPath: string;
  }) => void;
}

type GatsbyCreatePages = (fns: {
  graphql: any;
  boundActionCreators: BoundActionCreators;
}) => void;

type GraphqlResultType = {
  errors: Error;
  data: {
    allInternalShows: {
      edges: { node: ShowDto }[];
    };
  };
};

export const createPages: GatsbyCreatePages = ({
  graphql,
  boundActionCreators
}) => {
  const { createPage } = boundActionCreators;
  const showPage = resolve('./src/templates/ShowPage.tsx');
  return graphql(
    `
      {
        allInternalShows {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `
  ).then((result: GraphqlResultType) => {
    if (result.errors) {
      throw result.errors;
    } else {
      const pages = result.data.allInternalShows.edges;
      pages.forEach(page => {
        if (page.node.slug) {
          createPage({
            path: `/${page.node.slug}`,
            component: showPage,
            context: { title: page.node.title, slug: page.node.slug }
          });
        }
      });
    }
    return null;
  });
};
