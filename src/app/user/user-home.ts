import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { TokenStorage } from '../service/token.storage';
import { Router, ActivatedRoute } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from "@angular/material";

import { User } from './user';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { DeleteDialogComponent } from './delete-dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user-home.html',
  styles: []
})
export class UserComponent {
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  sort;
  @ViewChild(MatSort, {static: false}) set content(content: ElementRef) {
    this.sort = content;
    if (this.sort){
       this.dataSource.sort = this.sort;
    }
  }
   displayedColumns = ['imageIcon', 'firstName', 'lastName', 'gender', 'username', 'dob', 'email', 'role', 'usertype', 'action', 'status'];
  //displayedColumns = ['imageIcon', 'name', 'gender', 'username', 'dob', 'email', 'role', 'usertype', 'action'];
  dataSource: MatTableDataSource<User>;
  uploader: FileUploader;
  iconsLoaded:boolean = false;
  page = 1;
  pageSize = 4;
  users: User[];
  msg: string;
  action: string;
  deletedUser: User;
  errorMsg: string;
  currentUser: string = "";
  isCurrentUserSupervisor: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private userService: UserService, private token: TokenStorage, private snackBar: MatSnackBar,
    private domSanitizer: DomSanitizer, private matIconRegistry: MatIconRegistry, 
    private http: HttpClient, private dialog: MatDialog) {
      this.currentUser = token.getCurrentUser();
      route.params.subscribe(params => {
      this.msg = params['msg'];
      this.errorMsg = params['errorMsg'];
      this.action = params['action'];
      if(this.action == 'deleted') {
        this.userDeleted();
      }
      if(this.msg) {
        this.openSnackBar(this.msg, "Success! ");
      } 
      else if (this.errorMsg) {
        this.openSnackBar(this.errorMsg, "Error! ");
      }
    });

    //this.userService.getUsers()
    this.userService.getAuthorizedUsers()
      .subscribe(data => {
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isSupervisor();
        //this.addUserIcons();
    });

    //const headers = [{name: 'Accept', value: 'application/json'}];
    //this.uploader = new FileUploader({url: 'api/files', autoUpload: true, headers: headers});
    //this.uploader.onCompleteAll = () => alert('File uploaded');
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

  navidateToCard(username) {
    this.router.navigate(['userCard', {username: username}]);
  }

  deleteUser(user: User): void {
    this.deletedUser = user;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = 350;
    dialogConfig.height = '170px';
    dialogConfig.data = {username : user.username};
    this.dialog.open(DeleteDialogComponent, dialogConfig);
  }

  userDeleted(): void {
    this.users = this.users.filter(u => u !== this.deletedUser);
    this.dataSource.data = this.users;
  }

  assignAsReportee(user: User): void {
    this.userService.assignAsReportee(user).subscribe(
      data => {
        if (data.errorMsg) {
          this.openSnackBar(data.errorMsg, "Error! ");
        }
        else if (data.msg) {
          this.userService.getUsers().subscribe(userList => {
            this.users = userList;
            this.dataSource.data = this.users;
            this.openSnackBar(data.msg, "Success! ");
          });
        }
      }
    );
  }

  removeReportee(user: User): void {
    this.userService.removeReportee(user).subscribe(
      data => {
        if (data.errorMsg) {
          this.openSnackBar(data.errorMsg, "Error! ");
        }
        else if (data.msg) {
            this.userService.getUsers().subscribe(userList => {
            this.users = userList;
            this.dataSource.data = this.users;
            this.openSnackBar(data.msg, "Success! ");
          });
        }
      }
    );
  }

  isSupervisor(): void {
    this.users.forEach(user => {
      if (this.currentUser == user.username && user.isSupervisor) {
        this.isCurrentUserSupervisor = true;
      }
    });
  }

// TODO
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
}

