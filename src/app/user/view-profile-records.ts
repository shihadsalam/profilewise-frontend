import { Component, Inject } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './view-profile-records.html'
})
export class ViewProfileRecordsComponent{

  username: String = "";
  map: Map<String, Map<String, Object>>;
  titles: String[];
  //mapArray: Map<String, Object>[];

  constructor(private router: Router, private dialogRef: MatDialogRef<ViewProfileRecordsComponent>, 
    @Inject(MAT_DIALOG_DATA) data, private userService: UserService) {
      this.username = data[0].username;
      this.map = data[1].map;
      this.titles = Object.keys(this.map);
  }

  close() {
      this.dialogRef.close();
  }
  
}