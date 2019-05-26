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
    debugger;
    for (var i = 0; i < files.length; i++) {

      this.file = files[i];
      this.recorceFile.resourceName = files[i].name;
      this.recorceFile.type = files[i].type;
      this.recorceFile.sizeB = files[i].size;
      this.recorceFile.date = files[i].lastModifiedDate;
    }
  }

  selectPermission(value: string) {
  }

  // uploadFile() {


  //   this.fileService.uploadFile(this.file).subscribe(res => {
  //     this.recorceFile.filePath = res;
  //     debugger;
  //     var clist = this.recorceFile.Categories.map(p => p.CategoryId);
  //     var plist = this.recorceFile.Permissions.map(p => p.permissionsCode);
  //     var catlist: Category[] = [];
  //     clist.forEach(p => {
  //       var cat = new Category();
  //       cat.CategoryId = p;
  //       catlist.push(cat);
  //     })
  //     this.recorceFile.Categories = catlist;

  //     var perlist: Permission[] = [];
  //     plist.forEach(p => {
  //       var cat = new Permission();
  //       cat.permissionsCode = p;
  //       perlist.push(cat);
  //     })
  //     this.recorceFile.Permissions = perlist
  //     this.uploadService.upload(this.recorceFile).subscribe(res1 => {
  //       this.toastrService.success("העלאת הקובץ הצליחה");
  //       this.router.navigate(['/search']);
  //     }, err => {
  //       this.toastrService.error("העלאת הקובץ נכשלה");
  //       this.fileService.deleteFile(this.recorceFile.resourceName).subscribe(res => { })
  //     })
  //   }, er => {
  //     swal("הקובץ קיים במאגר", 
  //     // { buttons: {
  //     //   "":"",
  //     //     cancel: "ביטול!",
  //     //     catch: {
  //     //       text: "החלף!",
  //     //       value: "catch",
  //     //     },
  //     //     defeat: "השאר את שתיהם",
  //     //   },
  //     //}
  //     )
  //     .then((value) => {
  //       switch (value) {

  //         case "defeat":
  //           {
  //             this.file.name="(1)"+this.file.name;
  //             this.uploadFile(); 
  //              break;
  //           }
  //         case "catch":
  //           {     
  //           this.replace();
  //           break;
  //           }


  //         default:
  //           swal("בוטל!");
  //       }
  //     });

  //     console.log(er);
  //   });

  // }

  // replace()
  // {
  //   this.fileService.replaceFile(this.file).subscribe(res => {
  //     this.recorceFile.filePath = res;
  //     debugger;
  //     var clist = this.recorceFile.Categories.map(p => p.CategoryId);
  //     var plist = this.recorceFile.Permissions.map(p => p.permissionsCode);
  //     var catlist: Category[] = [];
  //     clist.forEach(p => {
  //       var cat = new Category();
  //       cat.CategoryId = p;
  //       catlist.push(cat);
  //     })
  //     this.recorceFile.Categories = catlist;

  //     var perlist: Permission[] = [];
  //     plist.forEach(p => {
  //       var cat = new Permission();
  //       cat.permissionsCode = p;
  //       perlist.push(cat);
  //     })
  //     this.recorceFile.Permissions = perlist
  //     this.uploadService.upload(this.recorceFile).subscribe(res1 => {
  //       this.toastrService.success("העלאת הקובץ הצליחה");
  //       this.router.navigate(['/search']);
  //     }, err => {
  //       this.toastrService.error("העלאת הקובץ נכשלה");
  //       this.fileService.deleteFile(this.recorceFile.resourceName).subscribe(res => { })
  //     })
  //   }, er => {
  //     this.toastrService.error("העלאת הקובץ נכשלה");
  //   });

  // }

  uploadFile11() {
    this.uploadService.uploadFileResource(this.file, this.recorceFile).subscribe(res => {
      this.toastrService.success("העלאת הקובץ הצליחה");
      this.router.navigate(['/search']);
    }, err => {
      this.toastrService.error("העלאת הקובץ נכשלה");
    })
  }
}


