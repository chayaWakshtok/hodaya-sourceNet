import { Component, OnInit } from '@angular/core';
import { Resource } from '../shared/resource';
import { FilesService } from '../files.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  urlFile: any;
  resource: Resource[]=[];
  resourceFillter: Resource[]=[];

  constructor(public fileSevice: FilesService, public sanitizer: DomSanitizer,
     public ngxSmartModalService: NgxSmartModalService,public router:Router) { }

  ngOnInit() {

    this.fileSevice.getAllResource().subscribe(res => {
      this.resource = res;
      this.resourceFillter = res;
    })
  }
  selectSearchBydate: boolean = false;
  selectSearchBytag: boolean = false;
  selectSearchByname: boolean = false;
  selectSearchBytype: boolean = false;

  valueSearchBydate: any;
  valueSearchBytag: string;
  valueSearchByname: string;
  valueSearchBytype: any;



  ChangingValue(value: string) {
  
    switch (value) {

      case "1": {
        this.selectSearchByname = true;
        break;
      }
      case "2": {
        this.selectSearchBytag = true;
        break;
      }
      case "3": {
        this.selectSearchBytype = true;
        break;
      }
      case "4": {
        this.selectSearchBydate = true;
        break;
      }
      default: {
        console.log("Invalid choice");
        break;
      }
    }
  }

  fillter() {
    this.resourceFillter = this.resource;
    if (this.selectSearchBydate)
      this.resourceFillter = this.resourceFillter.filter(p => p.date == this.valueSearchBydate);
    if (this.selectSearchByname)
      this.resourceFillter = this.resourceFillter.filter(p => p.resourceName.includes(this.valueSearchByname));
    if (this.selectSearchBytag)
      this.resourceFillter = this.resourceFillter.filter(p => p.Categories.findIndex(p => p.categoryName == this.valueSearchBytag));
    if (this.selectSearchBytype)
      this.resourceFillter = this.resourceFillter.filter(p => p.type == this.valueSearchBytype);
  }

  removeDate() {
    this.selectSearchBydate = false;
  }
  removeName() {
    this.selectSearchByname = false;
  }
  removeTag() {
    this.selectSearchBytag = false;
  }
  removeType() {
    this.selectSearchBytype = false;
  }

  showFile(res:Resource) {
    this.fileSevice.resourceDetails=res;
    this.router.navigate(['resources-detail'])
  }


  searchByDate(date) {
    this.valueSearchBydate = date;
    this.fillter();
  }

  searchByTag(tag) {
    this.valueSearchBytag = tag;
    this.fillter();
  }

  searchByName(name) {
    this.valueSearchByname = name;
    this.fillter();
  }

  searchByType(type) {
    this.valueSearchBytype = type;
    this.fillter();
  }

  openModal() {

  }


}
