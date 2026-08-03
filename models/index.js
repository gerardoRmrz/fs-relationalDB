const Blog = require("./blog.js");
const User = require("./user.js");

Blog.sync();
User.sync();

module.exports = {
  Blog,
  User,
};
