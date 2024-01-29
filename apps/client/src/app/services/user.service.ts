import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { rootEndPoint } from '../rootEndPoint';
import { UserResponse as User } from '@unihosp/api-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User | null>(null);

  get currentUser() {
    return this.user.pipe(
      map((user) => {
        if (user) {
          return {
            ...user,
            avatarUrl: user.avatarUrl
              ? `${rootEndPoint}${user.avatarUrl}`
              : null,
          };
        }
        return user;
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
