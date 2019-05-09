import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SourceNetUI';

  constructor() {}

  levelLogIn:number=0;
  noPermissionToEnterpAge:boolean=false;
  strPremission:string="";

  logIn(value:number){
      this.levelLogIn = value;
  }

  toggleTitle(){
    $('.title').slideToggle(); 
  }

}
