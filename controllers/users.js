const router = require("express").Router();

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(400).end();
  }
});

router.put("/:username", async (req, res) => {
  const { newUserName } = req.body;
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (!user) {
    res.status(404).end();
  } else {
    user.username = newUserName;
    user.save();
    res.json(user);
  }
});

module.exports = router;
