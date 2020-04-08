export interface User {
  id: string;
  name: string;
}

export interface GameEvent {
  event: string;
  data?: any;
}

export interface PlayStroke {
  origin: string;
  destination: string;
}

export type UserId = string;
