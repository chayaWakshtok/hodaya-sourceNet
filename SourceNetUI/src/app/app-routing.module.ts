import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UploadComponent } from './upload/upload.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ResourcesDetailComponent } from './resources-detail/resources-detail.component';



const routes: Routes = [
  { path: "", redirectTo: "search", pathMatch: "full" },
  { path: 'search', component: SearchComponent },
  { path: 'resources-detail', component: ResourcesDetailComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'addUser', component: AddUserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
