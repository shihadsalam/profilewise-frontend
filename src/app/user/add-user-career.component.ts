import { Component, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User} from './user';
import { UserCareer} from './user-career';
import { UserService } from '../service/user.service';

@Component({
  templateUrl: './add-user-career.component.html'
})
export class AddUserCareerComponent {

  public careerForm: FormGroup;
  userCareer: UserCareer = new UserCareer();
  user: User;
  username: String = "";
  msg: String = "";

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    route.params.subscribe(params => {
      this.username = params['username'];
    });
    this.userService.getUserCareer(this.username).
      subscribe(data => {
        if (data) {
          this.userCareer = data;
        }      
      });
  }

  createUserCareer(): void {
    this.userService.createUserCareer(this.userCareer, this.username)
      .subscribe(data => {
        this.user = data;
        this.msg = "Career created/updated for " + this.user.firstName;
        this.router.navigate(['users', {msg: this.msg}]);
      });
  };

  ngOnInit() {
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

  public hasError = (controlName: string, errorName: string) =>{
    return this.careerForm.controls[controlName].hasError(errorName);
  }

}