const User = require("../models/User");

module.exports = (io, socket) => {
  socket.on("online", async userId => {
    socket.userId = userId;
    await User.findByIdAndUpdate(userId, { online: true });
    io.emit("presence", { userId, online: true });
  });

  socket.on("disconnect", async () => {
    if (socket.userId) {
      await User.findByIdAndUpdate(socket.userId, { online: false });
      io.emit("presence", { userId: socket.userId, online: false });
    }
  });
};
