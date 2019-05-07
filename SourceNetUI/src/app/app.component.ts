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

  pageAddUser: boolean= false;
  pageSearch: boolean=true;
  pageUpload: boolean=false;
  pageLogIn: boolean=false;

  levelLogIn:number=0;
  noPermissionToEnterpAge:boolean=false;
  strPremission:string="";

  linkPage(pageName:string){

    switch(pageName) { 
      case "search": { 
        this.pageSearch = true;
        this.pageUpload = false;
        this.pageAddUser = false;
        this.pageLogIn = false;
        this.noPermissionToEnterpAge=false;
         break; 
      } 
      case "upload": { 
        if(this.levelLogIn>=1)
        {
          this.pageUpload = true;
          this.pageAddUser = false;
          this.pageLogIn = false;
          this.pageSearch = false;
          this.noPermissionToEnterpAge=false;
        }
        else
        {
          this.noPermissionToEnterpAge=true;
          this.strPremission="אין לך הרשאה להעלות קובץ. בבקשה התחבר למערכת או שאינך משתמש רשום";
        }
         break; 
      } 
      case "AddUser": { 
        if(this.levelLogIn==2)
        {
          this.pageAddUser = true;
          this.pageLogIn = false;
          this.pageSearch = false;
          this.pageUpload = false;
          this.noPermissionToEnterpAge=false;
        }
        else
        {
          this.noPermissionToEnterpAge=true;
          this.strPremission="אין לך הרשאה להוסיף משתמש. בבקשה התחבר למערכת או שאינך מנהל המערכת";
        }
        break; 
      } 
      case "LogIn": { 
        this.pageLogIn = true;
        this.pageUpload = false;
        this.pageAddUser = false;
        this.pageSearch = false;
        this.noPermissionToEnterpAge=false;
        break; 
      } 
      default: { 
        console.log("Invalid choice"); 
        break;              
     } 
    }

  }
  logIn(value:number){
      this.levelLogIn = value;

  }

  toggleTitle(){
    $('.title').slideToggle(); 
  }


}
