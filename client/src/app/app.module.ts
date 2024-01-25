import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { ValidatorsModule } from './Validators/validators.module';
import { AboutComponent } from './aboutpage/about.component';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthenticationModule } from './auth/authentication.module';
import { AddDocumentsModule } from './components/add-documents/add-documents.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorComponent } from './error/error.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { LoadingModule } from './loading/loading.module';
import { NotificationService } from './notification/notification.service';
import { RequestsInterceptor } from './requests.interceptor';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CreateprofileComponent,
    LandingPageComponent,
    ErrorComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    TopbarModule,
    SidebarModule,
    HttpClientModule,
    AuthenticationModule,
    ReactiveFormsModule,
    FormsModule,
    UniDirectivesModule,
    AddDocumentsModule,
    LoadingModule,
    ValidatorsModule,
    RouterModule.forRoot(routes),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    NotificationService,
    ProfileService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
