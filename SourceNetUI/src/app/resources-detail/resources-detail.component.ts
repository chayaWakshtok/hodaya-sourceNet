import { Component, OnInit, ViewChild } from '@angular/core';
import { Resource } from '../shared/resource';
import { FilesService } from '../files.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SimplePdfViewerComponent } from 'simple-pdf-viewer';
import swal from 'sweetalert2';

@Component({
  selector: 'app-resources-detail',
  templateUrl: './resources-detail.component.html',
  styleUrls: ['./resources-detail.component.css']
})
export class ResourcesDetailComponent implements OnInit {

  @ViewChild(SimplePdfViewerComponent) private pdfViewer: SimplePdfViewerComponent;

  viewSingelFile: boolean = false;
  SelectedFile: File;
  resource: Resource[] = [];
  resourceFillter: Resource[] = [];

  readPremission: boolean = false;
  writePremission: boolean = false;
  viewPremission: boolean = false;
  donloadPremission: boolean = false;

  SingelFile: Resource;
  iframeSrc: any = "";
  extType: any = "application/pdf";

  public filesExtensions = {

    '.pdf': 'application/pdf',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.png': 'image/png',
    '.xml': 'application/xml',
    '.doc': 'application/msword',
    '.csv': 'text/csv',
    '.txt': 'text/plain'
  }
  url: string = null;
  blob: Blob;
  donloadSrc: any;
  deletePer: boolean;
  editPer: boolean;

  constructor(public fileSevice: FilesService,
    private router: Router,
    public sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.SingelFile = this.fileSevice.resourceDetails;
    console.log(this.SingelFile.Permissions)
    this.extType = this.SingelFile.type;
    this.fileSevice.getContentFile(this.SingelFile.resourceCode).subscribe(con => {
      debugger;
      this.blob = this.dataURItoBlob(con);
      this.url = window.URL.createObjectURL(this.blob);

      const target = window.URL.createObjectURL(this.dataURItoBlobTarget(con));
      this.donloadSrc = this.sanitizer.bypassSecurityTrustResourceUrl(target);
      //this.pdfViewer.openDocument(url);
    })
    var per = this.fileSevice.user.Role.Permissions.map(p => p.permissionsCode);
    if (per.filter(p => p == 2014))
      this.deletePer = true;
    if (per.filter(p => p == 2015))
      this.editPer = true;
    this.SingelFile.Permissions.forEach(element => {
      if (element.permissionsCode == 4)
        this.writePremission = true;
      if (element.permissionsCode == 3)
        this.viewPremission = true;
      if (element.permissionsCode == 5)
        this.donloadPremission = true;
    });
  }

  editFile()
  {
   this.fileSevice.resourceDetails= this.SingelFile ;
  this.router.navigate(['/edit-resource']);

  }

  deleteFile()
  {
    swal.fire({
      title: 'האם אתה בטוח?',
      text: "אין אפשרות לחזור אחורה אחרי במחיקה!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'ביטול',
      confirmButtonText: 'מחק!'
    }).then((result) => {
      if (result.value) {
        this.fileSevice.deleteRecourse(this.SingelFile.resourceCode).subscribe(tes=>{
          swal.fire(
            'נמחק!',
            'הקובץ נמחק בהצלחה.',
            'success'
          )
        });      
      }
    })
  

  }

  dataURItoBlob(dataURI) {
    debugger;
    var binary = atob(dataURI["ContentBase64"]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: this.filesExtensions[dataURI["TypeFile"]]
    });
  }

  dataURItoBlobTarget(dataURI) {
    var binary = atob(dataURI["TargetContent"]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: this.filesExtensions[this.SingelFile.type]
    });
  }

  openResource() {
    this.fileSevice.openResource(this.SingelFile.resourceCode).subscribe(res => { })
  }

  onLoadComplete() {

  }

  donloadFile() {

  }

}
