const Blog = require("./blog.js");
const User = require("./user.js");
const ReadingList = require("./user_readinglist.js");
const UserReadingList = require("./user_readinglist.js");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(ReadingList, { through: UserReadingList });
ReadingList.belongsToMany(User, { through: UserReadingList });
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
  UserReadingList,
  ReadingList,
};
