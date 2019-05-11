import { Component, OnInit } from '@angular/core';
import { Resource } from '../shared/resource';
import { FilesService } from '../files.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-resources-detail',
  templateUrl: './resources-detail.component.html',
  styleUrls: ['./resources-detail.component.css']
})
export class ResourcesDetailComponent implements OnInit {

  viewSingelFile: boolean = false;
  SelectedFile: File;
  resource: Resource[] = [];
  resourceFillter: Resource[] = [];

  readPremission: boolean = false;
  writePremission: boolean = false;
  viewPremission: boolean = false;
  donloadPremission: boolean = false;

  SingelFile: Resource;
  iframeSrc: any = "";
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

  constructor(public fileSevice: FilesService,
    private route:ActivatedRoute,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.SingelFile = this.fileSevice.resourceDetails;
    this.extType = this.SingelFile.type;
    this.fileSevice.getContentFile(this.SingelFile.resourceCode).subscribe(con => {
      const blob = this.dataURItoBlob(con);
      const url = window.URL.createObjectURL(blob);
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    })
    debugger;
    this.SingelFile.Permissions.forEach(element => {
      if (element.permissionsCode == 4)
        this.writePremission = true;
      if (element.permissionsCode == 3)
        this.viewPremission = true;
      if (element.permissionsCode == 5)
        this.donloadPremission = true;
    });
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

openResource(){
  this.fileSevice.openResource(this.SingelFile.resourceCode).subscribe(res=>{})
}
}
