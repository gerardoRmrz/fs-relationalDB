const Blog = require("./blog");
const User = require("./user");
const ReadingList = require("./readinglist");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, {
  through: ReadingList,
  as: "readings",
  foreignKey: "userId",
});

Blog.belongsToMany(User, {
  through: ReadingList,
  as: "users_marked",
  foreignKey: "blogId",
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
};
