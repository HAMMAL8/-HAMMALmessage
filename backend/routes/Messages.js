const router = require("express").Router();
const upload = require("../middleware/upload");
const Message = require("../models/Message");
const auth = require("../middleware/authMiddleware");

router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const msg = await Message.create({
    sender: req.user.id,
    receiver: req.body.receiver,
    type: req.file.mimetype.startsWith("image") ? "image" : "file",
    fileUrl: req.file.path
  });
  res.json(msg);
});

module.exports = router;
