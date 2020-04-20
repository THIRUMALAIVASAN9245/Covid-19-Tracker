import { AppComponent } from '../app.component';
import { DataService } from '../data.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-country-wise',
  templateUrl: './country-wise.component.html',
  styleUrls: ['./country-wise.component.css']
})
export class CountryWiseComponent {
  searchText: string = '';
  
  @Input() stateData: any[];
  constructor(){}

  // stateData : any[];

  // constructor(private service : DataService) { }

  // ngOnInit() {
  //   this.service.getData()
  //   .subscribe(response => {
  //     this.stateData = response["statewise"];
  //   })
  // }


}
