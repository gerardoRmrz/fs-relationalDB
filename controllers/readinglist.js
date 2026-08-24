const router = require("express").Router();
const { User, Blog, ReadingList, Session } = require("../models");
const { Op } = require("sequelize");
const tokenExtractor = require("../middlewares/user");

router.post("/", async (req, res) => {
  try {
    const { blogId, userId } = req.body;

    if (!blogId || !userId) {
      return res.status(400).send("User id or blog id is missing");
    }

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["passwordHash", "created_at", "updated_at"],
      },
    });

    if (!user) {
      return res.status(404).send("User does not exist in database");
    }

    const blogInRedingList = await ReadingList.findOne({
      where: {
        userId: userId,
        [Op.and]: { blogId: blogId },
      },
    });

    if (blogInRedingList) {
      return res.status(400).send("The blog is already in reading list");
    }

    const blog = await Blog.findByPk(blogId, {
      attributes: {
        exclude: ["created_at", "updated_at"],
      },
    });

    if (!blog) {
      return res.status(404).send("blog not founded.");
    }

    const readingList = (
      await ReadingList.create({
        userId: user.id,
        blogId: blog.id,
      })
    ).toJSON();

    return res.json({
      user_id: readingList.userId,
      blog_id: readingList.blogId,
      ...readingList,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const { id: userId, username } = req.decodeToken;

    const session = await Session.findAll({
      where: {
        userId: userId,
      },
    });

    if (session.length === 0) {
      return res.sendStatus(401);
    }

    const readingList = await ReadingList.findByPk(req.params.id);

    if (!readingList) {
      return res.sendStatus(404);
    }

    if (readingList.dataValues?.userId !== userId) {
      return res.sendStatus(401);
    }

    const data = await readingList.update(req.body, { returning: true });

    return res.json(data.dataValues);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
