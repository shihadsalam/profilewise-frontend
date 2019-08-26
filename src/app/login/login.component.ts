import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { TokenStorage } from '../service/token.storage';
import { LoginUser } from './loginUser';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{

    public loginForm: FormGroup;
    loginUser: LoginUser = new LoginUser();
    msg: string;
    generateTokenUrl: string = 'http://localhost:8088/auth/generate-token';

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.maxLength(10)]),
            password: new FormControl('', [Validators.required])
          });
    }

    constructor(private router: Router, private route: ActivatedRoute, 
        private authService: AuthService, private token: TokenStorage, private snackBar: MatSnackBar) {
        route.params.subscribe(params => {
            this.msg = params['msg'];
          });
          if(this.msg){
            this.openSnackBar(this.msg, "Success! ");
          }
    }

    public hasError = (controlName: string, errorName: string) =>{
        return this.loginForm.controls[controlName].hasError(errorName);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
          verticalPosition: 'top'
        });
      }

    login(): void {
        this.authService.attemptAuth(this.loginUser.username, this.loginUser.password, this.generateTokenUrl).subscribe(
            data => {
                if (data.errorMsg) {
                    this.openSnackBar(data.errorMsg, "Error! ");
                }
                else {
                    this.token.saveToken(data.token, this.loginUser.username);
                    this.router.navigate(['users']);
                }
            }
        );
    }

}