const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server,{
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("socket", socket);

  socket.on("chat", (payload) => {
    console.log("Payload is ", payload);
    io.emit("chat", payload);
  });
});


server.listen(5001, () => {
  console.log("Server is listening on port 5000");
});
