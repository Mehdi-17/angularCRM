import { User } from './model/user';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const KEY_USER = 'angularCRM.user';
const KEY_JWTTOKEN = 'angularCRM.jwtToken';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private user?: User;
  private jwtToken?: string;

  constructor(private http: HttpClient) {
    // !! to transform in boolean
    if (!!sessionStorage.getItem(KEY_USER)) {
      // le ! permet de certifier qu'on aura pas de valeur null (puisqu'on a vérifié sur la ligne d'avant)
      this.user = JSON.parse(sessionStorage.getItem(KEY_USER)!);
      this.jwtToken = sessionStorage.getItem(KEY_JWTTOKEN)!;
    }
  }

  get token(): string | undefined {
    return this.jwtToken;
  }

  authentUser(login: string, password: string): Observable<User> {
    console.log(login, password);
    return this.http
      .post<AuthentResponse>('api/auth/login', {email: login, password: password})
      .pipe(
        map((response: AuthentResponse) => {
          this.user = response.user;
          this.jwtToken = response.token;

          sessionStorage.setItem(KEY_USER, JSON.stringify(this.user));
          sessionStorage.setItem(KEY_JWTTOKEN, JSON.stringify(this.jwtToken));

          return this.user;
        })
      );
  }

  get authenticated(): boolean {
    return !!this.user;
  }

  disconnect(): void {
    sessionStorage.clear();
    this.user = undefined;
    this.jwtToken = undefined;
  }
}

interface AuthentResponse {
  user: User;
  token: string;
}
