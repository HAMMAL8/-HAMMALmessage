const router = require("express").Router();
const User = require("../models/User");
const FriendRequest = require("../models/FriendRequest");
const auth = require("../middleware/authMiddleware");

// Send request
router.post("/request/:id", auth, async (req, res) => {
  await FriendRequest.create({ from: req.user.id, to: req.params.id });
  res.json({ msg: "Request sent" });
});

// Accept request
router.post("/accept/:id", auth, async (req, res) => {
  const reqDoc = await FriendRequest.findById(req.params.id);
  reqDoc.status = "accepted";
  await reqDoc.save();

  await User.findByIdAndUpdate(reqDoc.from, { $push: { friends: reqDoc.to } });
  await User.findByIdAndUpdate(reqDoc.to, { $push: { friends: reqDoc.from } });

  res.json({ msg: "Friend added" });
});

// Get friends
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate("friends");
  res.json(user.friends);
});

module.exports = router;
