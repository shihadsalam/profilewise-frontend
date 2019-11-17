import { Injectable } from '@angular/core';
import { User } from '../user/user';


const TOKEN_KEY = 'AuthToken';
const CURRENT_USER = 'CurrentUser';


@Injectable()
export class TokenStorage {

    constructor() { }

    signOut() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(CURRENT_USER);
        window.sessionStorage.clear();
    }

    isUserLoggedIn() {
        let user = window.sessionStorage.getItem(CURRENT_USER)
        return !(user === null)
      }

    public saveToken(token: string, currentUser: User) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
        window.sessionStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
    }

    public getToken(): string {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public getCurrentUser(): string {
        return window.sessionStorage.getItem(CURRENT_USER);
    }
}
