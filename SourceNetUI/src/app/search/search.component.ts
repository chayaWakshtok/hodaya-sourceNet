import { Component, OnInit } from '@angular/core';
import { Resource } from '../shared/resource';
import { FilesService } from '../files.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewSingelFileComponent } from './view-singel-file/view-singel-file.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  urlFile: any;

  constructor(public fileSevice: FilesService, public sanitizer: DomSanitizer,
     public ngxSmartModalService: NgxSmartModalService) { }

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

  viewSingelFile: boolean = false;
  SelectedFile: File;
  resource: Resource[] = [];
  resourceFillter: Resource[] = [];

  readPremission: boolean = false;
  writePremission: boolean = false;
  viewPremission: boolean = false;
  donloadPremission: boolean = false;

  SingelFile: Resource;

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

  showFile(res) {
    debugger;
    this.viewSingelFile = true;

    this.SelectedFile = res;
    this.SingelFile = res;
    this.urlFile = this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:8887/Files/" + this.SingelFile.resourceName);
    this.SingelFile.Permissions.forEach(element => {
      if (element.permissionsCode == 4)
        this.writePremission = true;
      if (element.permissionsCode == 3)
        this.viewPremission = true;
      if (element.permissionsCode == 5)
        this.donloadPremission = true;
    });
    this.ngxSmartModalService.getModal('myModal').open();
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
