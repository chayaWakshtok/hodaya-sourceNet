import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { TreeviewItem, TreeviewConfig } from 'ngx-treeview';
import { FileUploader } from 'ng2-file-upload';
import { Resource } from '../shared/resource';

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
  recorceFile:Resource=new Resource()
  public uploader: FileUploader = new FileUploader({ url: URL });
  constructor(public fileService: FilesService) { }

  ngOnInit() {

    this.fileService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
  }

  handleFileInput(files: any) {
    debugger;
    for (var i = 0; i < files.length; i++) {
      let formData: FormData = new FormData();
      var file=files[i];
      // this.fileService.uploadFile(file).subscribe(res=>{
        
      // });
     // this.recorceFile.filePath="";
      this.recorceFile.resourceName=files[i].name;
      this.recorceFile.type=files[i].type;
      this.recorceFile.sizeB=files[i].size;
      this.recorceFile.date=files[i].lastModifiedDate;
    }
  }




  options = [
    { name: "צפיה", value: 1 },
    { name: "הורדה", value: 2 },
    { name: "עריכה", value: 2 }
  ]

  selectPermission(value: string) {
  }

  uploadFile()
  {
    debugger;
    
    this.fileService.upload(this.recorceFile).subscribe(res=>{

    })
  }

}
