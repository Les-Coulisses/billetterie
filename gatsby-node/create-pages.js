const path = require('path');

const query = `
{
  allInternalAccounts(filter: { id: { ne: "dummy" } }) {
    edges {
      node {
        id
        shows {
          title
          slug
        }
      }
    }
  }
}
`;

module.exports = ({ graphql, actions }) => {
  const { createPage } = actions;
  const showPage = path.resolve('./src/templates/ShowPage.tsx');

  const createAccountPage = account => {
    const pages = account.node.shows;

    pages.forEach(
      page =>
        page.slug &&
        createPage({
          path: `/${page.slug}`,
          component: showPage,
          context: {
            title: page.title,
            slug: page.slug,
            accountId: account.node.id
          }
        })
    );
  };

  const handleQuery = result => {
    if (result.errors) {
      throw result.errors;
    } else {
      const accounts = result.data.allInternalAccounts.edges;
      accounts.forEach(account => createAccountPage(account));
    }
    return null;
  };

  return graphql(query).then(result => handleQuery(result));
};
