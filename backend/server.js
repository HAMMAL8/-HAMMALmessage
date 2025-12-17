require("dotenv").config();
const express = require("express");
const passport = require("./auth/passport");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(require("cors")());
app.use(passport.initialize());

app.use("/auth", authRoutes);
