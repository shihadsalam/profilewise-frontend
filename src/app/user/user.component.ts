import { Component, ViewChild } from '@angular/core';
import { TokenStorage } from '../service/token.storage';
import { Router, ActivatedRoute } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';

import { User } from './user';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent {
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  displayedColumns = ['imageIcon', 'firstName', 'lastName', 'username', 'dob', 'email', 'country', 'usertype', 'action'];
  dataSource: MatTableDataSource<User>;
  uploader: FileUploader;
  iconsLoaded:boolean = false;
  page = 1;
  pageSize = 4;
  users: User[];
  msg: string;
  deleteMsg: string;
  errorMsg: string;

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService, private token: TokenStorage, private snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, private http: HttpClient) {
    route.params.subscribe(params => {
      this.msg = params['msg'];
      this.errorMsg = params['errorMsg'];
      if(this.msg) {
        this.openSnackBar(this.msg, "Success! ");
      } 
      else if (this.errorMsg) {
        this.openSnackBar(this.errorMsg, "Error! ");
      }
    });

    this.userService.getUsers()
    .subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.addUserIcons();
    });

    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: 'api/files', autoUpload: true, headers: headers});
    this.uploader.onCompleteAll = () => alert('File uploaded');
  }

  async addUserIcons(){
    for(let user of this.users){
      const iconPath = await this.getIconPathWithFallback(user.username)
      this.matIconRegistry.addSvgIcon(user.username, 
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
    }
    // let the dom know when all icons have been loaded and block attempt rendering before (e.g. via *ngIf)
    this.iconsLoaded=true
  }

  async getIconPathWithFallback(iconPath){  
    try{
      let response = await this.http.head("../assets/icons/"+iconPath+".svg", {responseType: 'blob'}).toPromise();
      return "../assets/icons/"+iconPath+".svg"; 
    }
      catch (error) {
        return '../assets/icons/default.svg';
      }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  editUser(userToEdit: User) {
    this.router.navigate(['/editUser/', {username: userToEdit.username}]);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
        this.dataSource.data = this.users;
        this.deleteMsg = "User " +user.firstName+ " deleted successfully";
        this.openSnackBar(this.deleteMsg, "Success! ");
      })
  }

}