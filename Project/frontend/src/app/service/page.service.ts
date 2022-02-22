import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { StocksData } from '../portfolio-details/portfolio-details.component';

function _window(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpClient) { }

  ROOTURL: any = 'http://localhost:8000/'; 
  get nativeWindow(): any {
    return _window();
  }
  country: any;

  capture(){
    return this.http.get(this.ROOTURL.concat('accounts/capture/'));
  }
//   getChatBotResponse(input_text:any,portfolioName:any,country:any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('chatbotpages/'+ country +'/chatbot/'), {
//       'input_text': input_text,
//       'portfolio_name': portfolioName, 'country': country
//     });
//   }

//   getChatBotResponseNonLogin(input_text:any,country:any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('chatbotpages/'+ country +'/chatbot_nonlogin/'), {
//       'input_text': input_text
//       , 'country': country
//     });
//   }
//   getBlogs(country:any): Observable<any[]> { return this.http.get<any[]>(this.ROOTURL.concat('blogs/'+country+'/blogs/')); }
//   getSocialMediaPost(country:any): Observable<any[]> { return this.http.get<any[]>(this.ROOTURL.concat('blogs/'+country+'/socialmediaposts/')); }

//   readMoreFunction(blogTitle: any,country:any) {
//     let selectedBlog = { 'title': blogTitle ,'country':country}
//     return this.http.post(this.ROOTURL.concat('blogs/'+country+'/blogs/'), selectedBlog);
//   }
//   socialMediaReadMore(SocialMediaTitle: any,country:any) {
//     let selectedBlog = { 'title': SocialMediaTitle ,'country':country}
//     return this.http.post(this.ROOTURL.concat('blogs/'+country+'/socialmediaposts/'), selectedBlog);
//   }
//   tastyBytesReadMore(TastyByteTitle: any) {
//     let selectedBlog = { 'title': TastyByteTitle }
//     return this.http.post(this.ROOTURL.concat('blogs/hometastybyte/'), selectedBlog);
//   }

//   getCryptoArticles(): Observable<any[]> { return this.http.get<any[]>(this.ROOTURL.concat('blogs/cryptoarticles/')); }
//   cryptoReadMoreFunction(blogTitle: any) {
//     let selectedBlog = { 'title': blogTitle }
//     return this.http.post(this.ROOTURL.concat('blogs/cryptoarticles/'), selectedBlog);
//   }

//   getValuationMultiplesData(country: any, portfolioName: any, factsetTicker: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/Analyzer/valuationMultiples/"), {
//       'country': country,
//       'portfolio_name': portfolioName, 'factset_ticker': factsetTicker
//     });
//   }
//   getStockInfo(country: any, stockname: any, stockCode: any, period: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('nonloginpages/' + country + "/StockInfo/"),
//       { 'country': country, 'stockname': stockname, 'stockCode': stockCode, 'period': period });
//   }

//   getFactorAnalysisViews(country: any, portfolioName: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + "/Analyzer/factorAnalysis/"),
//       { 'country': country, 'portfolio_name': portfolioName });
//   }

//   getUserPortfolios(country: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/'+country+'/PortfoliosList/'),
//       { 'country': country });
//   }
//   getMovingAverageData(username: any, country: any, portfolioName: any, factsetTicker: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/Analyzer/volume-volatility/"),
//       {
//         'country': country, 'username': username,
//         'portfolio_name': portfolioName, 'factset_ticker': factsetTicker
//       });
//   }
//   getFactorAnalystTargetPriceViews(country: any, portfolioName: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + "/Analyzer/analystTargetPrice/"),
//       { 'country': country, 'portfolio_name': portfolioName });
//   }

//   getmarketViews(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('pages/' + country + '/ourmarketview/'));
//   }

//   getData(country: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('nonloginpages/' + country + "/market/"), { 'country': country });
//   }

