import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../navbar/navbar.component';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private titleService: Title, private metaService: Meta, private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { this.sitekey = '6LeEpTUaAAAAACLREEbFiJ_EQm8oW2zhABWAAlNi' }
  public error: any;
  public sitekey: string;
  public message: any;
  public status: any;
  public captchaVerified = false;
  public submitted = false;
  public signupForm: FormGroup = new FormGroup({});
  hide: boolean = true;
  get f() { return this.signupForm.controls; }
  meta_data = {
    'title': 'Sign Up | 72PI',
    'description': 'All in one platform to create Portfolios for Indian NSE and US top NASDAQ and NYSE stocks using Portfolio Wizard, Stock Screener and Analyzer',
    'keywords': '',
    'url': window.location.href
  }
  ngOnInit(): void {
    // To Update the Metatags in both HTML and Opengraph metatags-- start
    this.titleService.setTitle(this.meta_data['title']);
    this.metaService.updateTag({ name: 'keywords', content: this.meta_data['keywords'] });
    this.metaService.updateTag({ name: 'description', content: this.meta_data['description'] });
    this.metaService.updateTag({ property: 'og:title', content: this.meta_data['title'] });
    this.metaService.updateTag({ property: 'og:description', content: this.meta_data['description'] });
    this.metaService.updateTag({ property: 'og:url', content: this.meta_data['url'] });
    // To Update the Metatags in both HTML and Opengraph metatags-- end
    window.scroll(0, 0);
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    const username = this.f['username'].value;
    const email = this.f['email'].value;
    const password1 = this.f['password'].value;
    this.authService.signup(username, email, password1, password1).pipe(first()).subscribe(
      success => {
        this.message = 'Registration Successful';
        this.status = 'success';
        const timeout = 5000;
        const dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '500px',
          data: { message: this.message, status: this.status },
        });
        dialogRef.afterOpened().subscribe((_) => {
          setTimeout(() => {
            dialogRef.close();
          }, timeout);
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['login']);
        });
      },
      error => this.error = error,
    );
    }
}
