import { Component, OnInit, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './profile-dialog.component.html'
})
export class ProfileDialogComponent{

  username: String = "";
  mapArray: Map<String, Object>[];
  isDataAvailable: boolean = false;

  constructor(private router: Router, private dialogRef: MatDialogRef<ProfileDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data, private userService: UserService) {
      this.username = data.username;
      this.userService.getImportedUserCareer(this.username).subscribe(data => {
        this.mapArray = data;
        this.isDataAvailable = data ? true : false;
      });
  }

  close() {
      this.dialogRef.close();
  }

  navigateToImport(username) {
    this.close();
    this.router.navigate(['importUserCareer', username]);
  }
  
}