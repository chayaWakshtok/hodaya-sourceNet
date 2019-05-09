import { Component, OnInit } from '@angular/core';
import { Resource } from '../shared/resource';
import { FilesService } from '../files.service';
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
  iframeSrc: any="";
  extType: any = "application/pdf";

  public filesExtensions = {
    
    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.png': 'image/png',
    '.xml': 'application/xml',
    '.doc': 'application/msword',
    '.csv': 'text/csv',
    '.txt': 'text/plain'
  }

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

    this.SingelFile = res;
    this.extType=this.SingelFile.type;
    this.fileSevice.getContentFile(this.SingelFile.resourceCode).subscribe(con=>{
      const blob=this.dataURItoBlob(con);
      const url= window.URL.createObjectURL(blob);
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
   
    // this.urlFile = this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:8887/Files/" + this.SingelFile.resourceName);
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

  dataURItoBlob(dataURI) {
    var binary = atob(dataURI["ContentBase64"]);
    var array = [];
  for (var i = 0; i < binary.length; i++) {
     array.push(binary.charCodeAt(i));
  }
 return new Blob([new Uint8Array(array)], {
    type: this.filesExtensions[dataURI["TypeFile"]]
});
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
