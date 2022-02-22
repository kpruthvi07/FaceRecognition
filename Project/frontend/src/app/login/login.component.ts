import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Title, Meta } from '@angular/platform-browser';
import { NavbarComponent, SuccessDialogComponent } from '../navbar/navbar.component';
import { CookieService } from 'ngx-cookie-service';
import { PageService } from '../service/page.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public myApp: AppComponent,
    private route: ActivatedRoute,
    private navbar: NavbarComponent,
    private cookie: CookieService,
    private pageService: PageService,
    public dialog: MatDialog,
  ) {
    this.sitekey = '6LeEpTUaAAAAACLREEbFiJ_EQm8oW2zhABWAAlNi';
  }
  public error: any;
  public sitekey: string;
  public submitted = false;
  public loginForm: FormGroup = new FormGroup({});
  public nextURL: any;
  public captchaVerified = false;
  data: any;
  country: any;
  hide = true;
  message: any;
  status_msg: any;
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
    window.scroll(0, 0);
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      // recaptcha: ['',Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.country = this.navbar.selectedCountry;
    this.nextURL =
      this.route.snapshot.queryParams['next'] ||
      'password/reset/';
  }
  onSubmit() {
    this.country = this.navbar.selectedCountry;
    this.nextURL =
      this.route.snapshot.queryParams['next'] ||
      'password/reset/';
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const userName = this.f['username'].value;
    const passWord = this.f['password'].value;
    this.authService
      .login(userName, passWord).pipe(first()).subscribe(
        (success) => {
          this.router.navigate([this.nextURL]);
          // this.navbar.image = this.authService.getUserData(this.navbar.selectedCountry).subscribe(data => {
          //   this.navbar.userfirstName = (data.username[0]).toUpperCase();
          //   this.navbar.usernameicon = (data.username[0]).toUpperCase();
          //   this.navbar.userNameNavbar = (data.username)
            console.log('logged in');
          });
  }
}