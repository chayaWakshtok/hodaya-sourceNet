import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { Role } from '../shared/role';
import { Permission } from '../shared/permission';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddRoleComponent } from '../modal-add-role/modal-add-role.component';
import { ModalEditRoleComponent } from '../modal-edit-role/modal-edit-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  permission:Permission[]=[];
  role:Role=new Role();
  constructor(public fileService: FilesService,
    public modalService:NgbModal) { }

  ngOnInit() {
    this.fileService.getRoles().subscribe((res: Role[]) => {
      this.roles = res;
    })
  }

  addRole()
  {
  const modalRef = this.modalService.open(ModalAddRoleComponent);
      modalRef.result.then((result) => {
      this.roles=result;
      }).catch((result) => {   
        this.roles=result;
       }); 
  }

  edit(role: Role) {
    const modalRef = this.modalService.open(ModalEditRoleComponent);
    modalRef.componentInstance.role={...role};
    modalRef.result.then((result) => {
      debugger;
      this.roles=result;
    }).catch((result) => { 
      this.roles=result;
      }); 
  }

}
