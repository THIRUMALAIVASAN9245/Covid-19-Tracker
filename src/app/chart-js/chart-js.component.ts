import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as moment from 'moment';
declare var require: any

var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css']
})
export class ChartJsComponent implements OnInit {
  searchText: string = '';
  countryData: any = [];
  overallData: any = [];
  keyword = 'Country';

  constructor(private service: DataService) { }

  ngOnInit() {

    this.service.getAllSummary()
      .subscribe(response => {
        this.overallData = response;
        const confirmedArray = this.getGroupBYData(response, "Confirmed");
        const recoveredArray = this.getGroupBYData(response, "Recovered");
        const deathsArray = this.getGroupBYData(response, "Deaths");

        this.confirmedGraph(confirmedArray);
        this.recoveredGraph(recoveredArray);
        this.deathsGraph(deathsArray);

        const countryData = [...new Set(response.map(item => item.Country))];
        this.countryData = this.insertArrayAt(countryData, 0, "Global");
      });
  }

  insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
    return array;
  }

  selectEvent(item) {
    debugger;
    let response = [];
    if (item == "Global" || item == "") {
      response = this.overallData;
    } else {
      response = this.overallData.filter(x => x.Country == item);
    }

    const confirmedArray = this.getGroupBYData(response, "Confirmed");
    const recoveredArray = this.getGroupBYData(response, "Recovered");
    const deathsArray = this.getGroupBYData(response, "Deaths");

    this.confirmedGraph(confirmedArray);
    this.recoveredGraph(recoveredArray);
    this.deathsGraph(deathsArray);
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something
  }

  private getGroupBYData(data, status): any {
    var result = [];
    data.reduce(function (res, value) {
      if (!res[value.Date]) {
        res[value.Date] = { Date: value.Date };
        res[value.Date][status] = 0;
        result.push(res[value.Date])
      }
      res[value.Date][status] += value[status];
      return res;
    }, {});

    return result;
  }

  confirmedGraph(confirmedArray) {

    var xaxis = [];
    var yaxis = [];

    confirmedArray.forEach((confirmed, index) => {
      xaxis.push(moment(confirmed.Date).format("DD-MMM"));
      yaxis.push(parseInt(confirmed.Confirmed));
    });

    const chart4 = Highcharts.chart('confirmedContainer', {
      chart: {
        backgroundColor: 'rgba(255,7,58,.12549)',
        type: 'line'
      },
      title: {
        style: {
          color: 'red',
          fontWeight: 'bold'
        },
        text: 'Total Cases'
      },
      xAxis: {
        categories: xaxis,
        labels: {
          style: {
            color: 'red'
          }
        }
      },
      yAxis: {
        title: {
          text: 'No of Cases',
          style: {
            color: 'red'
          }
        },
        labels: {
          style: {
            color: 'red'
          }
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        },
        series: {
          color: 'rgba(255, 7, 58, 0.6)'
        }
      },
      series: [{
        name: 'Total Confirmed Cases',
        data: yaxis
      }]
    });
  }

  recoveredGraph(recoveredArray) {

    var xaxis = [];
    var yaxis = [];

    recoveredArray.forEach(confirmed => {
      xaxis.push(moment(confirmed.Date).format("DD-MMM"));
      yaxis.push(parseInt(confirmed.Recovered));
    });

    const chart4 = Highcharts.chart('recoveredContainer', {
      chart: {
        backgroundColor: 'rgba(40,167,69,.12549)',
        type: 'line'
      },
      title: {
        style: {
          color: 'green',
          fontWeight: 'green'
        },
        text: 'Total Recovered'
      },
      xAxis: {
        categories: xaxis,
        labels: {
          style: {
            color: 'green'
          }
        }
      },
      yAxis: {
        title: {
          text: 'No of Cases',
          style: {
            color: 'green'
          }
        },
        labels: {
          style: {
            color: 'green'
          }
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        },
        series: {
          color: '#28a745'
        }
      },
      series: [{
        name: 'Total Confirmed Cases',
        data: yaxis
      }]
    });
  }

  deathsGraph(deathsArray) {

    var xaxis = [];
    var yaxis = [];

    deathsArray.forEach(confirmed => {
      xaxis.push(moment(confirmed.Date).format("DD-MMM"));
      yaxis.push(parseInt(confirmed.Deaths));
    });

    const chart4 = Highcharts.chart('deathsContainer', {
      chart: {
        backgroundColor: 'rgba(108,117,125,.0627451)',
        type: 'line'
      },
      title: {
        text: 'Total Deaths'
      },
      xAxis: {
        categories: xaxis,
      },
      yAxis: {
        title: {
          text: 'No of Cases'
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: false
          },
          enableMouseTracking: true
        },
        series: {
          color: '#6c757d'
        }
      },
      series: [{
        name: 'Total Confirmed Cases',
        data: yaxis
      }]
    });
  }
}