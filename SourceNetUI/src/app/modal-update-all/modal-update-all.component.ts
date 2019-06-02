import { Component, OnInit, Input } from '@angular/core';
import { Permission } from '../shared/permission';
import { Category } from '../shared/category';
import { FilesService } from '../files.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalNewCategoryComponent } from '../modal-new-category/modal-new-category.component';

@Component({
  selector: 'app-modal-update-all',
  templateUrl: './modal-update-all.component.html',
  styleUrls: ['./modal-update-all.component.css']
})
export class ModalUpdateAllComponent implements OnInit {

  @Input() Permissions:Permission[]=[];
  @Input() Categories:Category[]=[];
  allCategories: Category[]=[];
  allPermission: Permission[]=[];
  constructor(public fileService:FilesService,
    public activeModal: NgbActiveModal,
    public modalService:NgbModal
    ) { }

  ngOnInit() {
    this.fileService.getAllCategories().subscribe(res => {
      this.allCategories = res;
    });
    this.fileService.getPermisionsFile().subscribe(res => {
      this.allPermission = res;
    });
  }

  save()
  {
    this.activeModal.close({categories:this.Categories,permissions:this.Permissions})
  }

  addCategory()
  {
    const modalRef = this.modalService.open(ModalNewCategoryComponent);
    modalRef.result.then((result) => {
      this.fileService.getAllCategories().subscribe(res => {
        this.allCategories = res;
      });
    }).catch((error) => {    });
  }

}
