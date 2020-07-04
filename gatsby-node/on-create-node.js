const { createRemoteFileNode } = require('gatsby-source-filesystem');

const createImgFluidNode = async (
  file,
  store,
  cache,
  createNode,
  createNodeId
) => {
  console.info('start create fluid image', file.url);
  return createRemoteFileNode({
    url: file.url,
    parentNodeId: file.id,
    createNode,
    createNodeId,
    cache,
    store
  });
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

module.exports = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
  create
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

    await shows.forEach(async (show, index) => {
      createImgFluidNode(
        { url: show.cover, id: show.id },
        store,
        cache,
        createNode,
        createNodeId
      )
        .then(fileNode => {
          // if the file was created, attach the new node to the parent node
          if (fileNode) {
            console.info(
              `fileNode for fluid cover ${fileNode.id} created successfully ${show.slug}`
            );
            // eslint-disable-next-line no-param-reassign
            node.shows[index].featuredImg___NODE = fileNode.id;
          }
        })
        .catch(error => {
          console.error(`failed for fluid cover ${show.slug}`, error);
        });
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
    } else {
      console.warn('No correct structure detected, no image to charge');
    }
  }
};
