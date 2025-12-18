const router = require("express").Router();
const Group = require("../models/Group");
const auth = require("../middleware/authMiddleware");

// Create group
router.post("/", auth, async (req, res) => {
  const group = await Group.create({
    name: req.body.name,
    members: [req.user.id, ...req.body.members],
    admin: req.user.id
  });
  res.json(group);
});

// My groups
router.get("/", auth, async (req, res) => {
  const groups = await Group.find({ members: req.user.id });
  res.json(groups);
});

module.exports = router;
