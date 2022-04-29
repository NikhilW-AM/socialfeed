import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  show: boolean = false;
  ngOnInit(): void {
  }
  showList() {
    this.show = !this.show
  }
  logout() {
  }
}
