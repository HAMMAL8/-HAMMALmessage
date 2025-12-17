const Message = require("./models/Message");
const User = require("./models/User");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join", async (username) => {
      socket.username = username;
      socket.join(username);
      await User.findOneAndUpdate(
        { username },
        { online: true },
        { upsert: true }
      );
      io.emit("status");
    });

    socket.on("send", async (data) => {
      const msg = await Message.create(data);
      io.to(data.receiver).emit("receive", msg);
    });

    socket.on("disconnect", async () => {
      if (socket.username) {
        await User.updateOne(
          { username: socket.username },
          { online: false }
        );
        io.emit("status");
      }
      console.log("🔴 User disconnected");
    });
  });
};
