import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = "http://localhost:13264/"
@Injectable({
  providedIn: 'root'
})
export class UploadService {

constructor(public httpClient:HttpClient) { }

uploadFileResource(file,res): any {
  let formData: FormData = new FormData();
  formData.append('uploadFile', file, file.relativePath);
  formData.append('res',JSON.stringify( res));
  let headers = new Headers() 
  let apiUrl1 = url + "api/UploadFile";
  return this.httpClient.post(apiUrl1, formData)
}
replace(file,res): any {
  let formData: FormData = new FormData();
  formData.append('uploadFile', file, file.relativePath);
  formData.append('res',JSON.stringify( res));
  let headers = new Headers() 
  let apiUrl1 = url + "api/ReplaceFile";
  return this.httpClient.post(apiUrl1, formData)
}
same(file,res): any {
  let formData: FormData = new FormData();
  formData.append('uploadFile', file, file.relativePath);
  formData.append('res',JSON.stringify( res));
  let headers = new Headers() 
  let apiUrl1 = url + "api/AcceptSameFile";
  return this.httpClient.post(apiUrl1, formData)
}
}
