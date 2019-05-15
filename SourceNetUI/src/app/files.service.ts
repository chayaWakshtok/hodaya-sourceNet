import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TreeviewItem } from 'ngx-treeview';
import { Resource } from './shared/resource';
import { Role } from './shared/role';
import { User } from './shared/user';


const url = "http://localhost:13264/"
@Injectable({
    providedIn: 'root'
})
export class FilesService {

    user:User=null;
    url_file: any;
    resourceDetails: any;
    loginSubject=new Subject();

    constructor(public httpClient: HttpClient) { }

    getAllResource(): Observable<Resource[]> {
        let apiUrl1 = url + "api/Resources";
        return this.httpClient.get<Resource[]>(apiUrl1);
    }

    upload(record): any {
        let apiUrl1 = url + "api/Resources";
        return this.httpClient.post(apiUrl1, record)
    }

    uploadFile(file: File): any {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        //headers.append('Accept', 'application/json'); 
        let apiUrl1 = url + "api/UploadJsonFile";
        return this.httpClient.post(apiUrl1, formData)

    }

    getAllCategories(): Observable<any> {
        return this.httpClient.get(url + "api/Categories");
    }

    getContentFile(id) {
        return this.httpClient.get(url + 'api/getDataFile/' + id);
    }

    openResource(resourceCode: number) {
        return this.httpClient.get(url + 'api/openResource/' + resourceCode);
    }

    getRoles() {
        return this.httpClient.get(url + 'api/Roles');
    }

    getPremmisions() {
        return this.httpClient.get(url + 'api/Roles');
    }

    login() {

    }

    updateRole(role: Role) {
        return this.httpClient.put(url + 'api/Roles/' + role.roleCode, role);
    }

    addUser(user) {
        return this.httpClient.post(url + 'api/Users', user);
    }

}
