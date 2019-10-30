import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  templateUrl: './edit-user.html'
})
export class EditUserComponent {

  user: User;
  username: String = "";
  userNames: String[];
  msg: String = "";
  genders: string[] = ["Male", "Female"];
  roles: string[] = ["Admin", "HOD", "Student", "Manager", "Employee"];
  public editUserForm: FormGroup;
  public contactForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getUserByUsername(this.username).
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
      gender: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      username: new FormControl({ value: '', disabled: true }),
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
    return this.editUserForm.controls[controlName].hasError(errorName);
  }

  public hasContacError = (controlName: string, errorName: string) =>{
    return this.contactForm.controls[controlName].hasError(errorName);
  }

  updateUser(user): void {
    this.userService.editUser(user)
      .subscribe(data => {
        this.msg = "User " +this.user.firstName+ " edited successfully.";
        this.router.navigate(['userCard', {username: user.username, msg: this.msg}]);
        //this.router.navigate(['users', {msg: this.msg}]);
      });
  };

  navidateBack(username) {
    this.router.navigate(['userCard', {username: username}]);
    //this.router.navigate(['users']);
  }
}