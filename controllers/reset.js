const router = require("express").Router();
const { User, Blog, ReadingList, Session } = require("../models");

router.post("/", async (req, res) => {
  try {
    await Blog.truncate({ cascade: true, restartIdentity: true });
    await User.truncate({ cascade: true, restartIdentity: true });
    await ReadingList.truncate({ cascade: true, restartIdentity: true });
    await Session.truncate({ restartIdentity: true });
    return res.status(200).json({ message: "Tables truncated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
