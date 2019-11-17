import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../service/token.storage';

@Component({
    templateUrl: './logout.html'
})
export class LogoutComponent implements OnInit{
    ngOnInit(): void {
        
    }

    constructor(private router: Router, private token: TokenStorage) {
        this.token.signOut();
        this.router.navigate(['login']);
    }

    isUserLoggedIn() {
        return this.token.isUserLoggedIn();
      }

}