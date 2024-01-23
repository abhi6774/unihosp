import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'uni-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private userService: UserService) { }


  user$ = this.userService.currentUser;

  ngOnInit(): void {
    this.user$.subscribe(
    )
  }

}
