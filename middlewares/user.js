const { SECRET } = require("../util/config");
const jwt = require("jsonwebtoken");
const Session = require("../models/session");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      const { active } = await Session.findOne({ token });
      if (!active) {
        throw new Error("Token expired");
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
