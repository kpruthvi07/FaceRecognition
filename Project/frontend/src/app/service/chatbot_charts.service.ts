import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Highcharts from 'highcharts';


@Injectable({
  providedIn: 'root'
})
export class ChatbotChartsService {    
Highcharts = Highcharts;
chartConstructor = 'chart';

constructor(private http: HttpClient) {}

convertDateToUTC( inputdata: { [x: string]: any },dynamicColumn: any,extraIndex: number) {
    var data;
    if (extraIndex != -1) data = inputdata[dynamicColumn][extraIndex];
    else data = inputdata[dynamicColumn];
    for (let i = 0; i < data['data'].length; i++) {
      let date = new Date(data['data'][i][0]);
      var now_utc = Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds());
      data['data'][i][0] = now_utc;
    }
    return inputdata;
  }

cumulative_returns_graph(chartId: any,plotLinesData: any,chartHeight: string,multiplyFactor: number,dividendFactor: number,
                        symbol: string,tooltipSymbol: string,roundDigits: string | number | any,chartTitle = null,
                        formatCurrency = '',symbol_param = '',callFrom='',chatbotReturnsData:any,chartType:any,axisRoundDigits: any,) {
            Highcharts.setOptions({ lang: { noData: 'No Data Available' } });
            var chartOptions = {
            chart: {
                type: chartType,
                backgroundColor: 'transparent',
                height: chartHeight,
                
            },
            title: {
                text: chartTitle,
            } as any,
            credits: {
                enabled: false,
            },
            legend: {
                enabled: true,
                itemStyle: {
                fontSize: '12px',
                },
            },
            exporting: {
                buttons: {
                contextButton: {
                    enabled: false,
                },
                },
            },
            plotOptions: {
                line: {
                marker: {
                    enabled: false,
                },
                },
                area: {
                    marker: {
                        enabled: false,
                    },
                    fillColor: {
                      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                      stops: [
                        [0, chatbotReturnsData[chartId][0].color],
                        [1, new Highcharts.Color(chatbotReturnsData[chartId][0].color).setOpacity(0).get('rgba')]
                      ]
                    }
                    },
            },
            xAxis: [
                {
                type: 'datetime',
                tickWidth: 1,
                tickLength: 6,
                startOnTick: false,
                endOnTick: false,
                dateTimeLabelFormats: {
                    // don't display the dummy year
                    day: '%e-%b',
                    week: '%e-%b',
                    month: '%b-%y',
                    year: '%Y',
                },
                labels: {
                    style: {
                    color: '#031b4e',
                    fontWeight: 'normal',
                    fontSize: '14px',
                    },
                },
                },
            ],
            yAxis: [
                {
                gridLineWidth: 0,
                lineWidth: 1,

                labels: {
                    formatter: function () {
                    return (
                        ((this.value * multiplyFactor) / dividendFactor).toFixed(axisRoundDigits) +
                        symbol
                    );
                    },
                    style: {
                    color: '#031b4e',
                    fontSize: '14px',
                    fontWeight: 'normal',
                    },
                } as any,

                title: {
                    text: null,
                },
                plotLines: plotLinesData,
                },
            ],
            tooltip: {
                formatter: function () {
                var s = [
                    'Date : ' + '<b>' + Highcharts.dateFormat('%d-%b-%Y', this.x),
                ];
                for (let i = 0; i < this.points.length; i++) {
                    s.push(
                    this.points[i].series.name +
                        ' : ' +
                        '<b>' +
                        (this.points[i].point.y * multiplyFactor).toFixed(roundDigits) +
                        tooltipSymbol +
                        '</b>'
                    );
                }
                return s.join('<br>');
                },
                shared: true,
                style: {
                color: '#031b4e',
                fontSize: '14px',
                fontWeight: 'normal',
                },
            } as any,
            series: chatbotReturnsData[chartId],
            };
            return chartOptions;
        }

        price_data_chart(inputdata:any, y_max:any, y_min:any,volume_max:any) {
            for (let i = 0; i < inputdata.length; i++) {
              for (let j = 0; j < inputdata[i]['data'].length; j++) {
                let date = new Date(inputdata[i]['data'][j][0]);
                var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
                  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
                inputdata[i]['data'][j][0] = now_utc;
              }
            }
        
            var charOptions = {
              chart: {
                type: 'line',
                height: 300,
                backgroundColor: 'transparent'
              },
              title: {
                text: null
              },
              xAxis: {
                type: 'datetime',
                tickWidth: 1,
                tickLength: 6,
                startOnTick: false,
                endOnTick: false,
                dateTimeLabelFormats: {
                  day: '%e-%b',
                  week: '%e-%b',
                  month: '%b-%y',
                  year: '%Y'
        
                },
                title: {
                  text: null,
                },
        
              },
        
              yAxis: [
                {
                  tickWidth: 1,
                  tickLength: 6,
                  gridLineWidth: 0,
                  lineWidth: 1,
                  title: {
                    text: null,
                  },
                  min: y_min,
                  max: y_max,
                  labels: {
                    formatter: function (this:any, err: any) {
                      if (this.value >= 1000) {
                        return (this.value / 1000).toFixed(1) + "K"
                      }
                      else
                        return this.value
                    },
                   
                  },
                  
                },
                {
                  max:volume_max*3,
                  tickWidth: 1,
                  tickLength: 6,
                  gridLineWidth: 0,
                  lineWidth: 1,
                  title: {
                    text: null,
                  },
                  
                  labels: {
                    formatter: function (this:any, err: any) {
                        return (this.value / 1000000).toFixed(0) + "M"
                    },
                    
                  },
                  opposite: true
                },
                
             
            ],
        
              credits: {
                enabled: false
              },
              exporting: {
                buttons: {
                  contextButton: {
                    enabled: false
                  },
                }
              },
        
              tooltip: {
                formatter: function (this:any, err: any) {
                  var s = [];
                  var count = 0
                  for (let i = 0; i < this.points.length; i++) {
                    if (count == 0)
                      s.push('Date: <b>' + Highcharts.dateFormat('%d-%b-%Y', this.x) + '</b><br>');
                    count = 1
                    if (this.points[i].series.name=='Price'){
                    s.push(this.points[i].series.name + ' : <b>₹' +
                      (parseFloat(this.points[i].y).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '</b><br>'));}
                      else{
                        s.push(this.points[i].series.name + ' : ' +
                        (parseFloat(this.points[i].y).toLocaleString('en-IN', { maximumFractionDigits: 2 }) + '</b><br>'));
                      }
                  }
        
                  return s.join('<br>');
                },
                shared: true,
                style: {
                  color: '#031b4e',
                  font: '13px  ',
                  fontWeight: 'normal'
                },
              },
              plotOptions: {
                series: {
                  marker: {
                    enabled: false
                  },
                  fillColor: {
                    linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                    stops: [
                      [0, '#00A8E8'],
                      [1, new Highcharts.Color('#00A8E8').setOpacity(0).get('rgba')]
                    ]
                  }
                }
              },
              legend: {
                enabled: false
              },
              series: inputdata,
            }
            return charOptions;
          }


      exposure_pie_chart(input_data:any,groupByColumn:any,currencysymbol:any,symbol:any){
        var investmentAmtMcap = {
          chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: '300px',
            // height: (9 / 9 * 100) + '%',
          },
          credits: {
            enabled: false,
          },
          exporting: {
            buttons: {
              contextButton: {
                enabled: false,
              },
            },
          },
          title: {
            style: {
              color: '#031b4e',
              fontSize: '12px',
              fontWeight: 'bold',
            },
            text: null,
          },
    
          legend: {
            itemStyle: {
              color: '#031B4E',
              fontSize: '12px',
              fontWeight: 'bold',
              textOverflow: null,
            },
          },
          tooltip: {
            formatter: function () {
              return (
                groupByColumn + ' : <b>' +
                this.point.name +
                '</b><br>' +
                'Investment Amount(%) : ' +
                '<b>' +
                (this.point.y * 100).toFixed(2) +
                '%</b><br>' +
                'Investment Amount (' + currencysymbol + '): <b>' +
                this.point.Exposure.toLocaleString(symbol, {
                  maximumFractionDigits: 1,
                }) +
                '<br></b>'
              );
            },
          } as any,
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              innerSize: '60%',
              depth: '65%',
              size: '220',
              showInLegend: true,
    
              dataLabels: {
                enabled: false,
    
                formatter: function () {
                  return '<b>' + this.point.name + '</b><br>';
                },
              } as any,
            },
          },
          series: [
            {
              name: 'Country',
              colorByPoint: true,
              data: input_data,
            },
          ],
        };
        return investmentAmtMcap;
      }




      chart_returns_exposure(names:any,columnname:any,input_data:any,currencysymbol:any,symbol:any){     
        let column1="",column2="";
        let value_height;
        if (columnname=='investment'){
          column1="Investment Amount (%)"
          column2="Investment Amount (" + currencysymbol + ")"}
        else if(columnname=='returns'){
          column1="Actual Return (%)"
          column2="Actual Return (" + currencysymbol + ")"}

        if (input_data.length>15 && input_data.length<=30)
            value_height=450;
        else if (input_data.length>30)
            value_height=650;

        var chartoptions = {
          chart: {           
               height:value_height,
               inverted:true,
            },
          xAxis: {
              categories: names,
              title: {
                  text: null
              }
          },
          yAxis: {
              title: {
                      style: {
                          color: '#031b4e',
                          fontSize:'15px',
                          fontWeight: 'bold',
                          fontFamily:'Roboto',
                      },                   
                      text:null,                     
                      },            
              labels:{
                      enabled:false
                    }
              },
         
          tooltip: {              
                formatter: function(this:any, err: any) {                        
                    var temp;
                    for (let i=0;i<(this.series.userOptions.data).length;i++)
                        {
                            
                            if(this.series.userOptions.data[i]['y']==this.y)
                            {
                                temp=this.series.userOptions.data[i]['exp']
                                break
                            }
                        }
                        return  column1 +' : <b>'+(this.y*100).toFixed(1)+'%</b><br>'+ column2 +  ":<b>"+  currencysymbol +parseFloat(((temp)).toFixed(0)).toLocaleString(symbol)+'</b>';      
                      },
                   },
          plotOptions: {
              column: {
                  dataLabels: {
                      enabled: true,
                      formatter: function(this:any, err: any){
                            return  (this.y*100).toFixed(1)+'%';
                        },
                  }
              }
          },
          legend: {
             
              enabled:false,
             
          },
          title:{
              text:null
          },
          credits: {
                          enabled: false
                      },
                      exporting: {
                          buttons: {
                              contextButton: {
                              enabled:false
                              },                       
                          }
                      },
          series: [
          {
            name:column2,
            data:input_data,
            marker: {
                enabled: false
            },
            type: "column",
            
        }]
      }
      return chartoptions;
      }
  
      
    }

    
