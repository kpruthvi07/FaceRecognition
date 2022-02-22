import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class UserPortfolioService {
//   private apiData = new BehaviorSubject<any>(null);
//   public apiData$ = this.apiData.asObservable();
//   private imgname;
//   private portfolioName = new BehaviorSubject<any>(null);
//   public portfolioName$ = this.portfolioName.asObservable();
//   private orderInfo = new BehaviorSubject<any>(null);
//   public orderInfoData$ = this.orderInfo.asObservable();
//   private subscriptionDetails = new BehaviorSubject<any>(null);
//   public subscriptionDetailsData$ = this.subscriptionDetails.asObservable();
//   userportfolios: any = [];
//   userwatchlists: any =  [];

//   private watchListapiData = new BehaviorSubject<any>(null);
//   public watchListapiData$ = this.watchListapiData.asObservable();
//   private watchListName = new BehaviorSubject<any>(null);
//   public watchListName$ = this.watchListName.asObservable();
//   private screenerData = new BehaviorSubject<any>(null);
//   public screenerData$ = this.screenerData.asObservable();

//   constructor(private http: HttpClient) { this.imgname = 1; }
    
//   ROOTURL: string = 'http://localhost:8000/'; 
//   country: any;
//   current_portfolio: any;
//   getUserPortfoliosFromCloud(country:any){
//     return this.http.post(this.ROOTURL.concat('chatbotpages/'+country+'/UserPortfoliosList/'),{ 'country': country });

//   }
//   getUserPortfolios(country: any){
//     return this.http.post(this.ROOTURL.concat('pages/'+country+'/PortfoliosList/'),{ 'country': country });
//   }

//   getPortfoliosList(country_name: string) {
//     this.getUserPortfolios(country_name).subscribe((portfoliosData: any) => {
//       this.userportfolios = portfoliosData['user_portfolios']
//       this.setData(this.userportfolios)
//       this.setPortfolioName(this.userportfolios[0])
//     });
//   }
//   setData(data: any) {
//     this.apiData.next(data)
//   }

//   setPortfolioName(portfolioName: { portfolio_name: any; portfolio_value: any; }) {
//     this.portfolioName.next(portfolioName)
//   }

  
//   getUserWatchLists(country: any){
//     return this.http.post(this.ROOTURL.concat('pages/'+country+'/WatchList/'),{ 'country': country });
//   }
//   setSelectedStocksFilters(selectedStocks:any,selectedFilters:any,selectedFilteVals:any,resetVal:number=0){
//     let data;
//     if (resetVal==0)
//          data = {'selectedStocks':selectedStocks,'selectedFilters':selectedFilters,'selectedFilterVals':selectedFilteVals}
//     else
//         data = null;   
//     this.screenerData.next(data)
//   }
//   getWatchList(country_name: any) {
//     this.getUserWatchLists(country_name).subscribe((watchListsData: any) => {
//       this.userwatchlists = watchListsData['user_watchlists']
//       this.setWatchListData(this.userwatchlists)
//       this.setWatchListName(this.userwatchlists[0])
//     });
//   }

//   setWatchListData(data: any) {
//     this.apiData.next(data)
//   }

//   setWatchListName(watchListName: { watchlist_name: any; watchlist_value: any; }) {
//     this.watchListName.next(watchListName)
//   }

//   onCountryChangeReset() {
//       this.apiData = new BehaviorSubject<any>(null);
//       this.apiData$ = this.apiData.asObservable();
//       this.portfolioName = new BehaviorSubject<any>(null);
//       this.portfolioName$ = this.portfolioName.asObservable();
    
//       this.watchListapiData = new BehaviorSubject<any>(null);
//       this.watchListapiData$ = this.watchListapiData.asObservable();
//       this.watchListName = new BehaviorSubject<any>(null);
//       this.watchListName$ = this.watchListName.asObservable();      
//     }
//   setOrderDetails(data: Object){
//     this.orderInfo.next(data);
//   }
//   setSubscriptionDetails(data: Object){
//     this.subscriptionDetails.next(data);
//   }
}

