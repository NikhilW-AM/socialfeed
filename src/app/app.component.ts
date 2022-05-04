import { Component, OnInit } from '@angular/core';
import { FetchdataService } from './services/fetchdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'socialfeed';
  isLoggedIn: boolean = false

  constructor(private _fetchdata: FetchdataService) { }

}
