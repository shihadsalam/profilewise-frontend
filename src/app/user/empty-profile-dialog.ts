import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './empty-profile-dialog.html'
})
export class EmptyProfileDialogComponent{

  username: String = "";

  constructor(private router: Router, private dialogRef: MatDialogRef<EmptyProfileDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data, private userService: UserService) {
      this.username = data.username;
  }

  close() {
      this.dialogRef.close();
  }

  navigateToAddRecord(username) {
    this.close();
    this.router.navigate(['addProfileRecords', username]);
  }
  
}