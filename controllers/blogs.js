const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      req.decodeToken = jwt.verify(authorization.substring(7), SECRET);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

const { User, Blog } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (!req.blog) {
    return res.status(404).end();
  }
  next();
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.get("/id", blogFinder, async (req, res) => {
  res.json(req.note);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodeToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = await req.params;
  try {
    const blog = await Blog.destroy({
      where: {
        id: id,
      },
    });
    res.status(204).json({});
  } catch (error) {
    console.error(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    const blog = req.blog;
    blog.likes++;
    blog.save();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
