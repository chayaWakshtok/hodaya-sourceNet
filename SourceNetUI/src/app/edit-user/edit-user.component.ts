import { Component, OnInit, Input } from '@angular/core'
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from '../files.service';
import { User } from '../shared/user';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  
  roles: any = [];
  @Input() newUser: User;

  constructor(public fileService: FilesService, private toastr: ToastrService, private activeModal:NgbActiveModal) { }

  ngOnInit() {
    this.fileService.getRoles().subscribe(res => {
      this.roles = res;
    })
  }

   submitForm() {
    this.fileService.updateUser(this.newUser).subscribe(res => {
      this.toastr.success('עדכון המשתמש הצליח');
      this.activeModal.close(res);
    },err=>{
      this.activeModal.dismiss({});
    })
    
  }

}
