const router = require("express").Router();
const { sequelize } = require("sequelize");
const Session = require("../models/session");
const tokenExtractor = require("../middlewares/user");

router.delete("/", tokenExtractor, async (req, res, next) => {
  try {
    Session.update(
      {
        active: false,
      },
      {
        where: { token: req.authorization },
      },
    );
  } catch (error) {
    next(error);
  }
});

module.exports = router;
