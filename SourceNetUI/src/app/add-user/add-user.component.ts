import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  roles: any = [];
  newUser: User = new User();

  constructor(public fileService: FilesService, private toastr: ToastrService, private activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.fileService.getRoles().subscribe(res => {
      this.roles = res;
    })
  }

   submitForm() {
    this.fileService.addUser(this.newUser).subscribe(res => {
      this.toastr.success('success to add user');
      this.activeModal.close(this.newUser);
    },err=>{
      this.activeModal.close({});
    })
    
  }

}