//   getETFData(country: any, selectedETFList: any, defaultXaxis: any, defaultYaxis: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('nonloginpages/' + country + "/etfmonitor/"),
//       { 'country': country, 'etfList': selectedETFList, 'xaxis': defaultXaxis, 'yaxis': defaultYaxis }
//     );
//   }

//   getCreatePortfolioSelectingStocks(country: any, sector: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/create-portfolio-selecting-stocks/"),
//       { 'country': country, 'sector': sector });
//   }

//   getModelPortfoliosData(country: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/modelportfolios/"), { 'country': country });
//   }
//   getModelPortfoliosReturns(country: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('nonloginpages/' + country + "/modelportfoliosreturns/"), { 'country': country });
//   }

//   getModelPortfoliosVisualData(country: any, modelPortfolioName: any, period: any, onchangevalue: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/viewmodelportfolios/"), {
//       'country': country, 'modelPortfolioName': modelPortfolioName,
//       'period': period, 'onChangeValue': onchangevalue
//     });
//   }
//   getPortfolioData(country: any): Observable<object> {
//     return this.http.get(this.ROOTURL.concat('core/' + country + '/portfolio/actions/'));
//   }
//   deleteSignleStockFromPortfolio(stockID: any | undefined, country: any) {
//     return this.http.delete(this.ROOTURL.concat('core/' + country + '/portfolio/actions/' + stockID + '/')).subscribe();
//   }
//   updateSignleStockFromPortfolio(stockOBJ: StocksData, country: any) {
//     return this.http.put(this.ROOTURL.concat('core/' + country + '/portfolio/actions/' + stockOBJ.id + '/'), stockOBJ).subscribe();
//   }
//   deleteMultipleStockFromPortfolio(stockOBJS: StocksData[], country: any) {
//     return this.http.post(this.ROOTURL.concat('core/' + country + '/portfolio/actions/1/delete_multiple/'), stockOBJS).subscribe();
//   }
//   saveNewStockToPortfolio(stockOBJ: any, country: any) {
//     return this.http.post(this.ROOTURL.concat('core/' + country + '/portfolio/actions/1/add_new/'), stockOBJ).subscribe();
//   }

//   getStocksListSearch(country: any) {
//     return this.http.post(this.ROOTURL.concat('nonloginpages/' + country + "/StockListSearch/"), { 'country': country });
//   }

//   getOurPortfolioData(country: any | any) {
//     return this.http.get(this.ROOTURL.concat('pages/' + country + '/ourportfolio/'));
//   }

//   getRiskOverviewViews(country: any, portfolio_name: any, period: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/risk-overview/'),
//       { 'country': country, 'portfolio_name': portfolio_name, 'period': period });
//   }

//   getStockCharts(country: any, list_of_stocks: any, etf_benchmarks_list: any, period: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/StockChart/"),
//       {
//         'country': country, 'list_of_stocks': list_of_stocks,
//         'etf_benchmarks_list': etf_benchmarks_list, 'period': period
//       });
//   }


//   getScreenerData(country: any, filterlist: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + "/screener"), {
//       'country': country,
//       'filterlist': filterlist,
//     });
//   }
//   getPortfolioReturnsViews(country: any, portfolio_name: any, period: any, onchangevalue: any, custom_date: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/portfolioReturns/'),
//       {
//         'country': country, 'portfolio_name': portfolio_name,
//         'period': period, 'onChangeValue': onchangevalue, 'custom_date': custom_date
//       })
//   }


//   getTreeMapData(frequency: any, scale: any, size: any, parent: any, child: any, layer: any, country: any, portfolio_name: any, indexName: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/treemap/'), {
//       'frequency': frequency, 'scale': scale, 'size': size,
//       'parent': parent, 'child': child, 'layer': layer, 'country': country, 'portfolio_name': portfolio_name, 'indexName': indexName
//     })
//   }
//   getScrollData(): Observable<object> {
//     return this.http.get(this.ROOTURL.concat('nonloginpages' + "/dailymarket/"));
//   }

