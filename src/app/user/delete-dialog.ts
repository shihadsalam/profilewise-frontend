import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './delete-dialog.html'
})
export class DeleteDialogComponent{

  username: String = "";

  constructor(private router: Router, private dialogRef: MatDialogRef<DeleteDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) data, private userService: UserService) {
      this.username = data.username;
  }

  confirm() {
    this.userService.deleteUser(this.username)
    .subscribe(data => {
      this.close();
      this.router.navigate(['users', {deletedUser: this.username}]);
    });
  }

  close() {
    this.dialogRef.close();
    //this.router.navigate(['users']);
  }
  
}