export interface User {
  name: string;
  id: string;
}

export interface Game {
  id: string;
  whitePlayer: User;
  blackPlayer: User;
}

export interface GameEvent {
  event: string;
  data?: any;
}
