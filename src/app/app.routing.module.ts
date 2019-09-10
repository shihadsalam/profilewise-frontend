import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { UserComponent } from './user/user.component';
import { UserCardComponent } from './user/user-card.component';
import { AddUserComponent } from './user/add-user.component';
import { AddUserCareerComponent } from './user/add-user-career.component';
import { UploadUserCareerComponent } from './user/upload-user-career.component';
import { ImportCareerComponent } from './user/import-career.component';
import { EditUserComponent } from './user/edit-user.component';
import { MultiEditUserComponent } from './user/multi-edit-user.component';
import { DefineGlimpseComponent } from './user/define-glimpse.component';
import { AddGlimpseComponent } from './user/add-glimpse.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'users', component: UserComponent },
    { path: 'userCard', component: UserCardComponent },
    { path: 'addUser', component: AddUserComponent },
    { path: 'addUserCareer/:username', component: AddUserCareerComponent },
    { path: 'uploadUserCareer/:username', component: UploadUserCareerComponent },
    { path: 'importUserCareer/:username', component: ImportCareerComponent }, 
    { path: 'editUser/:username', component: EditUserComponent },
    { path: 'multiEditUser/:username', component: MultiEditUserComponent },
    { path: 'defineGlimpse/:username', component: DefineGlimpseComponent },
    { path: 'addGlimpse/:username', component: AddGlimpseComponent }
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