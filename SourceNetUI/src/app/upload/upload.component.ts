import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FileUploader } from 'ng2-file-upload';
import { Resource } from '../shared/resource';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import swal from 'sweetalert';

import Swal from 'sweetalert2'
import { UploadService } from '../upload.service';
import { Category } from '../shared/category';
import { Permission } from '../shared/permission';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditResourceModalComponent } from '../edit-resource-modal/edit-resource-modal.component';
import { ModalUpdateAllComponent } from '../modal-update-all/modal-update-all.component';


const URL = 'path_to_api';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  dropdownEnabled = true;
  selectedCategories: any = [];
  selectPer: any = [];
  categories: any = [];
  fileToUpload: File;
  recorceFile: Resource = new Resource();
  permission: any[] = [];
  public uploader: FileUploader = new FileUploader({ url: URL });
  file: any;
  constructor(public fileService: FilesService,
    public toastrService: ToastrService,
    public router: Router,
    public uploadService: UploadService,
    public modalService: NgbModal) { }

  ngOnInit() {
  }

  // handleFileInput(files: any) {
  //   for (var i = 0; i < files.length; i++) {

  //     this.file = files[i];
  //     this.recorceFile.resourceName = files[i].name;
  //     this.recorceFile.type = files[i].type;
  //     this.recorceFile.sizeB = files[i].size;
  //     this.recorceFile.date = files[i].lastModifiedDate;
  //   }
  // }

  replaceFile(i,item) {

    debugger;
    this.uploadService.replace(this.filesUpload[i], item).subscribe(res => {
      this.toastrService.success("העלאת הקובץ הצליחה");
      this.files.splice(i, 1);
      //this.router.navigate(['/search']);
    }, err => {
      this.toastrService.error("העלאת הקובץ נכשלה")
    });
  }

  stayTwoFile(name,i,item:Resource) {
    let ex = item.resourceName.split(".")[1]
    item.resourceName = name + "." + ex;
    this.uploadService.same(this.filesUpload[i],item).subscribe(res => {
      this.files.splice(i, 1);
      this.toastrService.success("העלאת הקובץ הצליחה");
      //this.router.navigate(['/search']);
    }, err => {
      this.toastrService.error("העלאת הקובץ נכשלה")
    });
  }


  uploadSingleFile(i,item) {
    debugger;
    this.uploadService.uploadFileResource(this.filesUpload[i], item).subscribe(res => {
      this.files.splice(i, 1);
      this.toastrService.success("העלאת הקובץ הצליחה");
      //this.router.navigate(['/search']);
    }, err => {
      swal("קובץ בעל שם כזה קים במאגר", {
        buttons: {
          cancel: "ביטול!",
          catch: {
            text: "החלף",
            value: "catch",
          },
          defeat: {
            text: "השאר את שתיהם!",
            value: "change"
          },
        },
      })
        .then((value) => {
          switch (value) {
            case "change":
              swal({
                text: 'הכנס שם קובץ',
                content: "input",
                button: {
                  text: "בצע!",
                  closeModal: false,
                },
              })
                .then(name => {
                  if (!name) throw null;
                  this.stayTwoFile(name,i,item);
                })
              break;
            case "catch":
              this.replaceFile(i,item);
              break;
            default:
              swal("העלאה בוטלה!");
              this.files.splice(i, 1);
              //this.router.navigate(['search']);
          }
        });
    })
  }

  files: Resource[] = [];
  filesUpload: File[] = [];
  public dropped(event) {
    debugger;
    this.files = [];
    for (const droppedFile of event.files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      
        fileEntry.file((file: File) => {
          this.filesUpload.push(file)
          var date = new Date(file.lastModified);
          if(file.name.indexOf('$')==-1)
          this.files.push({ resourceName: file.name, type: file.type, date: date, sizeB: file.size });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  openModal(res, i) {
    const modalRef = this.modalService.open(EditResourceModalComponent);
    modalRef.componentInstance.recorceFile = res;
    modalRef.result.then((result) => {
      debugger;
      this.files[i] = result;
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  allResDefinition: any={categories:[],permissions:[]};
  openModalUpdateAll() {
    const modalRef = this.modalService.open(ModalUpdateAllComponent);
    modalRef.componentInstance.Categories=this.allResDefinition.categories;
    modalRef.componentInstance.Permissions=this.allResDefinition.permissions;
    modalRef.result.then((result) => {
      debugger;
      this.files.forEach(f => {
        f.Permissions = result.permissions;
        f.Categories = result.categories;
      })
      this.allResDefinition = result;
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  uploadAllFiles()
  {
    var i=0;
    this.files.forEach(f=>{
      this.uploadSingleFile(i,f)
      i++;
    })
  }

}


