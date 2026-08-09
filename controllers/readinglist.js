const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;
  const user = await User.findByPk(userId, {
    attributes: {
      exclude: ["passwordHash", "created_at", "updated_at"],
    },
  });

  if (!user) {
    throw new Error("error: user not founded.");
  }

  const blog = await Blog.findByPk(blogId, {
    attributes: {
      exclude: ["created_at", "updated_at"],
    },
  });

  if (!blog) {
    throw new Error("error: blog not founded.");
  }

  console.log(user.id, blog.id);

  const readingList = await ReadingList.create({
    userId: user.id,
    blogId: blog.id,
  });

  res.json(readingList);
});

module.exports = router;
