const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readinglist");
const Session = require("./session");

// This assosiation is for users that upload a blog
User.hasMany(Blog);
Blog.belongsTo(User);

// Next association is for a reading list. A User can have many blogs in a reading list and a Blog can have many users as readers
User.belongsToMany(Blog, {
  through: ReadingList,
  foreignKey: "userId",
  as: "readings",
});

Blog.belongsToMany(User, {
  through: ReadingList,
  foreignKey: "blogId",
  as: "readers",
});

ReadingList.belongsTo(User, { foreignKey: "userId" });
ReadingList.belongsTo(Blog, { foreignKey: "blogId" });
User.hasMany(ReadingList, { foreignKey: "userId" });
Blog.hasMany(ReadingList, { foreignKey: "blogId" });

// COMENTAR  EN ../util/db.js la línea  runMigrations() CUANDO SE CREAN LAS BASES DE DATOS
// Don't use with syncronizations
/* User.sync({ alter: true, force: true }) // force: true borra y reconstruye todo;
  .then(() => {
    return Blog.sync({ alter: true, force: true });
  })
  .then(() => {
    console.log("The tables have been synchronized");
  })
  .catch((error) => {
    console.error("Synchronization error: ", error);
  }); */

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
};
