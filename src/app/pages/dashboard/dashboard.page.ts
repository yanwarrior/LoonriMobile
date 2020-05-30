import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  searchBar: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  test() {
    alert('Hello');
  }

  showSearchBar() {
    this.searchBar = !this.searchBar;
  }

  cancelSearchBar() {
    this.searchBar = false;
  }

}
