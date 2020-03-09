export interface User {
  name: string;
  id: string;
}

export interface GameEvent {
  event: string;
  data?: any;
}

export type UserId = string;
