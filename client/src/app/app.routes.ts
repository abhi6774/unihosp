import { AboutComponent } from './aboutpage/about.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoggedInGuard } from './auth/guards/logged.guard';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { ResetPasswordComponent } from './auth/resetpassword/resetpassword.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddDocumentsComponent } from './components/add-documents/add-documents.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { AppointmentComponent } from './dashboard/pages/appointment/appointment.component';
import { DocumentComponent } from './dashboard/pages/document/document.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { HospitalComponent } from './hospital/hospital.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { CreaterpofileGuard } from './guards/createrpofile.guard';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { LoginGuard } from "./guards/login.guard";
import { ActivatedRoute, Routes } from '@angular/router';
import { PublicProfileComponent } from './public-profile/public-profile.component';


export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
      {
        path: 'signup',
        component: SignupComponent,
        data: { animation: "signup" }
      },
      {
        path: 'login',
        canActivate: [LoginGuard],
        component: LoginComponent,
        data: { animation: "login" }
      },
      { path: 'reset-password', component: ResetPasswordComponent, data: { animation: "reset" } },
      { path: 'forgot-password', component: ForgotComponent, data: { animation: "forgot" } },
      { path: 'v/:id', component: OtpComponent, data: { animation: "otp" } },
      { path: 'v', redirectTo: '/auth/login' },
    ],
  },
  { path: "addDocs", component: AddDocumentsComponent },
  {
    path: 'createprofile',
    component: CreateprofileComponent,
  },
  {
    path: 'h/:id',
    component: HospitalComponent,
  },
  {
    path: 'p/:id',
    component: PublicProfileComponent,
  },
  {
    path: 'd/:id',
    component: PublicProfileComponent,
  },
  {
    path: 'dashboard',
    canActivate: [],
    canActivateChild: [],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'hospital', component: HospitalComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path: 'history', component: DocumentComponent },
      { path: 'hospitals', component: HospitalComponent },
      { path: "record/addDocs", component: AddDocumentsComponent },
    ],
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
];
