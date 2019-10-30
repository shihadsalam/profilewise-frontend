import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './add-profile-records.html'
})
export class AddProfileRecordComponent {

  username: string;
  json: string = "";

  constructor(private router: Router, private route: ActivatedRoute, 
    private userService: UserService, private snackBar: MatSnackBar) {
    route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  ngOnInit() {

  }

  addRecords(): void {
    this.userService.addProfileRecords(this.json, this.username)
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
  };

  navidateToCard() {
    this.router.navigate(['userCard', {username: this.username}]);
  }
  
}