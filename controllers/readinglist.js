const router = require("express").Router();
const { User, Blog, ReadingList } = require("../models");
const { Op } = require("sequelize");
const tokenExtractor = require("../middlewares/user");

router.post("/", async (req, res) => {
  console.log("///////////////////>>> ", req.body);
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

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const { id: userId } = req.decodeToken;

    const user = await User.findByPk(userId, {
      include: ReadingList,
    });

    const [readingList] = user.readinglists.filter(
      (item) => item.dataValues.id === Number(req.params.id),
    );

    if (!readingList) {
      throw new Error(" The reading list does not exist ");
    }

    await readingList.update({ read: true });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
