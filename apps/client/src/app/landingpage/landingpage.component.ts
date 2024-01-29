import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import { TopbarComponent } from '../components/topbar/topbar.component';
import { isPlatformBrowser } from '@angular/common';
import { UserResponse } from '@unihosp/api-interface';

@Component({
  selector: 'uni-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  standalone: true,
  imports: [TopbarComponent],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService) {}

  private platformId = inject(PLATFORM_ID);

  user$!: Observable<UserResponse | null>;

  subscription: Subscription | null = null;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.user$ = this.userService.currentUser;
      this.subscription = this.user$.subscribe(console.log);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
