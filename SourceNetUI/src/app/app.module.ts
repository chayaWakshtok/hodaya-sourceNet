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
      HeaderComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgSelectModule,
      FormsModule,
      FileUploadModule,
      TreeviewModule.forRoot(),
      NgbModule.forRoot(),
      NgbModalModule,
      NgxSmartModalModule.forRoot()
   ],
   entryComponents: [
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
