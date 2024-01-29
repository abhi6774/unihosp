import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';

import { UserResponse as User, UserResponse } from '@unihosp/api-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<UserResponse | null>(null);

  get currentUser() {
    return this.user.pipe(
      map((user) => {
        if (user !== null) return user;
        let u: UserResponse;
        const sub = this.http.get<UserResponse>('/user').subscribe((user) => {
          user.avatarUrl = 'api/v1' + user.avatarUrl;
          u = user;
          this.setCurrentUser(user);
          sub.unsubscribe();
        });
        return u!;
      })
    );
  }

  setCurrentUser(user: User) {
    this.user.next(user);
  }

  subscription!: Subscription;

  constructor(private http: HttpClient) {
    // this.subscription = this.http.get<User>('/user').subscribe({
    //   next: (user) => {
    //     this.user.next(user);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     this.user.next(null);
    //   },
    // });
  }

  refereshCurrentUser() {
    const sub = this.http.get<User>('/user').subscribe((user) => {
      this.setCurrentUser(user);
      sub.unsubscribe();
    });
  }

  getUsersByMail(query: string) {
    return this.http.post<{ email?: boolean; handle?: boolean }>(
      '/user/exists',
      {
        email: query,
      }
    );
  }
}
