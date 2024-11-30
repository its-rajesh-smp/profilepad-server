import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "../constants/socket-events.const";

export default class SocketService {
  io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  /**
   * Initialize event listeners
   */
  initialize(): void {
    this.io.on(SOCKET_EVENTS.CONNECTION, (socket: Socket) => {
      console.log(`User connected: ${socket.id}`);

      // Setup event listeners
      this.setupListeners(socket);

      // Handle disconnection
      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        console.log(`User disconnected: ${socket.id}`);
      });
    });
  }

  /**
   * Setup event listeners for a specific socket
   * @param socket The connected socket instance
   */
  private setupListeners(socket: Socket): void {
    socket.on(SOCKET_EVENTS.PLAYER_JOINED, (data: any) => {
      socket.broadcast.emit(SOCKET_EVENTS.PLAYER_JOINED, data);
    });

    socket.on(SOCKET_EVENTS.PLAYER_MOVED, (data: any) => {
      socket.broadcast.emit(SOCKET_EVENTS.PLAYER_MOVED, data);
    });
    // Add more event listeners here
  }
}
