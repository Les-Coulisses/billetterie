const { createRemoteFileNode } = require('gatsby-source-filesystem');

const createImgFluidNode = async ({
  file,
  store,
  cache,
  createNode,
  createNodeId
}) => {
  console.info('start create fluid image', file.url);
  return createRemoteFileNode({
    url: file.url,
    parentNodeId: file.id,
    createNode: createNode,
    createNodeId: createNodeId,
    cache: cache,
    store: store
  });
};

const createShowPage = async ({
  nodeClone,
  store,
  cache,
  createNode,
  createNodeId
}) => {
  await nodeClone.forEach(async (show, index) => {
    createImgFluidNode({
      file: { url: show.cover, id: show.id },
      store: store,
      cache: cache,
      createNode: createNode,
      createNodeId: createNodeId
    })
      .then(fileNode => {
        // if the file was created, attach the new node to the parent node
        if (fileNode) {
          console.info(
            `fileNode for fluid cover ${fileNode.id} created successfully ${show.slug}`
          );
          nodeClone[index].featuredImg___NODE = fileNode.id;
        }
      })
      .catch(error =>
        console.error(`failed for fluid cover ${show.slug}`, error)
      );
  });
};

const createImgFluidElement = async ({
  element,
  createNode,
  store,
  cache,
  createNodeId
}) => {
  if (Array.isArray(element.options.files)) {
    element.options.files.forEach(async (file, index) => {
      const fileNodeId = await createImgFluidNode({
        file: file,
        store: store,
        cache: cache,
        createNode: createNode,
        createNodeId: createNodeId
      });
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
      await createImgFluidElement({
        child: child,
        createNode: createNode,
        store: store,
        cache: cache,
        createNodeId: createNodeId
      });
    });
  }

  return element;
};

module.exports = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId
}) => {
  const nodeClone = node;

  const isInternalAccount =
    nodeClone.id !== 'dummy' &&
    nodeClone.internal.type === 'internal__accounts';

  if (isInternalAccount) {
    const filteredNodeClone = nodeClone.shows.filter(
      show => show.cover !== null || show.cover !== undefined
    );

    createShowPage({
      nodeClone: filteredNodeClone,
      createNode: createNode,
      store: store,
      cache: cache,
      createNodeId: createNodeId
    });
  }

  const isStructure =
    nodeClone.structure !== undefined &&
    nodeClone.structure.homePage !== undefined;

  if (isStructure) {
    nodeClone.structure.homePage = await createImgFluidElement({
      element: nodeClone.structure.homePage,
      createNode: createNode,
      store: store,
      cache: cache,
      createNodeId: createNodeId
    });
  }
};
