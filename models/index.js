const Blog = require("./blog.js");
const User = require("./user.js");

User.hasMany(Blog);
Blog.belongsTo(User);

User.sync({ alter: true })
  .then(() => {
    return Blog.sync({ alter: true });
  })
  .then(() => {
    console.log("The tables have been synchronized");
  })
  .catch((error) => {
    console.error("Synchronization error: ", error);
  });

module.exports = {
  Blog,
  User,
};
