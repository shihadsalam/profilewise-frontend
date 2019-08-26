import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorage } from '../service/token.storage';

@Component({
    templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit{
    ngOnInit(): void {
        
    }

    constructor(private router: Router, private token: TokenStorage) {
        this.token.signOut();
        this.router.navigate(['login']);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username')
        console.log(!(user === null))
        return !(user === null)
      }

}