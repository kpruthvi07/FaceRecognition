import { Component, Inject, OnInit, HostListener, Injectable, ViewChild } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../service/page.service';
import { UserPortfolioService } from '../service/userPortfolios.service';
import { AuthService } from '../service/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';

export interface Success {
  status: string;
  message: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

@Injectable({
  providedIn: 'root'
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router,
    public dialog: MatDialog,
    private pageService: PageService, private userService: UserPortfolioService, private authService: AuthService,
    private userCookie: CookieService) { }
  public imgname: any;
  public portfolioName: any;
  public modelPortfolioName: any;
  public selectedCountry: any = 'India';
  public stocknames: any;
  public placeholder: any;
  public selectedStock: any;
  public RouteURL: any = "";
  selectAbout: any;
  selectTeam: any;
  username: any;
  LoginStatus$!: Observable<boolean>;
  @ViewChild('sidenav')
  sidenav!: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  showSubmenuLogout: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  showSubmenuStockAnalyzer: boolean = false;
  reason = '';
  displayDropdown: boolean = false;
  image: any;
  userfirstName: any;
  usernameicon: any;
  userNameNavbar : any;
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  ngOnInit(): void {
    this.LoginStatus$ = this.authService.isLoggedIn;
    
    // this.getStockList(this.selectedCountry)
    // if(!this.authService.isAuthenticated()){
    // this.image = this.authService.getUserData(this.selectedCountry).subscribe(data=>{
    //   this.userfirstName = (data.username[0]).toUpperCase();
    //   this.userNameNavbar = data.username;
    //   this.usernameicon = (data.username[0]).toUpperCase();
    //   this.userCookie.set('userfirstName',this.userfirstName);
    //   this.userCookie.set('userNameNavbar',this.userNameNavbar)

    // });
  // }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.pageYOffset === 0) {
      this.imgname = 1;
    } else {
      this.imgname = 0;
    }
  }
  
  focusFunction() {
    (document.getElementsByClassName('ng-placeholder')[0] as HTMLElement).style.transform = "translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px)";
  }
  onFocusOutEvent() {
    (document.getElementsByClassName('ng-placeholder')[0] as HTMLElement).style.transform = "translateY(0em) scale(1) perspective(100px) translateZ(0.001px)";
    (document.querySelector('.ng-select input') as HTMLElement).blur();
  }
  

  openDialogLogOut(): void {
    this.showSubmenuLogout = false;
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '500px',
      height: 'fit-content',
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {

    });
  }
  booleanVariable: boolean = false;
  subDrodown() {
    this.booleanVariable = true;
  }
}

@Component({
  selector: 'app-logout-dialog',
  templateUrl: 'logout-dialog.component.html',
  styleUrls: ['logout.component.scss'],
})
export class LogoutDialogComponent implements OnInit {
  message = "You are successfully logged out"
  status = "success"
  stars: number[] = [1, 2, 3, 4, 5];
  rating: number = 0;
  click: boolean = true;
  comment: string = '';
  public selectedCountry: any = 'US';
  // onCountrySelected($event: any) {
  //   this.selectedCountry = $event['value'];
  // }
  countStar(star: any) {
    this.rating = star;
    if (star > 0) {
      this.click = false
    }
  }
  addStar(star: any) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      (document.getElementById(ab) as HTMLElement).classList.add("selected");
    }
  }
  removeStar(star: any) {
    let ab = "";
    for (let i = star - 1; i >= this.rating; i--) {
      ab = "starId" + i;
      (document.getElementById(ab) as HTMLElement).classList.remove("selected");
    }
  }
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    private authService: AuthService,
    public router: Router, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Success,
  ) {
    dialogRef.disableClose = true;
  }
  LogOut(): void {
    this.dialogRef.close();
    const timeout = 1600;
    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '500px',
      height: 'fit-content',
      data: { message: this.message, status: this.status }

    });

    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout)
    })
    dialogRef.afterClosed().subscribe((result) => {
      this.authService.logout().subscribe();
      this.router.navigate(['']);
    });
  }
  Submit() {
    this.dialogRef.close();
    const timeout1 = 4000;
    const timeout2 = 2000;
    let country = this.selectedCountry;
    if (this.rating == 0 && this.comment == '') {
      this.message = "Provide Feedback or if you don't wish click on logout";
      this.status = 'error';
      const dialogRef = this.dialog.open(SuccessDialogComponent, {
        width: '500px',
        height: 'fit-content',
        data: { message: this.message, status: this.status },
      });
      dialogRef.afterOpened().subscribe(_ => {
        setTimeout(() => {
          dialogRef.close();
        }, timeout1);
      })
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}
@Component({
  selector: 'app-success-dialog',
  templateUrl: 'success-dialog.component.html',
  styleUrls: ['logout.component.scss'],
})
export class SuccessDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Success
  ) {
    dialogRef.disableClose = false;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}



