import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-by-type',
  templateUrl: './search-by-type.component.html',
  styleUrls: ['./search-by-type.component.css']
})
export class SearchByTypeComponent implements OnInit {

  types:any=[];
  constructor() { }
  search: any = [];
  ngOnInit() {
    this.types=["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","txt","word","ts"];
  }

  @Output() removeSearchByType: EventEmitter<any> = new EventEmitter();
  @Output() searchByType: EventEmitter<any> = new EventEmitter();

  removeSearch() {
    this.removeSearchByType.emit(null);
  }

  searchType() {
    this.searchByType.emit(this.search);
  }

}
