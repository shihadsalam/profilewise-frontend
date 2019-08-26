import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from '../service/token.storage';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router, private token: TokenStorage) {
    }

    attemptAuth(username: string, password: string, generateTokenUrl: string): Observable<any> {
        const credentials = { username: username, password: password };
        return this.http.post(generateTokenUrl, credentials);
    }

    logOut() {
        this.token.signOut();
        this.router.navigate(['login']);
    }

    isUserLoggedIn() {
        return this.token.isUserLoggedIn();
    }

}