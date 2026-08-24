const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { Op } = require("sequelize");

const { User, Blog, ReadingList } = require("../models");
const { decrypt } = require("dotenv");

router.get("/", async (req, res) => {
  const users = await User.findAll({
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
    ],
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
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["passwordHash", "id", "created_at", "updated_at"],
      },
      include: [
        {
          model: Blog,
          as: "readings",
          attributes: {
            exclude: ["userId", "user_id", "created_at", "updated_at"],
          },
          through: {
            as: "reading_list",
            attributes: {
              exclude: ["user_id", "blogId", "created_at", "updated_at"],
            },
          },
        },
      ],
    });

    if (!user) {
      return res.status(404).send("User not founded").end();
    }

    let result = user.toJSON();

    if (req.query.read !== undefined) {
      const isRead = req.query.read === "true";
      result.readings = result.readings.filter(
        (item) => item.reading_list.read === isRead,
      );
    }

    res.json(result);
  } catch (error) {
    console.error("Error in the route: ", error);
    res.status(500).json({ error: "Internal server error" });
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
