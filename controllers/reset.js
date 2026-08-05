const router = require("express").Router();
const { User, Blog } = require("../models");

router.post("/", async (req, res) => {
  await Blog.truncate({ cascade: true });
  await User.truncate({ cascade: true });
  res.status(200).json({ message: "Tables truncated successfully" });
});

module.exports = router;
