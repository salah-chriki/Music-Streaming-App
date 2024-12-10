import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-recent-searches',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './recent-searches.component.html',
  styleUrl: './recent-searches.component.scss'
})
export class RecentSearchesComponent implements OnInit {

  recentSearches = [
    'Top Morocco', 'Top Global', 'Suggested Hits',
    'Funk Hits'
  ];

  searchField = '';

  constructor() {
  }

  ngOnInit(): void {
  }

  setSearch(search: string) {
    this.searchField = search;
  }

  search() {
    console.log('Searching...', this.searchField);
  }
}


