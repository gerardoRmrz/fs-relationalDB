const router = require("express").Router();
const { User, Blog } = require("../models");

router.post("/", async (req, res) => {
  const { blogId, userId } = req.body;
});

module.exports = router;
