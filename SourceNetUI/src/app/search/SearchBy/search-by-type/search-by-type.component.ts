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
  public filesExtensions = {

    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'png': 'image/png',
    'xml': 'application/xml',
    'doc': 'application/msword',
    'csv': 'text/csv',
    'txt': 'text/plain'
  }
  ngOnInit() {
    this.types=["pdf","jpg","jpeg","docx","png","xml","doc","csv","txt"];
  }

  @Output() removeSearchByType: EventEmitter<any> = new EventEmitter();
  @Output() searchByType: EventEmitter<any> = new EventEmitter();

  removeSearch() {
    this.removeSearchByType.emit(null);
  }

  searchType() {
    this.searchByType.emit(this.filesExtensions[this.search]);
  }

}
