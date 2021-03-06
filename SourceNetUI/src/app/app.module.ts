import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchByNameComponent } from './search/SearchBy/search-by-name/search-by-name.component';
import { SearchByTagComponent } from './search/SearchBy/search-by-tag/search-by-tag.component';
import { SearchByDateComponent } from './search/SearchBy/search-by-date/search-by-date.component';
import { SearchByTypeComponent } from './search/SearchBy/search-by-type/search-by-type.component';
import { UploadComponent } from './upload/upload.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LogInComponent } from './log-in/log-in.component';
import { TreeviewModule } from 'ngx-treeview';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HeaderComponent } from './header/header.component';
import { ResourcesDetailComponent } from './resources-detail/resources-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleComponent } from './role/role.component';
import { FilesService } from './files.service';
import { SimplePdfViewerModule } from 'simple-pdf-viewer';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { CanActivateViaAuthGuard } from './CanActivateViaAuthGuard ';
import { UploadService } from './upload.service';
import { ModalSameFileComponent } from './modal-same-file/modal-same-file.component';
import { FileDropModule } from 'ngx-file-drop';
import { EditResourceModalComponent } from './edit-resource-modal/edit-resource-modal.component';
import { ModalUpdateAllComponent } from './modal-update-all/modal-update-all.component';
import { ModalNewCategoryComponent } from './modal-new-category/modal-new-category.component';
import { ModalAddRoleComponent } from './modal-add-role/modal-add-role.component';
import { ModalEditRoleComponent } from './modal-edit-role/modal-edit-role.component';

@NgModule({
   declarations: [
      AppComponent,
      SearchComponent,
      SearchByNameComponent,
      SearchByTagComponent,
      SearchByDateComponent,
      SearchByTypeComponent,
      UploadComponent,
      AddUserComponent,
      LogInComponent,
      HeaderComponent,
      ResourcesDetailComponent,
      RoleComponent,
      UserComponent,
      EditUserComponent,
      EditResourceComponent,
      ModalSameFileComponent,
      EditResourceModalComponent,
      ModalUpdateAllComponent,
      ModalNewCategoryComponent,
      ModalAddRoleComponent,
      ModalEditRoleComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgSelectModule,
      FormsModule,
      FileUploadModule,
      FileDropModule,
      TreeviewModule.forRoot(),
      NgbModule.forRoot(),
      NgbModalModule,
      NgxSmartModalModule.forRoot(),
      NgxSpinnerModule,
      ToastrModule.forRoot(),
      BrowserAnimationsModule,
      SimplePdfViewerModule,
      NgHttpLoaderModule.forRoot()
   ],
   entryComponents: [
      ModalNewCategoryComponent,
      AddUserComponent,
      EditUserComponent,
      ModalSameFileComponent,
      EditResourceModalComponent,
      ModalUpdateAllComponent,
      ModalEditRoleComponent,
      ModalAddRoleComponent
   ],
   providers: [
      FilesService,
      CanActivateViaAuthGuard,
      UploadService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
