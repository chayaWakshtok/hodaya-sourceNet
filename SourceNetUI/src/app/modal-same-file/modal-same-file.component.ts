import { Component, OnInit, Input } from '@angular/core';
import { Resource } from '../shared/resource';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-same-file',
  templateUrl: './modal-same-file.component.html',
  styleUrls: ['./modal-same-file.component.css']
})
export class ModalSameFileComponent implements OnInit {

  @Input() sameResource:Resource ;
  constructor(  public activeModal: NgbActiveModal
    ) { }

  ngOnInit() {
  }

  closeModal() {
    this.activeModal.close();
  }

}
