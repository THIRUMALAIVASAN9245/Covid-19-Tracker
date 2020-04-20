import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private url = 'https://api.covid19api.com/live/country/india/status/confirmed';
  private countryList = 'https://api.covid19api.com/countries';
  private covid19indiaorgUrl = 'https://api.covid19india.org/data.json';

  constructor(private http: Http){}

  getData(){
    return this.http.get(this.covid19indiaorgUrl)
    .map((response: any) => response.json())
  }

  getCountries(){
    return this.http.get(this.countryList)
    .map((response: any) => response.json());
  }

  getSelectedCountryStats(value: string){
    return this.http.get('https://api.covid19api.com/live/country/' + value + '/status/confirmed')
    .map((response: any) => response.json());
  }

  getCountryWiseSummary(){
    return this.http.get('https://api.covid19api.com/summary')
    .map((response: any) => response.json());
  }

  getAllSummary(){
    return this.http.get('https://api.covid19api.com/all')
    .map((response: any) => response.json());
  }

  getMapData(){
    return this.http.get('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json')
    .map((response: any) => response.json());
  }
}
