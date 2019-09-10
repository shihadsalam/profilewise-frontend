import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: './import-career.component.html'
})
export class ImportCareerComponent {

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

  importJSON(): void {
    this.userService.importUserCareer(this.json, this.username)
      .subscribe(data => {
        if (data.errorMsg) {
          this.openSnackBar(data.errorMsg, "Error! ");
        }
        else if (data.msg) {
          this.router.navigate(['users', {msg : data.msg}]);
        }
      });
  };

  navidateToCard(username) {
    this.router.navigate(['userCard', {username: username}]);
  }
  
}