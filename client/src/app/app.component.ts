import { Component, OnInit, signal } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { NotificationService } from './notification/notification.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'uni-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private router: Router,
    // private notification: NotificationService
  ) { }

  value = ""

  exists = false


  ngOnInit(): void {
    console.log(this.router.url)
  }

  onChange() { }
}
