import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilesService } from '../files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public fileService:FilesService,
    public router:Router) { }

  ngOnInit() {
  }

  isLogIn:number=0;//1=registered user; 2=System Administrator;
 

  logIn(){

    if(true)
    {
        this.isLogIn=1;
        this.fileService.loginSubject.next(true);
        this.router.navigate(['/search'])
    }
    alert("!!!");
  }
}
