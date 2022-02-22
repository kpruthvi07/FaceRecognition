import { Component, Injectable, Inject, OnInit } from '@angular/core';
import { PageService } from './service/page.service';
import { AuthService } from './service/auth.service';
import { Observable } from '../../node_modules/rxjs';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';

export var isUserLoggedIn = 'false';
interface Cookies {
  EssentialCookies: boolean;
  MarketingCookies: boolean;
  FunctionalCookies: boolean;
  AnalyticsCookies: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent {
  title = 'Home';

  public portfolioName: any;
  public modelPortfolioName: any;
  public stocknames: any;
  public placeholder: any;
  public selectedStock: any;
  public isUserLoggedIn = 'false';
  public cookiesOpen: boolean = false;
  public username: any;
  LoginStatus$!: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private pageService: PageService,
    private navbar: NavbarComponent,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.LoginStatus$ = this.authService.isLoggedIn;
  }

  // getStockList(country_name: any) {
  //   this.pageService
  //     .getStocksListSearch(country_name)
  //     .subscribe((subscribedData: any) => {
  //       this.stocknames = subscribedData['companies'];
  //       this.placeholder = subscribedData['placeholder'];
  //     });
  // }

  // setPortfolioValue(modelPortfolio: any) {
  //   this.modelPortfolioName = modelPortfolio;
  // }

  
  // Accept() {
  //   localStorage.setItem('cookie_consent', JSON.stringify(true));
  //   this.cookiesOpen = false;
  // }
}

