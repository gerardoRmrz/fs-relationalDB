const { SECRET } = require("../util/config");
const { jwt } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["passwordHash"],
    },
    include: {
      model: Blog,
      attributes: {
        exclude: ["userId", "created_at", "updated_at"],
      },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const user = await User.create({
      username,
      name,
      passwordHash,
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ["passwordHash"],
    },
    include: [
      {
        model: Blog,
        attributes: {
          exclude: ["userId", "created_at", "updated_at"],
        },
      },
      {
        model: Blog,
        as: "readings",
        attributes: {
          exclude: ["userId", "created_at", "updated_at"],
        },
        through: {
          attributes: [],
        },
      },
      {
        model: ReadingList,
        attributes: {
          exclude: ["userId", "blogId", "created_at", "updated_at"],
        },
      },
    ],
  });
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
