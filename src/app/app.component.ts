import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

declare var require: any
var Highcharts = require('highcharts/highmaps.js');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  myData: any[];
  stateData: any[];
  serverResponse: boolean = true;

  countrylist: any[];
  selectedCountryData: any;
  confirmedCase: number;
  activeCase: number;
  RecoveredCase: number;
  DeceasedCase: number;
  confirmedNewCase: number;
  RecoveredNewCase: number;
  DeceasedNewCase: number;
  ActiveCaseRemaining: number;

  message = 'No Country Selected';
  cssMsg = 'alert alert-secondary text-uppercase mt-2';

  constructor(private service: DataService) { }

  ngOnInit() {
    this.service.getCountryWiseSummary()
      .subscribe(response => {
        this.myData = response;
        this.stateData = this.myData['Countries'];
        this.serverResponse = true;
      }, error => {
        this.serverResponse = false;
      })

    this.thisCountryData();
  }

  thisCountryData() {
    this.cssMsg = 'spinner-border';
    this.message = '';
    this.service.getCountryWiseSummary()
      .subscribe(response => {
        this.serverResponse = true;
        if (response) {
          this.selectedCountryData = response.Global;

          this.confirmedCase = this.selectedCountryData.TotalConfirmed;
          this.confirmedNewCase = this.selectedCountryData.NewConfirmed;

          this.RecoveredCase = this.selectedCountryData.TotalRecovered;
          this.RecoveredNewCase = this.selectedCountryData.NewRecovered;

          this.DeceasedCase = this.selectedCountryData.TotalDeaths;
          this.DeceasedNewCase = this.selectedCountryData.NewDeaths;

          this.activeCase = this.selectedCountryData.TotalConfirmed - (this.selectedCountryData.TotalRecovered - this.selectedCountryData.TotalDeaths);
          this.ActiveCaseRemaining = 34;

          if (this.selectedCountryData.length === 0) {
            this.message = 'As per our data, This country has no covid-19 reports yet.';
            this.cssMsg = 'alert alert-success text-uppercase mt-2';
          }
        }
      }, error => {
        this.serverResponse = false;
        this.cssMsg = 'spinner-border';
        this.message = '';
      });
  }

  currentDT: Number = Date.now();
  // total: number = this.myData.map(x=>x.cases).reduce((a,b)=>a+b);
  total: number = 20000;

  // keyData : any = Object.keys(stateWiseData)[0];

} 