import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { FilesService } from '../files.service';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-new-category',
  templateUrl: './modal-new-category.component.html',
  styleUrls: ['./modal-new-category.component.css']
})
export class ModalNewCategoryComponent implements OnInit {

  category: Category = new Category();
  constructor(public fileService: FilesService,
    public toastrService: ToastrService,
    public activeModal:NgbActiveModal,
   ) { }

  ngOnInit() {

  }

  add() {
    this.fileService.addNewCategory(this.category).subscribe(res => {
      this.toastrService.success("הקטגוריה נוספה בהצלחה");
      this.activeModal.close();
    })
  }

}
