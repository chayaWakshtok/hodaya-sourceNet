import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { TreeviewItem } from 'ngx-treeview';
import { Resource } from './shared/resource';
import { Role } from './shared/role';
import { User } from './shared/user';
import { Category } from './shared/category';


const url = "http://localhost:13264/"
@Injectable({
    providedIn: 'root'
})
export class FilesService {



    user: User = null;
    url_file: any;
    resourceDetails: any;
    loginSubject = new Subject();

    constructor(public httpClient: HttpClient) { }

    getAllResource(): Observable<Resource[]> {
        let apiUrl1 = url + "api/Resources";
        return this.httpClient.get<Resource[]>(apiUrl1);
    }


    editRecourse(recourses, uploadFil) {
        debugger;
        return this.httpClient.put(url + "api/Resources/" + recourses, uploadFil)
    }

    deleteRecourse(id) {
        return this.httpClient.delete(url + "api/Resources/" + id)
    }

    uploadFile(file: File): any {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        //headers.append('Content-Type', 'json');  
        //headers.append('Accept', 'application/json'); 
        let apiUrl1 = url + "api/UploadFile";
        return this.httpClient.post(apiUrl1, formData)

    }

    replaceFile(file: File): any {
        let formData: FormData = new FormData();
        formData.append('uploadFile', file, file.name);
        let headers = new Headers()
        let apiUrl1 = url + "api/ReplaceFile";
        return this.httpClient.post(apiUrl1, formData)

    }

    deleteFile(nameFile) {
        return this.httpClient.get(url + "api/deleteFileFromFolder/" + nameFile)
    }

    getAllCategories(): Observable<any> {
        return this.httpClient.get(url + "api/Categories");
    }

    getPermisionsFile(): Observable<any> {
        return this.httpClient.get(url + "api/permission/getPermissionResource");
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

    login(userName, password) {
        return this.httpClient.get(url + 'api/users/login/' + userName + "/" + password, {});
    }

    updateRole(role: Role) {
        return this.httpClient.put(url + 'api/Roles/' + role.roleCode, role);
    }

    addUser(user) {
        return this.httpClient.post(url + 'api/Users', user);
    }
    updateUser(user: User) {
        return this.httpClient.put(url + 'api/Users/' + user.userCode, user);
    }
    getUsers() {
        return this.httpClient.get(url + "api/Users");
    }

    deleteUser(user: User) {
        return this.httpClient.delete(url + 'api/Users/' + user.userCode);
    }

    addNewCategory(category: Category) {
        return this.httpClient.post(url + 'api/Categories', category);
    }

    getPremmisionsRole() {
        return this.httpClient.get(url + 'api/getPremmisionsRole');
    }

    addRole(role: Role) {
        return this.httpClient.post(url + 'api/Roles', role);
    }
    editRole(role: Role) {
        return this.httpClient.put(url + 'api/Roles/'+role.roleCode, role);
    }

}
