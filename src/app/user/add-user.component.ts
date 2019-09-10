import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();
  userNames: String[];
  msg: String = "";
  countries: string[] = ["India", "England", "Australia", "South Africa", "New Zealand"];
  public addUserForm: FormGroup

  constructor(private router: Router, private userService: UserService) {
    this.userService.getUserNames()
    .subscribe(usernames => {
      this.userNames = usernames;
    });
  }

  ngOnInit() {
    this.addUserForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', [])
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addUserForm.controls[controlName].hasError(errorName);
}

  createUser(): void {
    this.userService.createUser(this.user)
      .subscribe(data => {
        this.msg = "User " +this.user.firstName+ " created successfully.";
        this.router.navigate(['login', {msg: this.msg}]);
      });
  };

  isUserExists(username) : boolean {
    return this.userNames && this.userNames.includes(username);
  }

}