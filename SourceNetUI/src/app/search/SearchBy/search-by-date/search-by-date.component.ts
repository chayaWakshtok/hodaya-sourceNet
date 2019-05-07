import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-by-date',
  templateUrl: './search-by-date.component.html',
  styleUrls: ['./search-by-date.component.css']
})
export class SearchByDateComponent implements OnInit {

  constructor() { }

  searchDate:Date;
  ngOnInit() {
  }

  @Output() removeSearchByDate: EventEmitter<any> = new EventEmitter();
  @Output() searchByDate: EventEmitter<any> = new EventEmitter();

  removeSearch(){
    this.removeSearchByDate.emit(null);
  }

  search()
  {
    this.searchByDate.emit(this.searchDate)
  }
}
