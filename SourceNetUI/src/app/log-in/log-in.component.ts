import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isLogIn:number=0;//1=registered user; 2=System Administrator;
  @Output() eLogIn: EventEmitter<any> = new EventEmitter();

  logIn(){

    //get user premition

    if(true)
    {
        this.isLogIn=1;
        this.eLogIn.emit(this.isLogIn);
    }
    alert("!!!");
  }
}
