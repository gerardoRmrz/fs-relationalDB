const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");
const { User, Blog, Session } = require("../models");
const tokenExtractor = require("../middlewares/user");
const { logToFile } = require("../tests/helper");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
    where: {
      [Op.or]: [
        { title: { [Op.substring]: req.query.search ? req.query.search : "" } },
        {
          author: { [Op.substring]: req.query.search ? req.query.search : "" },
        },
      ],
    },
  });
  res.json(blogs);
});

router.get("/:id", blogFinder, async (req, res) => {
  res.json(req.blog);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodeToken.id);
    const session = await Session.findAll({
      where: {
        userId: user.id,
      },
    });

    if (session.length === 0) {
      return res.sendStatus(401);
    }

    const currentYear = new Date().getFullYear();

    if (req.body.year) {
      const isYearValid = req.body.year >= 1991 && req.body.year <= currentYear;
      if (!isYearValid) {
        throw new Error(`The year must be between 1991 and ${currentYear}`);
      }
    }

    const blog = (
      await Blog.create({ ...req.body, user_id: user.id })
    ).toJSON();

    res.json({ ...blog, blog_id: blog.id, user_id: blog.userId });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const { id } = await req.params;
    const blog = await Blog.findByPk(id);

    if (req.decodeToken.id === blog.userId) {
      await Blog.destroy({
        where: {
          id: id,
        },
      });
      res.status(204).end();
    } else {
      res.status(401).end();
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    const blog = req.blog;
    blog.likes = req.body.likes;
    blog.save();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
