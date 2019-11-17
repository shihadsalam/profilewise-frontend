import { Component } from "@angular/core";
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{

  constructor(private authService: AuthService, private userService: UserService, 
    private router: Router){ 

  }

}