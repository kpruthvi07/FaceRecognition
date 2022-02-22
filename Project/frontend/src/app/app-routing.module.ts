import { AuthGuardService as AuthGuard } from './service/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { Page404Component } from './page404/page404.component';
import { StaffSignupComponent } from './staffsignup/staffsignup.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CaptureComponent } from './capture/capture.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'staffsignup', component: StaffSignupComponent },
  { path: 'password/reset', component: PasswordResetComponent },
  { path: 'accounts/auth/password/reset/confirm/:uid/:token', component: PasswordResetPageComponent },
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'capture', component: CaptureComponent , canActivate:[AuthGuard]},
  { path: '**', component: Page404Component },

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }