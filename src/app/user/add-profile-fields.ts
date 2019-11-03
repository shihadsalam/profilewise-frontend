import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import { ProfileFields } from './profile-fields';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './add-profile-fields.html'
})
export class AddProfileFieldsComponent implements OnInit{

  fieldLen: number = 10;
  username: String = "";
  type: string = "";
  disableTypeField: boolean = false;
  mapFields: Map<String, String[]>;
  profileFieldValues: string[] = [];
  profileFieldList: string[] = [""];
  existingProfileFieldTypes: String[] = [];
  profileFields: ProfileFields;
  public addProfileFieldsForm: FormGroup;

  constructor(private userService: UserService, private router: Router, 
    private route: ActivatedRoute, private snackBar: MatSnackBar) { 
    route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getProfileFieldsAsMap('ALL')
      .subscribe(data => {
          this.mapFields = data;
          this.existingProfileFieldTypes = Object.keys(this.mapFields);
      }); 
    });
  }   

  ngOnInit() {
    this.addProfileFieldsForm = new FormGroup({username: new FormControl('', [])});
    this.addProfileFieldsForm.addControl("type", new FormControl('', Validators.required));
    this.addProfileFieldsForm.addControl("reuseType", new FormControl(''));
    
    for (let index = 0; index < this.fieldLen; index++) {
      this.addProfileFieldsForm.addControl(index.toString(), new FormControl('', Validators.required));
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addProfileFieldsForm.controls[controlName].hasError(errorName);
  } 
  
  addRow() {    
    if(this.profileFieldList.length == this.fieldLen) {  
      return false;  
    }  else {
      this.profileFieldList.push("");
      return true;  
    }
  }  
    
  deleteRow(index) {  
      if(this.profileFieldList.length == 1) {  
          return false;  
      } else {  
        this.profileFieldList.splice(index, 1);  
          return true;  
      }  
  } 

  submit() {
    let val = this.addProfileFieldsForm.value;
    this.profileFields = new ProfileFields();
    this.profileFields.username = this.username;
    if (!val.type && !val.reuseType) {
      this.openSnackBar("Field Set Type is required", "Error! ");
    }
    let type = val.reuseType ? val.reuseType : val.type;
    if(type) {
      this.profileFields.type = type;
      this.profileFields.field1 =   val[0] ? val[0] : (this.profileFieldList[0] ? this.profileFieldList[0] : ""),
      this.profileFields.field2 =   val[1] ? val[1] : (this.profileFieldList[1] ? this.profileFieldList[1] : ""),
      this.profileFields.field3 =   val[2] ? val[2] : (this.profileFieldList[2] ? this.profileFieldList[2] : ""),
      this.profileFields.field4 =   val[3] ? val[3] : (this.profileFieldList[3] ? this.profileFieldList[3] : ""),
      this.profileFields.field5 =   val[4] ? val[4] : (this.profileFieldList[4] ? this.profileFieldList[4] : ""),
      this.profileFields.field6 =   val[5] ? val[5] : (this.profileFieldList[5] ? this.profileFieldList[5] : ""),
      this.profileFields.field7 =   val[6] ? val[6] : (this.profileFieldList[6] ? this.profileFieldList[6] : ""),
      this.profileFields.field8 =   val[7] ? val[7] : (this.profileFieldList[7] ? this.profileFieldList[7] : ""),
      this.profileFields.field7 =   val[8] ? val[8] : (this.profileFieldList[8] ? this.profileFieldList[8] : ""),
      this.profileFields.field8 =   val[9] ? val[9] : (this.profileFieldList[9] ? this.profileFieldList[9] : "")
  
     this.userService.addProfileFields(this.profileFields).subscribe(data => {
      if (data.errorMsg) {
        this.openSnackBar(data.errorMsg, "Error! ");
      }
      else if (data.msg) {
        this.openSnackBar(data.msg, "Success! ");
      }
     });
    }
    else {
      
    }
    
  }

  reuseTypeClicked(reuseType) {
    this.type = reuseType;
    this.disableTypeField = true;
    this.profileFieldValues = this.mapFields[reuseType];
    this.profileFieldList = [];
    this.profileFieldValues.forEach(val => {
      this.profileFieldList.push(val);
    });
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
  
}