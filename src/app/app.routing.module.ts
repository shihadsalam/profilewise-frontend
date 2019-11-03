import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { LogoutComponent } from './login/logout'
import { UserComponent } from './user/user-home';
import { UserCardComponent } from './user/user-card';
import { AddUserComponent } from './user/add-user';
import { UploadUserProfileComponent } from './user/upload-user-profile';
import { AddProfileRecordComponent } from './user/add-profile-records';
import { EditUserComponent } from './user/edit-user';
import { AddProfileFieldsComponent } from './user/add-profile-fields';
import { ViewProfileFieldsComponent } from './user/view-profile-fields';
import { BarChartComponent } from './chart/bar-chart';
import { DoughnutChartComponent } from './chart/doughnut-chart';
import { RadarChartComponent } from './chart/radar-chart';
import { PieChartComponent } from './chart/pie-chart';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'users', component: UserComponent },
    { path: 'userCard', component: UserCardComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'uploadProfileRecords/:username', component: UploadUserProfileComponent },
    { path: 'addProfileRecords/:username', component: AddProfileRecordComponent }, 
    { path: 'editUser/:username', component: EditUserComponent },
    { path: 'addProfileFields/:username', component: AddProfileFieldsComponent },
    { path: 'viewProfileFields/:username', component: ViewProfileFieldsComponent },
      //Chart Routes
    {path: 'bar-chart/:username', component: BarChartComponent},
    {path: 'doughnut-chart/:username', component: DoughnutChartComponent},
    {path: 'radar-chart/:username', component: RadarChartComponent},
    {path: 'pie-chart/:username', component: PieChartComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {}