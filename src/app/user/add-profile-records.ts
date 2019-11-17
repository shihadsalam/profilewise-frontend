import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileRecord } from './profile-record';
import * as fileSaver from 'file-saver';

@Component({
  templateUrl: './add-profile-records.html'
})
export class AddProfileRecordComponent {

  username: string;
  json: string = "";
  fieldType: string = "";
  profileFieldTypes: String[] = [];
  fieldsNotAvailable:boolean = false;
  showDownloadLink:boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, 
    private userService: UserService, private snackBar: MatSnackBar) {
    route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getProfileFieldsAsMap(this.username)
        .subscribe(data => {
            if(data) {
              this.profileFieldTypes = Object.keys(data);
            }
            else {
              this.fieldsNotAvailable = true;
            }
        }); 
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  addRecords(): void {
    if(!this.fieldType) {
      this.openSnackBar("Field Set Type is required", "Error! ");
    }
    else if(!this.json) {
      this.openSnackBar("JSON data is required", "Error! ");
    }
    else {
      this.userService.addProfileRecords(new ProfileRecord(this.username, this.fieldType, this.json))
      .subscribe(data => {
        if (data.errorMsg) {
          this.openSnackBar(data.errorMsg, "Error! ");
        }
        else if (data.msg) {
          this.router.navigate(['users', {msg : data.msg}]);
          //this.router.navigate(['userCard', [{msg : data.msg}, {username: this.username}]]);
          //this.router.navigate(['userCard',  { queryParams: {msg: data.msg, username: this.username}}]);
        }
      });
    }
  };

  clicked(profFieldType) {
    this.fieldType = profFieldType;
    this.showDownloadLink = true;
    this.userService.getProfileFieldsAsJson(this.username, this.fieldType)
    .subscribe(data => {
      this.json = JSON.stringify(data, null, 2);
    });
  }

  downloadFieldSet() {
    this.userService.downloadProfileFieldsAsJson(this.username, this.fieldType)
    .subscribe(response => {
      const filename = this.username+"_" + this.fieldType + ".json";
      this.saveFile(response.body, filename);
    });
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'application/json; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }

  navidateToCard() {
    this.router.navigate(['userCard', {username: this.username}]);
  }
  
}