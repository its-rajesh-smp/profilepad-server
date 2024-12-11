import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "../constants/socket-events.const";

const mapPlayerIdToSocketId: { [key: string]: any } = {};

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
      // console.log("A user connected" + socket.id);
      // Setup event listeners
      this.setupListeners(socket);

      // Handle disconnection
      socket.on(SOCKET_EVENTS.DISCONNECT, () => {
        // console.log("A user disconnected" + socket.id);
        delete mapPlayerIdToSocketId[socket.id];
      });
    });
  }

  /**
   * Setup event listeners for a specific socket
   * @param socket The connected socket instance
   */
  private setupListeners(socket: Socket): void {
    socket.on(SOCKET_EVENTS.PLAYER_JOINED, (data: any) => {
      // Notify the new player about the existing players
      socket.emit(
        SOCKET_EVENTS.PRE_SPAWN_EXISTING_PLAYERS,
        Object.values(mapPlayerIdToSocketId)
      );

      // Add the new player to the map
      mapPlayerIdToSocketId[data.playerId] = { ...data, socketId: socket.id };

      // Notify the existing players about the new player
      socket.broadcast.emit(SOCKET_EVENTS.PLAYER_JOINED, data);
    });

    socket.on(SOCKET_EVENTS.PLAYER_MOVED, (data: any) => {
      if (mapPlayerIdToSocketId[data.playerId]) {
        mapPlayerIdToSocketId[data.playerId] = { ...data, socketId: socket.id };
      }
      socket.broadcast.emit(SOCKET_EVENTS.PLAYER_MOVED, data);
    });

    socket.on(SOCKET_EVENTS.CREATE_CALL, (data: any) => {
      const { receiverEmail } = data;

      const receiverSocketId = Object.values(mapPlayerIdToSocketId).find(
        (player: any) => player.playerId === receiverEmail
      )?.socketId;

      if (receiverSocketId) {
        console.log(receiverEmail, receiverSocketId);
        socket
          .to(receiverSocketId)
          .emit(SOCKET_EVENTS.RECEIVE_INCOMING_CALL, data);
      }
    });

    socket.on(SOCKET_EVENTS.CALL_RECEIVED, (data: any) => {
      socket.broadcast.emit(SOCKET_EVENTS.CALL_RECEIVED, data);
    });
  }
}
