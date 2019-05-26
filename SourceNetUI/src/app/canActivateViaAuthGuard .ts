import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FilesService } from './files.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private fileService: FilesService, public router: Router) { }

  canActivate() {
    if (this.fileService.user)
      return true;
    else {
      this.router.navigate(['/login'])
      return false;
    }

  }
}