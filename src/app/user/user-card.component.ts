import { Component, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../service/token.storage';
import { UserService } from '../service/user.service';
import { User } from './user';
import { ProfileDialogComponent } from './profile-dialog.component';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
    templateUrl: './user-card.component.html'
})
export class UserCardComponent {
    
    users: User[] = [];
    page = 1;
    pageSize = 1;
    username: String;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    displayedColumns1 = ['firstName', 'lastName', 'dob', 'username', 'email', 'country', 'usertype'];
    displayedColumns2 = ['matches', 'runs', 'battingAvg', 'highScore', 'wickets', 'bowlingAvg', 'bestBowl', 'catches'];
    dataSource: MatTableDataSource<User> ;

    constructor(private router: Router, private route: ActivatedRoute, private token: TokenStorage, 
        private userService: UserService, private dialog: MatDialog) {
            this.dataSource = new MatTableDataSource();
            route.params.subscribe(params => {
                this.username = params['username'];
                if (this.username == 'all') {
                    this.userService.getUsers().subscribe(data => {
                        this.users = data;
                        this.dataSource.data = this.users;
                    });
                }
                else {
                    this.userService.getUserByUsername(this.username).
                    subscribe(data => {
                        this.users.push(data);
                        this.dataSource.data = this.users;
                    });
                }
              });
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
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;
        dialogConfig.minWidth = 1000;
        dialogConfig.height = '350px';
        //dialogConfig.minHeight = 350;
        //dialogConfig.maxHeight = 1000;
        dialogConfig.data = {username : username};
        this.dialog.open(ProfileDialogComponent, dialogConfig);
    }

}