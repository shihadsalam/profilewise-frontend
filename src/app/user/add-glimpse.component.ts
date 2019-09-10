import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './add-glimpse.component.html'
})
export class AddGlimpseComponent {

  username: String;
  msg: string = "";
  glimpseFields: string[] = [];
  glimpseValues: string[] = [];
  //mapRecord: any;
  public addGlimpseForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, 
    private userService: UserService, private snackBar: MatSnackBar) {
      route.params.subscribe(params => {
        this.username = params['username'];
      });
      route.queryParams.subscribe(queryParams => {
        //this.mapRecord = queryParams;
        for (var key in queryParams) {
          this.glimpseFields.push(key);
          this.glimpseValues.push(queryParams[key]);
          //this.glimpseFields.sort();
        }
        this.addGlimpseForm = new FormGroup({username: new FormControl('', [])});
        for (let glimpseField of this.glimpseFields) {
          this.addGlimpseForm.addControl(glimpseField, new FormControl('', Validators.required));
        }
      });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addGlimpseForm.controls[controlName].hasError(errorName);
  } 

  addGlimpse(): void {
   var result = {'id' : this.username};
   let i = 0;
   for (let field of this.glimpseFields) {
     result[field] = this.glimpseValues[i];
     i++;
  }
    this.userService.addGlimpseRecord(result).subscribe(
      data => {
        if (data.errorMsg) {
          this.openSnackBar(data.errorMsg, "Error! ");
        }
        else if (data.msg) {
          this.openSnackBar(data.msg, "Success! ");
          this.router.navigate(['userCard', {username: this.username}]);
        }
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

}
