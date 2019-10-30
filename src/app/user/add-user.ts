import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  templateUrl: './add-user.html'
})
export class AddUserComponent {

  user: User = new User();
  userNames: String[];
  msg: String = "";
  roles: string[] = ["Admin", "HOD", "Student", "Manager", "Employee"];
  genders: string[] = ["Male", "Female"];
  public addUserForm: FormGroup;
  public contactForm: FormGroup;

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
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      userRole: new FormControl('', [Validators.required]),
      isSupervisor: new FormControl('', [])
    });

    this.contactForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required]),
      addressLine1: new FormControl('', [Validators.required]),
      addressLine2: new FormControl('', [Validators.required]),
      addressLine3: new FormControl('', [Validators.required])
    });
  }

  public hasUserError = (controlName: string, errorName: string) =>{
    return this.addUserForm.controls[controlName].hasError(errorName);
}

public hasContacError = (controlName: string, errorName: string) =>{
  return this.contactForm.controls[controlName].hasError(errorName);
}

  createUser(user): void {
    this.userService.createUser(user)
      .subscribe(data => {
        this.msg = "User " +this.user.firstName+ " created successfully.";
        this.router.navigate(['login', {msg: this.msg}]);
      });
  };

  isUserExists(username) : boolean {
    return this.userNames && this.userNames.includes(username);
  }

}