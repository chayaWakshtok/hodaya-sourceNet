import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilesService } from '../files.service';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(public fileService: FilesService,
    public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  isLogIn: number = 0;//1=registered user; 2=System Administrator;
  userName: string;
  password: string;

  logIn() {

    this.fileService.login(this.userName, this.password).subscribe((res: User) => {
      if(res!=null)
     {
       this.fileService.user=res;
      this.fileService.loginSubject.next(res.Role.Permissions.map(p => p.permissionsCode));
      this.router.navigate(['/search']);
     }
     else this.toastr.error("Username or password do not currect");

    }, err => {
      this.toastr.error(err);
    })

    // if (true) {
    //   this.isLogIn = 1;
    //   this.fileService.loginSubject.next(true);
    //   this.router.navigate(['/search'])
    // }
    // alert("!!!");
  }
}
