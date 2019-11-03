import { Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig, MatSnackBar} from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../service/token.storage';
import { UserService } from '../service/user.service';
import { User } from './user';
import { ViewProfileRecordsComponent } from './view-profile-records';
import { EmptyProfileDialogComponent } from './empty-profile-dialog';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
    templateUrl: './user-card.html'
})
export class UserCardComponent {
    
    users: User[] = [];
    usersDropdown: User[] = [];
    user: User;
    page = 1;
    pageSize = 1;
    msg: string;
    username: String;
    showUserDropdown: boolean = false;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    displayedColumns1 = ['firstName', 'lastName', 'gender', 'dob', 'username', 'userRole', 'usertype'];
    displayedColumns2 = ['emailCard', 'phoneNumber', 'address'];
    dataSource: MatTableDataSource<User>;

    constructor(private router: Router, private route: ActivatedRoute, private token: TokenStorage, 
        private snackBar: MatSnackBar, private userService: UserService, private dialog: MatDialog) {
            this.dataSource = new MatTableDataSource();
            //this.route.queryParams.subscribe(params => {
            this.route.params.subscribe(params => {
                this.username = params.username;
                this.msg = params.msg;
                if (this.username) {
                    this.userService.getUserByUsername(this.username).
                    subscribe(data => {
                        this.user = data;
                        this.users = [];
                        this.users.push(data);
                        this.dataSource.data = this.users;
                        this.usersDropdown = this.users;
                    });
                }
                else {
                    this.userService.getAuthorizedUsers().subscribe(data => {
                        this.users = data;
                        this.dataSource.data = this.users;
                        this.usersDropdown = this.users;
                        this.showUserDropdown = true;
                    });
                }

                if (this.msg) {
                    this.openSnackBar(this.msg, "Success! ");
                }
              });
    }

    userSelected(user) {
        this.users = [];
        this.users.push(user);
        this.dataSource.data = this.users;
    }

    displayProfile(user) {
        document.getElementById(user.username+'1').style.display = "block";
        document.getElementById(user.username+'2').style.display = "block";
    }

    hideProfile(user) {
        document.getElementById(user.username+'1').style.display = "none";
        document.getElementById(user.username+'2').style.display = "none";
    }

    openProfileDialog(username) {
        this.userService.getProfileRecords(username).subscribe(data => {           
            if(data) {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = false;
                dialogConfig.minWidth = 1000;
                dialogConfig.height = '500px';
                //dialogConfig.minHeight = 500;
                //dialogConfig.maxHeight = 1000;
                dialogConfig.data = [{username : username}, {map : data}];
                this.dialog.open(ViewProfileRecordsComponent, dialogConfig);
            }
            else {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.disableClose = true;
                dialogConfig.autoFocus = false;
                dialogConfig.minWidth = 400;
                dialogConfig.height = '250px';
                dialogConfig.data = {username : username};
                this.dialog.open(EmptyProfileDialogComponent, dialogConfig);
            }
          });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: 'top'
        });
      }

}