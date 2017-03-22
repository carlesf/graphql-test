const typeDefinitions = `
type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}

type Query {
  getAuthors: [Author]
  author(firstName: String, lastName: String): Author
  getFortuneCookie(id: String!): String
}

schema {
  query: Query
}
`;

export default [typeDefinitions];