//   getTechnicalIndicatorsViews(country: any, ticker: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/technicalIndicators/'),
//       { 'country': country, 'factset_ticker': ticker })
//   }

//   geOurPerformanceViews(country: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/ourperformance/'),
//       { 'country': country })
//   }

//   getDashboardSummaryViews(country: any, portfolio_name: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/dashboardSummary/'),
//       { 'country': country, 'portfolio_name': portfolio_name })
//   }
//   getEffiecientFrontierViews(country: any, portfolio_name: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/effiecientFrontier/'),
//       { 'country': country, 'portfolio_name': portfolio_name })
//   }
//   getTargetReturnModelViews(country: any, portfolio_name: any, target_return: number): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/targetReturnModel/'),
//       { 'country': country, 'portfolio_name': portfolio_name, 'target_return': target_return })
//   }

//   getWizardDefaultIndexStocks(country: any, index: any) {
//     return this.http.get(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/'));
//   }
//   getWizardChangedIndexStocks(country: any, index: any) {
//     return this.http.get(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/'));
//   }
//   getFundamentalWizardStocks(country: any, index: any, fundamentalFilters: any) {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/1/fundamental/'), fundamentalFilters);
//   }
//   getTechnicalWizardStocks(country: any, index: any, technicalFilters: any) {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/2/technical/'), technicalFilters);
//   }
//   getQuantOverlayWizardStocks(country: any, index: any, oldfilters: any, quantFilters: any) {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/3/quant_overlay/'),
//       { 'oldfilters': oldfilters, 'quantfilters': quantFilters });
//   }
//   getStocksSummary(country: any, index: any, oldfilters: any, quantFilters: any) {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/4/summary/'),
//       { 'oldfilters': oldfilters, 'quantfilters': quantFilters });
//   }

//   saveWizardPortfolio(country: any, index: any, portoflioName: any, invst_amnt: number, oldfilters: { Piotroski_Score: any; Div_Yield: any; ROE: any; RSI: any; Current_Price: any; MovingAvg: any; }, quantFilters: { 'Bottom Tier': any; 'Mid Tier': any; 'Top Tier': any; }, addToExisting: boolean) {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/wizard/' + index + '/step/5/portfolio_saving/'), {
//       'portfolio_name': portoflioName,
//       'invst_amnt': invst_amnt, 'oldfilters': oldfilters, 'quantfilters': quantFilters, 'addToExisting': addToExisting
//     });
//   }
//   getUserPortfoliosList(country: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/'+country+'/PortfoliosList/'),
//       { 'country': country });
//   }

//   getFuturesAnsOptionsData(country: any) {
//     return this.http.get(this.ROOTURL.concat('pages/' + country + '/futures-options/'),);
//   }
//   getPriceData(country: any, values: {}) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/savepricemovements/'),
//       { 'country': country, 'values': values });
//   }

//   getTechData(country: any, values: {}) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/savetechnicaldata/'),
//       { 'country': country, 'values': values });
//   }

//   getPersonalisationData(country: any, etfList: any, Riskvalue: any) {
//     return this.http.post(this.ROOTURL.concat('pages/' + country + '/personalisation/'),
//       { 'country': country, 'etf_list': etfList, 'riskValue': Riskvalue });
//   }

//   saveCustomerPortfolio(stocks: { stocks: any; portfolioName: any; addToExisting: boolean; }, country: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/customer/portfolio/saving/'), stocks);
//   }
//   getViewAlert(AlertData: any, country: any, state: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/viewAlert/notifications/'), { 'AlertData': AlertData, 'state': state });
//   }
//   getMyAlerts(country: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/myAlerts/'), { 'country': country });
//   }
//   editAlertData(element: { object: any; leftvalue: any; condition: any; rightvalue: any; }, country: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/myAlerts/edit/'), element);
//   }
//   deleteAlertData(element: { object: any; }, country: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/myAlerts/delete/'), element);
//   }
//   getPricingDetails(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('accounts/' + country + '/pricing/'));
//   }

