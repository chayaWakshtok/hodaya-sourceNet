import { Component, OnInit } from '@angular/core';
import { FilesService } from '../files.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  SingelFile: any;
  extType: any;
  categories: any;
  permission: any;

  constructor(public fileService: FilesService,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer, public router: Router,public toaster:ToastrService) { }


  ngOnInit() {

    this.SingelFile = this.fileService.resourceDetails;
    this.extType = this.SingelFile.type;
    this.fileService.getAllCategories().subscribe(res => {
      this.categories = res;
    });
    this.fileService.getPermisionsFile().subscribe(res => {
  
      this.permission = res;
    });

  }

  editFile() {
    this.fileService.editRecourse(this.SingelFile.resourceCode, this.SingelFile).subscribe(tes => {
      this.toaster.success("פרטי הקובץ עודכנו בהצלחה")
      this.router.navigate(['/search']);
    },err=>{
      this.toaster.error(" עדכון פרטי הקובץ נכשל")
    })
  }
}
