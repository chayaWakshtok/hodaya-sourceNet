import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public fileService: FilesService) { }

  arr: number[] = [];
  addUser: boolean = false;
  logOut: boolean = false;
  permission: boolean = false;
  addFile:boolean=false;

  ngOnInit() {
    this.fileService.loginSubject.subscribe((res: number[]) => {
      this.arr = res;
      if (this.arr.filter(p => p == 1009))
        this.addUser = true;
        if (this.arr.filter(p => p == 6))
        this.addFile = true;
      if (this.arr.filter(p => p == 2009))
        this.permission = true;
    })
  }

}
