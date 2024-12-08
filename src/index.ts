import cors from "cors";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import router from "./api/routes/index.routes";
import SocketService from "./api/services/Socket.service";

export const app = express();
const httpServer = createServer(app);

/* Initialize Socket.IO */
const io = new Server(httpServer, {
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
new SocketService(io).initialize();

/* Start Server */
const port = parseInt(process.env.PORT || "3000");

httpServer.listen(port, "0.0.0.0", () => {
  console.log(`Server started on port ${port}`);
});
