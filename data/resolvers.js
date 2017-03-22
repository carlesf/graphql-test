import { Author, FortuneCookie} from './connectors';

const resolvers = {
  Query: {
    author(_, args) {
      return Author.find({ where: args });
    },
    getAuthors(_, args) {
      return Author.findAll({ attributes: args});
    },
    getFortuneCookie(_, args) {
      return FortuneCookie.getOne(args.id);
    },
  },
  Author: {
    posts(author) {
      return author.getPosts();
    },
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
  },
};

export default resolvers;