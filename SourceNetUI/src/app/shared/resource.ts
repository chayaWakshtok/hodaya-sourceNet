import { Permission } from './permission';
import { Category } from './category';

export class Resource {
    resourceCode: number;
    resourceName: string;
    filePath: string;
    version: string;
    authorName: string;
    date: Date;
    sizeB: number;
    numPage: number
    type: string;
    Categories: Category[] = [];
    Permissions: Permission[] = [];
}
