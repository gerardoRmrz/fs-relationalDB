const router = require("express").Router();

const { Blog } = require("../models");

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

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const blog = await Blog.create({ ...req.body });
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
