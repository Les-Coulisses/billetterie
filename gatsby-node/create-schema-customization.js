const types = `
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
`;

module.exports = ({ actions }) => actions.createTypes(types);
