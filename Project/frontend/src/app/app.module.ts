import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent, } from './app.component';
import { LogoutDialogComponent,SuccessDialogComponent } from './navbar/navbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PageService } from './service/page.service';
import { registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { PasswordResetPageComponent } from './password-reset-page/password-reset-page.component';
import { StaffSignupComponent } from './staffsignup/staffsignup.component';
import { ErroInterceptor } from './interceptors/error.interceptor';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CaptureComponent } from './capture/capture.component';
export function tokenGetter(){
  return localStorage.getItem('token');
}


registerLocaleData(localeIn);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    PasswordResetComponent,
    LogoutDialogComponent,SuccessDialogComponent,
    PasswordResetPageComponent,
    StaffSignupComponent,
    ChangePasswordComponent,
    CaptureComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [PageService,
    AuthGuardService,
    AuthService,
    MessageService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErroInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
