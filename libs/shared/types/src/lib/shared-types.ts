export interface User {
  id: string;
  name: string;
}

export interface GameEvent {
  event: string;
  data?: any;
}

export type UserId = string;
