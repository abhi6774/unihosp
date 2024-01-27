import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { User } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';
import { AccessTokenResponse, LoginResponse, LogoutResponse } from '../auth/interfaces';
import UniCookieService from './unicookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient, private cookie: UniCookieService) { }


  signup(email: string, password: string, contact: string, role?: string) {
    return this.http.post<User>(`/auth/signup`, {
      email,
      password,
      contact,
      role
    });
  }

  // async requestAccessToken() {
  //   const response = await fetch("https://api.unihosp.live/auth/accesstoken", {
  //     method: 'POST',
  //   });
  // }

  login(email: string, password: string) {
    const response = this.http.post<LoginResponse>(`/auth/login`, {
      email, password
    })

    return response.pipe(tap(value => {
      console.log(value);
      this.userService.setCurrentUser(value.data.user)
    }));
  }

  get isLoggedIn(): Observable<boolean> {
    return this.userService.currentUser.pipe(map((user) => user !== null));
  }

  get notLoggedIn(): Observable<boolean> {
    return this.userService.currentUser.pipe(map(user => user === null));
  }

  logout() {
    const reponse = this.http.delete<LogoutResponse>(`/auth/logout`, {
      body: {
        refreshTokenId: this.cookie.retrieve('rid')
      }
    })

    return reponse.pipe(map((value) => {
      this.cookie.deleteAllCookie();
    }));
  }
}
