import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './component/search/search.component';


const routes: Routes = [
   {path: '', component: SearchComponent},
  // {path: 'search', component: SearchComponent},
  // {path: 'upload', component: UploadComponent},
  // {path: 'addUser', component: AddUserComponent},
];

@NgModule({
 // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
