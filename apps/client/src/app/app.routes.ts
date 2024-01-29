import { Route } from '@angular/router';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { AboutComponent } from './aboutpage/about.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { LoggedInGuard } from './guards/logged.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './auth/resetpassword/resetpassword.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { OtpComponent } from './auth/otp/otp.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
      {
        path: 'signup',
        canActivate: [LoggedInGuard],
        component: SignupComponent,
        data: { animation: 'signup' },
      },
      {
        path: 'login',
        canActivate: [LoggedInGuard],
        component: LoginComponent,
        data: { animation: 'login' },
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        data: { animation: 'reset' },
      },
      {
        path: 'forgot-password',
        component: ForgotComponent,
        data: { animation: 'forgot' },
      },
      { path: 'v/:id', component: OtpComponent, data: { animation: 'otp' } },
      { path: 'v', redirectTo: '/auth/login' },
    ],
  },
  {
    path: 'work-in-progress',
    component: WorkInProgressComponent,
  },
  { path: 'about', component: AboutComponent },
];
