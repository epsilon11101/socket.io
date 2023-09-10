const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { socketController } = require("../sockets/controller");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.paths = {};

    this.accessLogStream = fs.createWriteStream(
      path.join(__dirname, "../logs/access.log"),
      { flags: "a" }
    );

    //Middlewares
    this.middlewares();
    //app routes
    this.routes();
    //Sockets
    this.sockets();
  }

  middlewares() {
    //CORS
    this.app.use(cors());
    //MORGAN
    this.app.use(morgan("combined", { stream: this.accessLogStream }));
    //public folder
    this.app.use(express.static("public"));
  }

  routes() {
    // this.app.use(this.paths.auth, require("../routes/auth.routes"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Server on:", this.port);
    });
  }
}

module.exports = Server;
