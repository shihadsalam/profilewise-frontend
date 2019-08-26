import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCareer} from './user-career';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  templateUrl: './multi-edit-user.component.html'
})
export class MultiEditUserComponent {

  user: User;
  username: String = "";
  userNames: String[];
  msg: String = "";
  countries: string[] = ["India", "England", "Australia", "South Africa", "New Zealand"];
  public editUserForm: FormGroup;
  public careerForm: FormGroup;
  userCareer: UserCareer = new UserCareer();

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    route.params.subscribe(params => {
      this.username = params['username'];
      this.userService.getUserByUsername(this.username).
        subscribe(data => {
          this.user = data;
          if (this.user.userCareer) {
            this.userCareer =  this.user.userCareer;
          }
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

    this.careerForm = new FormGroup({
      matches: new FormControl('', [Validators.required]),
      runs: new FormControl('', [Validators.required]),
      battingAvg: new FormControl('', [Validators.required]),
      highScore: new FormControl('', [Validators.required]),
      wickets: new FormControl('', [Validators.required]),
      bowlingAvg: new FormControl('', [Validators.required]),
      bestBowling: new FormControl('', [Validators.required]),
      catches: new FormControl('', [Validators.required]),
    });
  }

  public hasUserError = (controlName: string, errorName: string) =>{
    return this.editUserForm.controls[controlName].hasError(errorName);
  }

  public hasCareerError = (controlName: string, errorName: string) =>{
    return this.careerForm.controls[controlName].hasError(errorName);
  }

  updateUser(user, userCareer): void {
    if(this.user.userCareer == null){
      this.user.userCareer = userCareer;
    }
    this.userService.editUser(user)
      .subscribe(data => {
        this.msg = "User " +this.user.firstName+ " edited successfully.";
        this.router.navigate(['users', {msg: this.msg}]);
      });
  };
}