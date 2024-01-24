import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'uni-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService) { }


  user$ = this.userService.currentUser;

  subscription!: Subscription;
  ngOnInit(): void {
    this.subscription = this.user$.subscribe(console.log)

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
