import { Injectable } from '@nestjs/common';
import { User } from '@chess/shared/types';
import * as random from 'lodash/random';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  private static generateRandomUserKey() {
    return random(100000000).toString();
  }

  public checkByName(username: string): boolean {
    return !!this.users.find(u => u.name === username);
  }

  public checkById(userId: string): boolean {
    return !!this.users.find(u => u.id === userId);
  }

  public register(username: string): User {
    const newId = UserService.generateRandomUserKey();
    const user = { id: newId, name: username };
    this.users.push(newId, user);
    console.log('returning ', user);
    return user;
  }
}
