import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FileUploader } from 'ng2-file-upload';
import { Resource } from '../shared/resource';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import swal from 'sweetalert';

import Swal from 'sweetalert2'
import { UploadService } from '../upload.service';
import { Category } from '../shared/category';
import { Permission } from '../shared/permission';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
    private modalService: NgbModal) { }

  ngOnInit() {

    this.fileService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.fileService.getPermisionsFile().subscribe(res => {

      this.permission = res;
    });
  }

  handleFileInput(files: any) {
    for (var i = 0; i < files.length; i++) {

      this.file = files[i];
      this.recorceFile.resourceName = files[i].name;
      this.recorceFile.type = files[i].type;
      this.recorceFile.sizeB = files[i].size;
      this.recorceFile.date = files[i].lastModifiedDate;
    }
  }

  replaceFile()
  {

    debugger;
    this.uploadService.replace(this.file, this.recorceFile).subscribe(res => {
      this.toastrService.success("העלאת הקובץ הצליחה");
      this.router.navigate(['/search']);
    },err=>{
      this.toastrService.error("העלאת הקובץ נכשלה")
    });
  }

  stayTwoFile(name)
  {
    let ex= this.recorceFile.resourceName.split(".")[1]
    this.recorceFile.resourceName=name+"."+ex;
    this.uploadService.same(this.file, this.recorceFile).subscribe(res => {
      this.toastrService.success("העלאת הקובץ הצליחה");
      this.router.navigate(['/search']);
    },err=>{
      this.toastrService.error("העלאת הקובץ נכשלה")
    });
  }
 

  uploadFile11() {
    this.uploadService.uploadFileResource(this.file, this.recorceFile).subscribe(res => {
      this.toastrService.success("העלאת הקובץ הצליחה");
      this.router.navigate(['/search']);
    }, err => {
      swal("קובץ בעל שם כזה קים במאגר", {
        buttons: {
          cancel: "ביטול!",
          catch: {
            text: "החלף",
            value: "catch",
          },
          defeat: {
            text:"השאר את שתיהם!",
            value:"change"
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
                 this.stayTwoFile(name);
                
              })
         
            break;
       
          case "catch":
           this.replaceFile();
            break;
       
          default:
            swal("העלאה בוטלה!");
            this.router.navigate(['search']);
        }
      });    })
  }
}


