import { Injectable } from '@angular/core';
import { User } from '@chess/shared/types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static COOKIE_NAME = 'User';
  private currentUser: User;

  constructor(private readonly cookieService: CookieService) { }

  public setUser(user: User) {
    this.currentUser = user;
    // TODO ngx cookie should do it, but it fails on latest Chrome:
    // https://github.com/stevermeister/ngx-cookie-service/issues/86
    document.cookie = `${UserService.COOKIE_NAME}=${JSON.stringify(user)}`;
  }

  public getUser(): User {
    if (this.currentUser) {
      return this.currentUser;
    }
    const cookie =this.cookieService.get(UserService.COOKIE_NAME);
    if (cookie) {
      return JSON.parse(cookie);
    }
  }
}
