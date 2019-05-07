import { Component, OnInit, Input } from '@angular/core';
import { Resource } from 'src/app/shared/resource';
import {DomSanitizer} from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from 'src/app/files.service';

@Component({
  selector: 'app-view-singel-file',
  templateUrl: './view-singel-file.component.html',
  styleUrls: ['./view-singel-file.component.css']
})
export class ViewSingelFileComponent implements OnInit {
  urlFile: any;

  constructor(public sanitizer: DomSanitizer,public fileService:FilesService) { }
  readPremission: boolean = false;
  writePremission: boolean = false;
  viewPremission: boolean = false;
  donloadPremission: boolean = false;

  ngOnInit() {
    this.SingelFile=this.fileService.url_file;
  }

  ngOnChanges(): void {
    debugger;
    this.SingelFile=this.fileService.url_file;
    this.SingelFile.Permissions.forEach(element => {
      if (element.permissionsCode == 4)
      this.writePremission = true;
      if (element.permissionsCode == 3)
      this.viewPremission = true;
      if (element.permissionsCode == 5)
      this.donloadPremission = true;
  });
  debugger;
 this.urlFile=this.sanitizer.bypassSecurityTrustResourceUrl("http://127.0.0.1:8887/Files/"+this.SingelFile.resourceName);
  }

  SingelFile: Resource;

}
