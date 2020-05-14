const { createRemoteFileNode } = require("gatsby-source-filesystem");
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type internal__shows implements Node {
      id: String
      slug: String
      title: String
      cover: Frontmatter
      featuredImg: File @link(from: "featuredImg___NODE")
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
    let fileNode = await createRemoteFileNode({
      url: node.cover.url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    });
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.featuredImg___NODE = fileNode.id;
    }
  }
};
