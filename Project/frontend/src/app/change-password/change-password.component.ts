import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../service/auth.service';
import { SuccessDialogComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private titleService: Title, private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    public router: Router) { }
  changePasswordForm: FormGroup = new FormGroup({});
  error: any;
  message: any;
  status: any;
  loading = true;
  get f() { return this.changePasswordForm.controls; }
  meta_data = {
    'title': 'Change Password | 72PI'
  }
  ngOnInit() {
    // To Update the Metatags in both HTML and Opengraph metatags-- start
    this.titleService.setTitle(this.meta_data['title']);
    // To Update the Metatags in both HTML and Opengraph metatags-- end
    window.scroll(0, 0);
    (document.getElementById('search-bar-span') as HTMLElement).style.display = 'block';
    this.changePasswordForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['', [Validators.required, Validators.min(8)]],
      confirmpassword: ['', [Validators.required, Validators.min(8)]],
    });
    // this.loading = false;
  }
  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    const old_password = this.f.oldpassword.value;
    const new_password1 = this.f.newpassword.value;
    const new_password2 = this.f.confirmpassword.value;
    // this.authService.changePassword(old_password, new_password1, new_password2).subscribe(
    //   success => {
    //     this.message = 'Your Password Changed Successfully!';
    //     this.status = 'success';
    //     const timeout = 2000;
    //     const dialogRef = this.dialog.open(SuccessDialogComponent, {
    //       width: '500px',
    //       data: { message: this.message, status: this.status },
    //     });
    //     dialogRef.afterOpened().subscribe((_) => {
    //       setTimeout(() => {
    //         dialogRef.close();
    //       }, timeout);
    //     });
    //     dialogRef.afterClosed().subscribe((result) => {
    //       this.authService.removeStoredToken();
    //       this.authService.loginStatus.next(false);
    //       this.router.navigate(['login']);
    //     });
    //   },
    //   error => { this.error = error; console.log(error) },

    // );
  }
}
