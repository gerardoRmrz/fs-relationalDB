const Blog = require("./blog.js");
const User = require("./user.js");

User.hasMany(Blog);
Blog.belongsTo(User);

// Don't use with syncronizations
/* User.sync({ alter: true, force: true }) // force: true borra y reconstruye todo;
  .then(() => {
    return Blog.sync({ alter: true });
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
};
