import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import { ProfileGlimpseFields } from '../user/glimpse-fields';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './define-glimpse.component.html'
})
export class DefineGlimpseComponent implements OnInit{

  fieldLen: number = 8;
  username: String = "";
  glimpseFields: string[] = [];
  profGlimpseFields: ProfileGlimpseFields;
  public defineGlimpseForm: FormGroup;

  constructor(private userService: UserService, private router: Router, 
    private route: ActivatedRoute, private snackBar: MatSnackBar) { 
    route.params.subscribe(params => {
      this.username = params['username'];
    });
    this.userService.getGlimpseRecord(this.username).subscribe(
      data => {
        if(data) {
          for (var key in data) {
            if(key) {
              this.glimpseFields.push(key);
            }
          }
        }
        else {
          this.glimpseFields.push(""); 
        }
      });
  }   

  ngOnInit() {
    this.defineGlimpseForm = new FormGroup({username: new FormControl('', [])});
    for (let index = 0; index < this.fieldLen; index++) {
      this.defineGlimpseForm.addControl(index.toString(), new FormControl('', Validators.required));
    }
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.defineGlimpseForm.controls[controlName].hasError(errorName);
  } 
  
  addRow() {    
    if(this.glimpseFields.length == this.fieldLen) {  
      return false;  
    }  else {
      this.glimpseFields.push("");
      return true;  
    }
  }  
    
  deleteRow(index) {  
      if(this.glimpseFields.length == 1) {  
          return false;  
      } else {  
        this.glimpseFields.splice(index, 1);  
          return true;  
      }  
  } 

  submit() {
    let val = this.defineGlimpseForm.value;
    this.profGlimpseFields = new ProfileGlimpseFields();
    this.profGlimpseFields.id = this.username;
    this.profGlimpseFields.field1 =   val[0] ? val[0] : (this.glimpseFields[0] ? this.glimpseFields[0] : ""),
    this.profGlimpseFields.field2 =   val[1] ? val[1] : (this.glimpseFields[1] ? this.glimpseFields[1] : ""),
    this.profGlimpseFields.field3 =   val[2] ? val[2] : (this.glimpseFields[2] ? this.glimpseFields[2] : ""),
    this.profGlimpseFields.field4 =   val[3] ? val[3] : (this.glimpseFields[3] ? this.glimpseFields[3] : ""),
    this.profGlimpseFields.field5 =   val[4] ? val[4] : (this.glimpseFields[4] ? this.glimpseFields[4] : ""),
    this.profGlimpseFields.field6 =   val[5] ? val[5] : (this.glimpseFields[5] ? this.glimpseFields[5] : ""),
    this.profGlimpseFields.field7 =   val[6] ? val[6] : (this.glimpseFields[6] ? this.glimpseFields[6] : ""),
    this.profGlimpseFields.field8 =   val[7] ? val[7] : (this.glimpseFields[7] ? this.glimpseFields[7] : "")

   this.userService.addGlimpseFields(this.profGlimpseFields).subscribe(data => {
    if (data) {
      this.router.navigate(['/addGlimpse/'+this.username], { queryParams: data });
    }
    else {
      this.openSnackBar("Atleast one field should be non-empty", "Error! ");
    }
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