//   createFreeSubscription(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('accounts/' + country + '/freesubscription/'))
//   }

//   createPremiumSubscription(country: any, currency: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('accounts/' + country + '/' + currency + '/premium/subscription/'))
//   }

//   activatePremiumSubscription(country: any, currency: any, userDetails: { first_name: any; last_name: any; email: any; contact_no: any; subscription_type: any; }) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/' + currency + '/premium/subscription/'), userDetails);
//   }

//   activateFreeSubscription(country: any, userDetails: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/freesubscription/'), userDetails);
//   }

//   getSubscriptionStatus(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('accounts/' + country + '/subscription/status/'))
//   }
//   verifyPayment(response: any, order_data_details: any,country: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/'+country+'/payment/signature/validation/'), {'response':response,'order_data_details':order_data_details});
//   }
//   saveEfficientFrontierPortfolio(country: any, portfolio_data: any[], actual_risk: any, actual_return: any, expected_risk: any, expected_return: any, base_portfolio: any, portfolio_name: any) {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/EfficientFrontierPortfolioSave/'),
//       {
//         'country': country, 'portfolio_data': portfolio_data, 'actual_risk': actual_risk, 'actual_return': actual_return,
//         'expected_risk': expected_risk, 'expected_return': expected_return, 'base_portfolio': base_portfolio, 'portfolio_name': portfolio_name
//       })
//   }
//   saveTargetRetrunModel(country: any, portfolio_data: any, expected_return: any, risk: any, portfolio_name: any, base_portfolio: any) {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/TargetReturnModelPortfolioSave/'),
//       {
//         'country': country, 'portfolio_data': portfolio_data, 'risk': risk,
//         'expected_return': expected_return, 'base_portfolio': base_portfolio, 'portfolio_name': portfolio_name
//       })
//   }

//   getStockReports(country: any): Observable<any[]> { 
//     return this.http.get<any[]>(this.ROOTURL.concat('blogs/'+country+'/reports'));
//   }

//   getMySubscriptions(country: any): Observable<any[]>{
//     return this.http.get<any[]>(this.ROOTURL.concat('accounts/'+country+'/mysubscriptions/'));
//   }
//   getAIMLViews(country: any):Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/AIMLSignals/'),
//     {'country':country})
//   }
//   getAIMLGraphData(country: any,month: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/AIMLGraph/'), {
//       'month': month,'country': country
//     })
//   }
//   getStockRecommendationsViews(country: any):Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/StockRecommendations/'),
//     {'country':country})
//   }
//   addModelPortfolio(country: any,portfolioDetails: { old_portfolio_name: any; new_portfolio_name: any; }){
//     return this.http.post(this.ROOTURL.concat('pages/'+country+'/savemodelportfolio/'),portfolioDetails);
//   }
//   getInvestorRiskProfile(country: any){
//     return this.http.get(this.ROOTURL.concat('accounts/'+country+'/riskprofile/'));
//   }
//   saveInvestorRiskProfile(country: any,name: any,email: any,age: any,occupation: any,risk_type: any,investment_objective: any,risk_appetite: any,investor_approch: any,
//     current_stage: any,income_source: any,portfolio_investment: any,financial_status: any,investment_experience: any,asset_classes: any,risk_understanding: any,
//     risk_awareness: any,portfolio_correction: any,trade_objective: any,liquidate_period: any,annual_return_investment: any,saveAt: any){
//     return this.http.post<any[]>(this.ROOTURL.concat('accounts/' + country + '/riskprofile/'),{'country':country,'name':name,'email':email,'age':age,'occupation':occupation,
//       'risk_type':risk_type,'investment_objective':investment_objective,'risk_appetite':risk_appetite,'investor_approch':investor_approch,'current_stage':current_stage,'income_source':income_source,
//       'portfolio_investment':portfolio_investment,'financial_status':financial_status,'investment_experience':investment_experience,'asset_classes':asset_classes,'risk_understanding':risk_understanding,
//       'risk_awareness':risk_awareness,'portfolio_correction':portfolio_correction,'trade_objective':trade_objective,'liquidate_period':liquidate_period,'annual_return_investment':annual_return_investment,'saveAt':saveAt})
//   }

