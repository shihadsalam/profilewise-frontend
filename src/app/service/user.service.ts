import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../user/user';
import { Message } from '../user/message';
import { UserCareer } from '../user/user-career';
import { ProfileGlimpseFields } from '../user/glimpse-fields';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    private userUrl = 'http://localhost:8088/users';
    private userCareerUrl = 'http://localhost:8088/user-career';
    //private userUrl = '/users';

    public getUsers() {
        return this.http.get<User[]>(this.userUrl);
    }

    public getUserByUsername(username) {
        return this.http.get<User>(this.userUrl + "/" + username);
    }

    public getUserNames() {
        return this.http.get<String[]>(this.userUrl+ "/get-all-usernames");
    }

    public deleteUser(user) {
        return this.http.delete(this.userUrl + "/" + user.username);
    }

    public createUser(user) {
        return this.http.post<User>(this.userUrl + "/signup", user);
    }

    public editUser(user) {
        return this.http.put<User>(this.userUrl + "/edit-user", user);
    }

    public createUserCareer(userCareer, username) {
        return this.http.post<User>(this.userCareerUrl + "/create-career", {userCareer, username});
    }

    public getUserCareer(username) {
        return this.http.get<UserCareer>(this.userCareerUrl + "/" + username);
    }

    public importUserCareer(json, username) {
        return this.http.post<Message>(this.userCareerUrl + "/import-career", {json, username});
    }

    public getImportedUserCareer(username) {
        return this.http.get<Map<String, Object>[]>(this.userCareerUrl + "/get-imported-career/" + username);
    }

    public addGlimpseFields(fields) {
        return this.http.post<Map<String, Object>>(this.userCareerUrl + "/add-glimpse-fields", fields);
    }

    public addGlimpseRecord(jsonData) {
        return this.http.post<Message>(this.userCareerUrl + "/add-glimpse-record", jsonData);
    }

    public getGlimpseRecord(username) {
        return this.http.get<Map<string, object>>(this.userCareerUrl + "/get-glimpse-records/" + username);
    }

    public getGlimpseFields(username) {
        return this.http.get<String[]>(this.userCareerUrl + "/get-glimpse-fields/" + username);
    }

    public isGlimpseFieldsExists(username) {
        return this.http.get<Boolean>(this.userCareerUrl + "/check-glimpse-fields/" + username);
    }

}