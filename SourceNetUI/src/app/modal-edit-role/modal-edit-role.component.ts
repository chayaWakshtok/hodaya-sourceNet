import { Component, OnInit, Input } from '@angular/core';
import { Role } from '../shared/role';
import { Permission } from '../shared/permission';
import { FilesService } from '../files.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-edit-role',
  templateUrl: './modal-edit-role.component.html',
  styleUrls: ['./modal-edit-role.component.css']
})
export class ModalEditRoleComponent implements OnInit {

  @Input() role:Role;
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
    this.fileService.editRole(this.role).subscribe(res => {
      this.toastrService.success('ההרשאה עודכנה בהצלחה');
      this.activeModal.close(res);
    },err=>{
      this.toastrService.error('עדכון הרשאה נכשלה');
      this.activeModal.dismiss({});
    })
  }

}
