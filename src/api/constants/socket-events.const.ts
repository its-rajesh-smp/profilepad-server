export const SOCKET_EVENTS = {
  // Connection
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  // Player
  PRE_SPAWN_EXISTING_PLAYERS: "pre_spawn_existing_players",
  PLAYER_SPAWNED: "player_spawned",
  PLAYER_JOINED: "player_joined",
  PLAYER_MOVED: "player_moved",
  PLAYER_DISCONNECTED: "player_disconnected",

  // Call
  CREATE_CALL: "createCall",
  RECEIVE_INCOMING_CALL: "receiveIncomingCall",
  CALL_RECEIVED: "callReceived",
};
