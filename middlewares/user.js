const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const session = await Session.findOne({ token });

      console.log("tokenExtractor>>>>>>>>>>> ", JSON.stringify(session));

      if (!session) {
        return res.sendStatus(401);
      }

      req.decodeToken = jwt.verify(token, SECRET);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = tokenExtractor;
