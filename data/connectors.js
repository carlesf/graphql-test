import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

import rp from 'request-promise';

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const AuthorModel = db.define('author', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
});

const PostModel = db.define('post', {
  title: { type: Sequelize.STRING },
  text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

// create mock data with a seed, so we always get the same
/*
casual.seed(123);
db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return AuthorModel.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).then((author) => {
      return author.createPost({
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      });
    });
  });
});
*/

const FortuneCookie = {
  getOne(id) {
    return rp('http://62.14.219.13:8280/replan/projects/'+id)
      .then((res) => JSON.parse(res))
      .then((res) => {
        return res.description;
      });
  },
};

const Author = db.models.author;
const Post = db.models.post;

export { Author, Post, FortuneCookie };