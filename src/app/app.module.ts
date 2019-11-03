import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, 
  MatInputModule, MatMenuModule, MatCardModule, MatTableModule, MatDialogModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatSortModule,
  MatSelectModule, MatCheckboxModule } from "@angular/material";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { UserComponent } from './user/user-home';
import { AddProfileFieldsComponent } from './user/add-profile-fields';
import { ViewProfileFieldsComponent } from './user/view-profile-fields';
import { UploadUserProfileComponent } from './user/upload-user-profile';
import { AddProfileRecordComponent } from './user/add-profile-records';
import { UserCardComponent } from './user/user-card';
import { EmptyProfileDialogComponent } from './user/empty-profile-dialog';
import { ViewProfileRecordsComponent } from './user/view-profile-records';
import { UserService } from './service/user.service';
import { LoginComponent } from './login/login';
import { LogoutComponent } from './login/logout';
import { AddUserComponent } from './user/add-user';
import { EditUserComponent } from './user/edit-user';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthService } from "./service/auth.service";
import { Interceptor } from "./service/interceptor";
import { TokenStorage } from "./service/token.storage";
import { FileSelectDirective } from "ng2-file-upload";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './user/delete-dialog';
import { DoughnutChartComponent } from './chart/doughnut-chart';
import { RadarChartComponent } from './chart/radar-chart';
import { PieChartComponent } from './chart/pie-chart';
import { BarChartComponent } from './chart/bar-chart';

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
    AddProfileFieldsComponent,
    ViewProfileFieldsComponent,
    ViewProfileRecordsComponent,
    EmptyProfileDialogComponent,
    DeleteDialogComponent,
    UploadUserProfileComponent,
    AddProfileRecordComponent,
    EditUserComponent,
    FileSelectDirective,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ChartsModule,
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
  entryComponents: [ViewProfileRecordsComponent, EmptyProfileDialogComponent, DeleteDialogComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);