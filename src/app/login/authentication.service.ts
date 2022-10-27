import { User } from './model/user';
import { Injectable } from '@angular/core';

const KEY_USER = 'angularCRM.user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user?: User;

  constructor() {
    // !! to transform in boolean
    if (!!sessionStorage.getItem(KEY_USER)) {
      // le ! permet de certifier qu'on aura pas de valeur null (puisqu'on a vérifié sur la ligne d'avant)
      this.user = JSON.parse(sessionStorage.getItem(KEY_USER)!);
    }
  }

  authentUser(login: string, password: string): User {
    this.user = {
      id: 1,
      login,
      firstname: 'Luffy',
      lastname: 'Monkey D.',
    };

    sessionStorage.setItem(KEY_USER, JSON.stringify(this.user));

    return this.user;
  }

  get authenticated(): boolean{
    return !!this.user;
  }

  disconnect(): void {
    sessionStorage.clear();
    this.user = undefined;
  }
}
