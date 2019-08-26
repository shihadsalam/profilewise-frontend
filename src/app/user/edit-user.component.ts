import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent {

  user: User;
  userNames: String[];
  msg: String = "";
  countries: string[] = ["India", "England", "Australia", "South Africa", "New Zealand"];
  public editUserForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    route.params.subscribe(params => {
      this.userService.getUserByUsername(params['username']).
        subscribe(data => {
          this.user = data;
        });
      });
  }

  ngOnInit() {
    this.userService.getUserNames()
    .subscribe(usernames => {
      this.userNames = usernames;
    });

    this.editUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      username: new FormControl({ value: '', disabled: true }),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', [])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.editUserForm.controls[controlName].hasError(errorName);
  }

  editUser(): void {
    this.userService.editUser(this.user)
      .subscribe(data => {
        this.msg = "User " +this.user.firstName+ " edited successfully.";
        this.router.navigate(['users', {msg: this.msg}]);
      });
  };

}