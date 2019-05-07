import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilesService } from 'src/app/files.service';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-search-by-tag',
  templateUrl: './search-by-tag.component.html',
  styleUrls: ['./search-by-tag.component.css']
})
export class SearchByTagComponent implements OnInit {

  searchTag: any = [];
  tags: Category[] = [];

  constructor(public fileService: FilesService) { }

  ngOnInit() {
    this.fileService.getAllCategories().subscribe(res => {
      this.tags = res;
    })
  }

  @Output() removeSearchByTag: EventEmitter<any> = new EventEmitter();
  @Output() searchByTag: EventEmitter<any> = new EventEmitter();

  removeSearch() {
    this.removeSearchByTag.emit(null);
  }

  search() {
    this.searchByTag.emit(this.searchTag);
  }
}
