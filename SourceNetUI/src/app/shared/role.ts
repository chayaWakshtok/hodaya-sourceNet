import { Permission } from './permission';

export class Role {
    roleCode:number;
    roleType:string;
    Permissions:Permission[]=[];
}
