const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

connectDB();
require("./socket")(io);

server.listen(5000, () =>
  console.log("🚀 Backend running on http://localhost:5000")
);
