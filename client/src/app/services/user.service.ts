import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<User | null | undefined>(undefined);

  get currentUser() {
    return this.user.pipe(
      map(user => (user ? { ...user, avatarUrl: user?.avatarUrl ? `https://api.unihosp.live/api/v1${user?.avatarUrl}` : undefined } : user)));
  }

  setCurrentUser(user: User) {
    this.user.next(user);
  }

  constructor(private http: HttpClient) {
    this.http.get<User>('/user').subscribe({
      next: (user) => {
        this.user.next(user);
      },
      error: (err) => {
        console.error(err.message);
        this.user.next(null)
        of(null);
      }
    });
  }

  refereshCurrentUser() {
    const sub = this.http.get<User>('/user').subscribe((user) => {
      this.setCurrentUser(user);
    });
  }

  getUsersByMail(query: string) {
    return this.http.post<{ email?: boolean, handle?: boolean }>("/user/exists", {
      email: query
    });
  }
}
