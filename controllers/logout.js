const router = require("express").Router();
const { sequelize } = require("sequelize");
const Session = require("../models/session");
const tokenExtractor = require("../middlewares/user");
const { logToFile } = require("../tests/helper");

router.delete("/", tokenExtractor, async (req, res, next) => {
  const { id: userId } = req.decodeToken;

  try {
    const sessions = await Session.findAll({
      where: {
        userId: userId,
      },
    });

    console.log(
      "LOGOUT ================> ",
      req.get("Authorization").substring(7),
      req.decodeToken,
    );
    logToFile(
      "LOGOUT" +
        JSON.stringify(
          req.get("Authorization").substring(7) +
            JSON.stringify(req.decodeToken),
        ),
    );

    for (session of sessions) {
      console.log(`Borrando `, session.toJSON());
      await session.destroy();
    }

    const nonDeletedSessions = await Session.findAll({
      where: {
        userId: userId,
      },
    });

    if (nonDeletedSessions.length > 0) {
      return res.sendStatus(400);
    }

    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
