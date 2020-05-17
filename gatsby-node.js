const { createRemoteFileNode } = require("gatsby-source-filesystem");
const path = require("path");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type internal__shows implements Node {
      id: String
      slug: String
      title: String
      cover: Frontmatter
      featuredCover: File @link(from: "featuredImg___NODE")
    }
    type Frontmatter {
      id: String
      url: String
      path: String
      thumb: [String!]!
    }
  `);
};

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (
    node.id !== "dummy" &&
    node.internal.type === "internal__shows" &&
    node.cover.url !== null
  ) {
    const fileNode = await createRemoteFileNode({
      url: node.cover.url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      // eslint-disable-next-line no-param-reassign
      node.featuredImg___NODE = fileNode.id;
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const showPage = path.resolve("./src/templates/ShowPage.js");
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
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    } else {
      const pages = result.data.allInternalShows.edges;
      pages.forEach((page) => {
        if (page.node.slug) {
          createPage({
            path: `/${page.node.slug}`,
            component: showPage,
            context: { title: page.node.title, slug: page.node.slug },
          });
        }
      });
    }
    return null;
  });
};
