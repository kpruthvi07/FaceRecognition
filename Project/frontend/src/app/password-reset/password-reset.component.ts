import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  constructor(private authService: AuthService,
    public dialog: MatDialog
  ) { }
  error: any;
  message: any;
  status = 0;
  passwordResetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  })
  get formsubmit() { return this.passwordResetForm.controls; }
  ngOnInit(): void {
    window.scroll(0, 0);
    this.passwordResetForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
    });
  }
  onSubmit() {
    this.authService.forgotPassword(this.formsubmit['email'].value).pipe(first()).subscribe(
      success => {
        this.message = success['detail'];
        timer(5000).toPromise().then(res => {
          this.message = '';
        });
      },
      error => { this.error = error }
    )
  }
  hide = true;
}
