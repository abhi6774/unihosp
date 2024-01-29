import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { UserService } from '../../../services/user.service';
import { LoadingComponent } from '../../../loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'uni-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [
    'profile.component.scss',
    '../../common.style.scss',
    '../../../auth/common-styles/password-field.component.scss',
  ],
  standalone: true,
  imports: [LoadingComponent, CommonModule],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) {}
  @ViewChild('file') file!: ElementRef<HTMLInputElement>;

  paitentProfile$ = this.profileService.current;
  userService$ = this.userService.currentUser;

  loading = false;

  // editable = false;

  // makeEditable() {
  //   this.editable = true;
  // }

  // cancelEditable() {
  //   this.editable = false;
  // }

  handlePhotoUpload() {
    const formData = new FormData();
    if (!this.file.nativeElement.files) return;
    formData.append('file', this.file.nativeElement.files[0]);
    this.loading = true;
    this.profileService.updateAvatar(formData).subscribe(() => {
      // console.log(data);
      this.userService.refereshCurrentUser();
      this.loading = false;
    });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
    // this.paitentProfile$.subscribe((patient) => {
    // console.log(patient);
    // });
  }
}