//   newsLetterUnscription(email: any,country: any){
//     return this.http.post(this.ROOTURL.concat('accounts/news-letter/unsubscribe/'),{'email':email,'country':country});
//   }

//   getCryptoMonitorData(){
//     return this.http.get(this.ROOTURL.concat('pages/cryptomonitor/'));
//   }
//   getCryptoIndicatorsData(factset_ticker: any){
//     return this.http.post(this.ROOTURL.concat('pages/cryptoindicators/'),{'factset_ticker':factset_ticker});
//   }
//   getCorporateEvent(country: any): Observable<object> {
//     return this.http.post<any[]>(this.ROOTURL.concat('nonloginpages/' + country + "/corporateview/"),
//     { 'country': country });
//   }
  
//   saveCustomerWatchList(stocks: { stocks: any; watchListName: any; addToExisting: boolean; }, country: any) {
//     return this.http.post(this.ROOTURL.concat('accounts/' + country + '/customer/watchlist/saving/'), stocks);
//   }

//   getWatchListData(country: any): Observable<object> {
//     return this.http.post(this.ROOTURL.concat('pages/'+country+'/WatchListDetails/'),{'country':country});
//   }


//   deleteStocksFromWatchList(stock_ids: any[], country: any) {
//     return this.http.post(this.ROOTURL.concat('pages/'+country+'/delete_multiple_stocks_watchlist/'), {'country':country,
//   'stocks':stock_ids}).subscribe();
//   }
//   getIndicesList(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('nonloginpages/' + country + "/indices/"));
//   }
//   getIndexstocks(country: any,index_name: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('nonloginpages/' + country + "/indicesdata/"),
//       { 'country': country,'index_name':index_name  });
//   }
//   getSectorPerformanceData(country: any,index_name: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('nonloginpages/' + country + "/SectorPerformanceData/"),
//       { 'index_name':index_name});
//   }
  
//   getStockListData(country: any,callFrom: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/'+ country + '/stock-lists/'),
//       { 'country': country,'callFrom':callFrom });
//   }
//   getAsofDate(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('nonloginpages/' + country + "/asofdate/"));  
//   }
//   getInsightsViews(country: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/Insights/'), {
//       'country': country
//     })
//   }
//   getFiiDiiDailyViews(country: any, month: any, year: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/FiiDiiDaily/'), {
//       'country': country, 'month': month, 'year': year
//     })
//   }
//   getFiiDiiMonthlyViews(country: any,monthly_year: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/' + country + '/FiiDiiMonthly/'), {
//       'country': country,'monthly_year':monthly_year
//     })
//   }
  
//   getModelTtmData(country: any): Observable<any[]> {
//     return this.http.get<any[]>(this.ROOTURL.concat('nonloginpages/' + country + "/GetModelTtmData/"));  
//   }
//   GetGlobalIndicesPerformance(country: any,period: any,indices: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/GetGlobalIndicesPerformance/'), {
//       'period': period,'index_name':indices,'country': country
//     })
//   }
//   getExchange(ticker: any,country: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat("nonloginpages/"+country+"/getexchange/"),{'ticker': ticker,'country': country});  
//   }
//   FreeTrial(country: any): Observable<any[]>{
//     return this.http.get<any[]>(this.ROOTURL.concat('accounts/' + country + "/CustomerFreeTrail/"));
//   }
//   getAdvDecEtf(country: any): Observable<any[]> {
//     return this.http.post<any[]>(this.ROOTURL.concat('pages/AdvDecETF/'),
//     {
//       'country': country
//     })
//   }
//   getmacroData(country:any): Observable<any[]> { 
//     return this.http.get<any[]>(this.ROOTURL.concat('blogs/'+country+'/macrodata/')); 
//   }
}

