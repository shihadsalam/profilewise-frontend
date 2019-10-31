import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import * as fileSaver from 'file-saver';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './view-profile-fields.html'
})
export class ViewProfileFieldsComponent implements OnInit{

  username: String = "";
  profileFieldTypes: String[] = [];
  profileFieldValues: String[] = [];
  mapFields: Map<String, String[]>;
  public viewProfileFieldsForm: FormGroup;

  constructor(private userService: UserService, private router: Router, 
    private route: ActivatedRoute, private snackBar: MatSnackBar) { 
    route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getProfileFieldsAsMap(this.username)
        .subscribe(data => {
            this.mapFields = data;
            this.profileFieldTypes = Object.keys(this.mapFields);
        }); 
      });
  }   

  ngOnInit() {
    this.viewProfileFieldsForm = new FormGroup({username: new FormControl('', [])});
    this.viewProfileFieldsForm.addControl("type", new FormControl('', Validators.required));
  }

  download() {
    let val = this.viewProfileFieldsForm.value;
    if(!val.type) {
      this.openSnackBar("Please select Field Set Type", "Error! ");
    }
    else {
      this.userService.downloadProfileFieldsAsJson(this.username, val.type)
      .subscribe(response => {
        const filename = this.username+"_"+val.type+".json";
        this.saveFile(response.body, filename);
      });
    }
  }

  populate(fieldSet) {
    this.profileFieldValues = this.mapFields[fieldSet];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  navidateToCard(username) {
    this.router.navigate(['userCard', {username: username}]);
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], {type: 'application/json; charset=utf-8'});
    fileSaver.saveAs(blob, filename);
  }
  
}