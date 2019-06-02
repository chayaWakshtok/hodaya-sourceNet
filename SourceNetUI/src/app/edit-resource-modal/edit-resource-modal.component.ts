import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Resource } from '../shared/resource';
import { FilesService } from '../files.service';
import { Category } from '../shared/category';
import { Permission } from '../shared/permission';
import { ModalNewCategoryComponent } from '../modal-new-category/modal-new-category.component';

@Component({
  selector: 'app-edit-resource-modal',
  templateUrl: './edit-resource-modal.component.html',
  styleUrls: ['./edit-resource-modal.component.css']
})
export class EditResourceModalComponent implements OnInit {

  @Input() recorceFile:Resource;
  categories: Category[]=[];
  permission: Permission[]=[];
  constructor( public activeModal: NgbActiveModal,
    public fileService:FilesService,
    public modalService:NgbModal) { }

  ngOnInit() {
    this.fileService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.fileService.getPermisionsFile().subscribe(res => {
      this.permission = res;
    });
  }

  save()
  {
    this.activeModal.close(this.recorceFile);
  }

  addCategory()
  {
    const modalRef = this.modalService.open(ModalNewCategoryComponent);
    modalRef.result.then(() => {
      debugger
      this.fileService.getAllCategories().subscribe(res => {
        this.categories = res;
      });
    }).catch((error) => {    });
  }

}
