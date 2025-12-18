const Message = require("../models/Message");

module.exports = (io, socket) => {
  socket.on("delivered", async msgId => {
    await Message.findByIdAndUpdate(msgId, { status: "delivered" });
  });

  socket.on("read", async msgId => {
    await Message.findByIdAndUpdate(msgId, { status: "read" });
    io.emit("read-update", msgId);
  });
};
