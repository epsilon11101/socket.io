const socketController = (socket) => {
  socket.on("disconnect", () => {
    console.log("disconnected client", socket.id);
  });

  //cuando el cliente lo emite
  socket.on("send-message", (payload, callback) => {
    payload.id = socket.id;
    const id = 123456;
    //se envia como retroalimentacion cuando todo sucede correctamente al cliente especifico
    callback({
      id,
      date: new Date().getTime(),
    });

    //cuando el servidor lo envia a todos
    socket.broadcast.emit("send-message", payload);
  });
};

module.exports = {
  socketController,
};
