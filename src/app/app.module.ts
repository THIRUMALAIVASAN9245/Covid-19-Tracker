import { DataService } from './data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {NgForm, FormsModule} from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { GrdFilterPipe } from './builder-filter-pipe';
import { CountryWiseComponent } from './country-wise/country-wise.component';

@NgModule({
   declarations: [
      AppComponent,
      NavBarComponent,
      CountryWiseComponent,
      FooterComponent,
      ChartJsComponent,
      GrdFilterPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      AutocompleteLibModule,
      HttpModule
   ],
   providers: [
      DataService,
      GrdFilterPipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
