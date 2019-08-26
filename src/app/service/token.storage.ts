import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const CURRENT_USER = 'CurrentUser';


@Injectable()
export class TokenStorage {

    constructor() { }

    signOut() {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.clear();
    }

    isUserLoggedIn() {
        let user = window.sessionStorage.getItem(TOKEN_KEY)
        return !(user === null)
      }

    public saveToken(token: string, userName: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
        window.sessionStorage.setItem(CURRENT_USER, userName);
    }

    public getToken(): string {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public getCurrentUser(): string {
        return window.sessionStorage.getItem(CURRENT_USER);
    }
}
