const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../auth/jwt");
const passport = require("passport");

// Email Register
router.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body, password: hashed });
  res.json({ token: generateToken(user) });
});

// Email Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    return res.status(401).json({ msg: "Invalid credentials" });

  res.json({ token: generateToken(user) });
});

// Google Login
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  }
);

module.exports = router;
