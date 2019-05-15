import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public fileService:FilesService) { }

  permissionAdmin:boolean=false;

  ngOnInit() {
    this.fileService.loginSubject.subscribe((res:boolean)=>{
      this.permissionAdmin=res;
    })
  }

}
