import { Component, OnInit } from '@angular/core';
import { Role } from '../shared/role';
import { Permission } from '../shared/permission';
import { FilesService } from '../files.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-add-role',
  templateUrl: './modal-add-role.component.html',
  styleUrls: ['./modal-add-role.component.css']
})
export class ModalAddRoleComponent implements OnInit {
role:Role=new Role();
per:Permission[]=[];
  constructor(public fileService:FilesService,
    public toastrService:ToastrService,public activeModal:NgbActiveModal) { }

  ngOnInit() {
  this.fileService.getPremmisionsRole().subscribe((res:Permission[])=>{
    this.per=res;
  })
  }

  submitForm()
  {
    this.fileService.addRole(this.role).subscribe(res => {
      this.toastrService.success('ההרשאה נוספה בהצלחה');
      this.activeModal.close(res);
    },err=>{
      this.toastrService.error('הוספת הרשאה נכשלה');
      this.activeModal.dismiss({});
    })
  }

}
