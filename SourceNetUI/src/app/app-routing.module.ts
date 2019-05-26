import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ResourcesDetailComponent } from './resources-detail/resources-detail.component';
import { RoleComponent } from './role/role.component';
import { LogInComponent } from './log-in/log-in.component';
import { UserComponent } from './user/user.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { CanActivateViaAuthGuard } from './CanActivateViaAuthGuard ';



const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: 'search', component: SearchComponent },
  { path: 'resources-detail', component: ResourcesDetailComponent,canActivate:[CanActivateViaAuthGuard ]},
  { path: 'upload', component: UploadComponent ,canActivate:[CanActivateViaAuthGuard ]},
  { path: 'addUser', component: AddUserComponent,canActivate:[CanActivateViaAuthGuard ] },
  { path: 'roles', component: RoleComponent,canActivate:[CanActivateViaAuthGuard ] },
  { path: 'login', component: LogInComponent },
  { path: 'users', component: UserComponent ,canActivate:[CanActivateViaAuthGuard ]},
  { path: 'edit-resource', component: EditResourceComponent ,canActivate:[CanActivateViaAuthGuard ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
