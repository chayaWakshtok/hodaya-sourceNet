import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.css']
})
export class SearchByNameComponent implements OnInit {

  constructor() { }
  searchName: string="";
  
  ngOnInit() {
  }

  @Output() removeSearchByName: EventEmitter<any> = new EventEmitter();
  @Output() searchByName: EventEmitter<any> = new EventEmitter();

  removeSearch() {
    this.removeSearchByName.emit(null);
  }

  search() {
    this.searchByName.emit(this.searchName)
  }

}
