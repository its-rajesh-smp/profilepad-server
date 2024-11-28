import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SOCKET } from "./api/constants/app.const";
import router from "./api/routes/index.routes";
import SocketService from "./api/services/Socket.service";

export const app = express();
const httpServer = createServer(app);

/* Initialize Socket.IO */
const io =
  SOCKET &&
  new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

/* Middlewares */
app.use(express.json());
app.use(cors({ origin: "*" }));

/* Routes */
app.use(router);

/* Creating a new instance of SocketService and initializing it */
if (io) {
  new SocketService(io).initialize();
}

/* Start Server */
httpServer.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
