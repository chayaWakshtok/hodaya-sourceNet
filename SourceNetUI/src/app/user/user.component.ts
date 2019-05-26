import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { User } from '../shared/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  allUsers: User[]=[];
  checkAll:boolean=true;
  constructor(public fileService:FilesService,  private modalService: NgbModal) { }

  ngOnInit() {
    this.fileService.getUsers().subscribe((res:User[])=>{
      this.allUsers=res;
    })
  }

edit(user)
{
  const modalRef = this.modalService.open(EditUserComponent);
  modalRef.componentInstance.newUser=user;
  modalRef.result.then((result) => {
   this.allUsers=result;
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}

delete(user)
{
  Swal.fire({
    title: ' האם את בטוחה ?', 
    text: "   שברצונך למחוק את המשתמש!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'מחיקה!'
  }).then((result) => {
    if (result.value) {
      this.fileService.deleteUser(user).subscribe(res=>{
        var index = this.allUsers.indexOf(user);
        this.allUsers.splice(index, 1);
        Swal.fire(
          'נמחק!',
          'המשתמש נמחק בהצלחה',
          'success'
        )
      })  
    }
  })

}

addUser() {
  
  const modalRef = this.modalService.open(AddUserComponent);
  
  modalRef.result.then((result) => {
    this.allUsers.push(result);
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}

}
