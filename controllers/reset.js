const router = require("express").Router();
const { User, Blog, ReadingList, Session } = require("../models");

router.post("/", async (req, res) => {
  try {
    await Blog.truncate({ cascade: true });
    await User.truncate({ cascade: true });
    await ReadingList.truncate({ cascade: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  await res.status(200).json({ message: "Tables truncated successfully" });
});

module.exports = router;
