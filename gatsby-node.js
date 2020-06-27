/* eslint-disable no-console */
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const path = require('path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Show {
      id: String
      slug: String
      title: String
      cover: String
      featuredCover: File @link(from: "featuredImg___NODE")
    }
    type OptionsFile {
      id: String
      name: String
      url: String!
      img___NODE: File @link(from: "img___NODE")
    }
    type Options {
      files: [OptionsFile]
    }
    type Element {
      id: String
      position: String
      type: String
      options: Options
      alternative_children: [Element]
    }
    type Structure {
      homPage: Element
      showPage: Element
    }
    type internal__accounts implements Node {
      id: String
      shows: [Show]
      structure: Structure
    }
  `);
};

const createImgFluidNode = async (
  file,
  store,
  cache,
  createNode,
  createNodeId
) => {
  const fluidNode = await createRemoteFileNode({
    url: file.url,
    parentNodeId: file.id,
    createNode,
    createNodeId,
    cache,
    store
  });

  console.info(`charge file ${file.url} in node ${fluidNode.id}`);
  return fluidNode.id;
};

const createImgFluidElement = async (
  element,
  createNode,
  store,
  cache,
  createNodeId
) => {
  if (Array.isArray(element.options.files)) {
    element.options.files.forEach(async (file, index) => {
      const fileNodeId = await createImgFluidNode(
        file,
        store,
        cache,
        createNode,
        createNodeId
      );
      // if the file was created, attach the new node to the parent node
      if (fileNodeId) {
        // eslint-disable-next-line no-param-reassign
        element.options.files[index].img___NODE = fileNodeId;
        // eslint-disable-next-line no-console
        console.info(`charge file ${file.url} in node ${fileNodeId}`);
      }
    });
  }

  if (Array.isArray(element.alternative_children)) {
    element.alternative_children.forEach(async child => {
      await createImgFluidElement(
        child,
        createNode,
        store,
        cache,
        createNodeId
      );
    });
  }

  return element;
};

const createImgFluidShow = async (
  show,
  store,
  cache,
  createNode,
  createNodeId
) => {
  const fileNodeId = await createImgFluidNode(
    { url: show.cover, id: show.id },
    store,
    cache,
    createNode,
    createNodeId
  );

  return fileNodeId;
};

exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId
}) => {
  const nodeClone = node;
  // For all MarkdownRemark nodes that have a featured image url, call createRemoteFileNode
  if (
    nodeClone.id !== 'dummy' &&
    nodeClone.internal.type === 'internal__accounts'
  ) {
    const shows = nodeClone.shows.filter(
      show => show.cover !== null || show.cover !== undefined
    );
    shows.forEach(async (show, index) => {
      const fileNodeId = await createImgFluidShow(
        show,
        store,
        cache,
        createNode,
        createNodeId
      );
      // if the file was created, attach the new node to the parent node
      if (fileNodeId) {
        // eslint-disable-next-line no-param-reassign
        nodeClone.shows[index].featuredImg___NODE = fileNodeId;

        // eslint-disable-next-line no-console
        console.info(
          `charge cover ${fileNodeId} for show ${show.id} ${show.slug}`
        );
      }
    });

    if (
      nodeClone.structure !== undefined &&
      nodeClone.structure.homePage !== undefined
    ) {
      nodeClone.structure.homePage = await createImgFluidElement(
        nodeClone.structure.homePage,
        createNode,
        store,
        cache,
        createNodeId
      );
    }
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const showPage = path.resolve('./src/templates/ShowPage.tsx');
  return graphql(
    `
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
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors;
    } else {
      const accounts = result.data.allInternalAccounts.edges;
      accounts.forEach(account => {
        const pages = account.node.shows;
        pages.forEach(page => {
          if (page.slug) {
            createPage({
              path: `/${page.slug}`,
              component: showPage,
              context: {
                title: page.title,
                slug: page.slug,
                accountId: account.node.id
              }
            });
          }
        });
      });
    }
    return null;
  });
};
