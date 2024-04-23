import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../loading/loading.component';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'uni-apo',
  templateUrl: 'appointment.component.html',
  styleUrls: [
    'appointment.component.scss',
    '../../common.style.scss',
    './appointment.responsive.scss',
    'style-02.scss',
  ],
  standalone: true,
  imports: [CommonModule, LoadingComponent],
})
export class AppointmentComponent implements OnInit {
  paitentProfile$ = this.profileService.current;

  userService$ = this.userService.currentUser;

  constructor(private profileService: ProfileService, private userService: UserService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {}
}
