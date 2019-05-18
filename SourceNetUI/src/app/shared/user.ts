import { Role } from './role';

export class User {
    userCode:number;
    userName:string;
    password:string;
    email:string;
    roleCode:number;
    year:Date=new Date();
    Role:Role;
}

