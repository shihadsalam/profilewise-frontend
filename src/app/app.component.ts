import { Component } from "@angular/core";
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { TokenStorage } from './service/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  username: string = "";

  constructor(private authService: AuthService, private router: Router, private token : TokenStorage){ 
    if(token) {
      this.username = token.getCurrentUser();
    }
  }

}