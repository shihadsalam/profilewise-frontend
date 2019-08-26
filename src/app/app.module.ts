import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, 
  MatInputModule, MatMenuModule, MatCardModule, MatTableModule, MatDialogModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSortModule,
  MatSelectModule, MatCheckboxModule } from "@angular/material";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { UserComponent } from './user/user.component';
import { AddUserCareerComponent } from './user/add-user-career.component';
import { UploadUserCareerComponent } from './user/upload-user-career.component';
import { ImportCareerComponent } from './user/import-career.component';
import { UserCardComponent } from './user/user-card.component';
import { ProfileDialogComponent } from './user/profile-dialog.component';
import { UserService } from './service/user.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { MultiEditUserComponent } from './user/multi-edit-user.component';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./service/auth.service";
import { Interceptor } from "./service/interceptor";
import { TokenStorage } from "./service/token.storage";
import { FileSelectDirective } from "ng2-file-upload";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD - MMM - YYYY',
  },
  display: {
    dateInput: 'DD - MMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD - MMM - YYYY',
    monthYearA11yLabel: 'MMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserCardComponent,
    LoginComponent,
    LogoutComponent,
    AddUserComponent,
    AddUserCareerComponent,
    ProfileDialogComponent,
    UploadUserCareerComponent,
    ImportCareerComponent,
    EditUserComponent,
    MultiEditUserComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatToolbarModule, 
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatButtonModule, 
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatSnackBarModule,
    MatSelectModule,
    MomentDateModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [UserService, AuthService, TokenStorage, TokenStorage,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true},
    { provide: DateAdapter, useClass: MomentDateAdapter},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProfileDialogComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);