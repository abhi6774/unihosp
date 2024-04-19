import { isPlatformBrowser } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'uni-root',
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss',
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title: string = 'Unihosp';

  constructor(private userService: UserService) {}

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // this.subscription = this.http.get('/user').pipe(catchError(() => {
      //   return of(null);
      // })).subscribe((user) => {
      //   console.log(user);
      //   this.subscription.unsubscribe();
      // });
      this.userService.refereshCurrentUser();
    }
  }
}
