import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { Role } from '../shared/role';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];

  constructor(public fileService: FilesService) { }

  ngOnInit() {
    this.fileService.getRoles().subscribe((res: Role[]) => {
      this.roles = res;
    })
  }

  edit(role: Role) {
     
  }

  updateRole()
  {
    
  }

}
