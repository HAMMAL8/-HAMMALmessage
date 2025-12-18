const Message = require("../models/Message");

module.exports = (io, socket) => {
  socket.on("join-group", groupId => socket.join(groupId));

  socket.on("group-message", async data => {
    const msg = await Message.create({
      sender: socket.userId,
      group: data.groupId,
      text: data.text
    });

    io.to(data.groupId).emit("group-receive", msg);
  });
};
