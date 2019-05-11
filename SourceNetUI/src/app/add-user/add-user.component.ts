import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  roles: any = [];
  newUser: User = new User();

  constructor(public fileService: FilesService, private toastr: ToastrService) { }

  ngOnInit() {
    this.fileService.getRoles().subscribe(res => {
      this.roles = res;
    })
  }

  addUser() {
    this.fileService.addUser(this.newUser).subscribe(res => {
      this.toastr.success('success to add user');
    })
  }

}
