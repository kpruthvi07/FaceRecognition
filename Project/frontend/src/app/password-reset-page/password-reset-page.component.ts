import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-password-reset-page',
  templateUrl: './password-reset-page.component.html',
  styleUrls: ['./password-reset-page.component.scss'],
})
export class PasswordResetPageComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router,) { }
  public uid: any;
  public token: any;
  public error: any;
  message: any;
  status: any;
  submitted: any;
  public passwordResetDoneForm: FormGroup = new FormGroup({});
  get f() { return this.passwordResetDoneForm.controls; }
  ngOnInit() {
    window.scroll(0, 0);
    (document.getElementById("search-bar-span") as HTMLElement).style.display = "block";
    // this.uid = this.route.snapshot.params.uid;
    // this.token = this.route.snapshot.params.token;
    this.passwordResetDoneForm = this.formBuilder.group({
      new_password1: ['', Validators.required],
      new_password2: ['', Validators.required],
    });
  }
  onSubmit() {
  //   const new_password1 = this.f.new_password1.value;
  //   const new_password2 = this.f.new_password2.value;
  //   this.authService.paaswordReset(this.uid, this.token, new_password1, new_password2).pipe().subscribe(
  //     success => {
  //       this.message = 'Password changed successfully';
  //       this.status = 'success';
  //       const timeout = 3000;
  //       const dialogRef = this.dialog.open(SuccessDialogComponent, {
  //         width: '500px',
  //         data: { message: this.message, status: this.status },
  //       });
  //       dialogRef.afterOpened().subscribe((_) => {
  //         setTimeout(() => {
  //           dialogRef.close();
  //         }, timeout);
  //       });
  //       dialogRef.afterClosed().subscribe((result) => {
  //         this.router.navigate(['login']);
  //       });
  //     },
  //     error => { this.error = error; }
  //   );
  }
}