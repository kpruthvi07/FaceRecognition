import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackComponent } from '../feedback/feedback.component';
import { DisclaimerComponent } from '../disclaimer/disclaimer.component';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { timer } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private authService: AuthService, public navComp: NavbarComponent) { }
  copyright: any;
  country: any;
  public linkedinUrl: string = 'https://www.linkedin.com/company/72pi/';
  public facebookUrl: string = "https://www.facebook.com/72pisignals/";
  public twitterUrl: string = 'https://twitter.com/72pisignals';
  public youtubeUrl: string = 'https://www.youtube.com/channel/UCvqavu4TfFXlf2uw-UqcSqw';
  public instagramUrl: string = 'https://www.instagram.com/72pisignals/';
  newslettersubscriptionForm: FormGroup = new FormGroup({});
  submitted = false;
  response: any;
  status: any;
  get f() { return this.newslettersubscriptionForm.controls; }
  ngOnInit(): void {
    this.copyright = new Date();
    this.country = this.navComp.selectedCountry;
    this.newslettersubscriptionForm = this.formBuilder.group({
      newsletteremail: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }
  onSubmit() {
    this.country = this.navComp.selectedCountry;
    this.submitted = true;
    if (this.newslettersubscriptionForm.invalid) {
      this.response = 'Please enter valid email address'
      this.status = 'error';
    }
    else {
      const eMail = this.f.newsletteremail.value;
      this.authService.newsLetterSubscription(eMail, this.country).subscribe(data => {
        this.response = data['response'];
        this.status = data['status'];
      });
    }
    timer(3000).toPromise().then(res => {
      this.response = '';
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(FeedbackComponent, {
      height: 'auto',
      width: '20%',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openDialogWeb(): void {
    const dialogRef = this.dialog.open(DisclaimerComponent, {
      height: 'auto',
      width: '45%',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
