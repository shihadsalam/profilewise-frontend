import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { User } from '../user/user';
import { Message } from '../user/message';
import { ProfileFields } from '../user/profile-fields';
import { Observable } from 'rxjs';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    private userUrl = 'http://localhost:8088/users';
    private userProfileUrl = 'http://localhost:8088/user-profile';
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

    public deleteUser(username) {
        return this.http.delete(this.userUrl + "/" + username);
    }

    public createUser(user) {
        return this.http.post<User>(this.userUrl + "/signup", user);
    }

    public editUser(user) {
        return this.http.put<User>(this.userUrl + "/edit-user", user);
    }

    public assignAsReportee(user) {
        return this.http.post<Message>(this.userUrl + "/assign-reportee", user);
    }

    public removeReportee(user) {
        return this.http.post<Message>(this.userUrl + "/remove-reportee", user);
    }

    public getProfileFields(username, type) {
        return this.http.get<String[]>(this.userProfileUrl + "/get-profile-fields/" + username + "/" + type);
    }

    public getProfileFieldsAsMap(username) {
        return this.http.get<Map<String, String[]>>(this.userProfileUrl + "/get-profile-fields-map/" + username);
    }

    public addProfileFields(fields) {
        return this.http.post<Message>(this.userProfileUrl + "/add-profile-fields", fields);
    }

    public getProfileRecords(username) {
        return this.http.get<Map<String, Map<string, object>>>(this.userProfileUrl + "/get-profile-records/" + username);
    }

    public addProfileRecords(profileRecord) {
        return this.http.post<Message>(this.userProfileUrl + "/add-profile-records", profileRecord);
    }

    public getProfileFieldsAsJson(username, type) {
        return this.http.get<string>(this.userProfileUrl + "/get-fields-json/" + username+ "/" + type);
    }

    public downloadProfileFieldsAsJson(username, type) : Observable<HttpResponse<string>> {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json; charset=utf-8');
        return this.http.get(this.userProfileUrl + "/download-fields-json/" + username+ "/" + type,
        {
            headers: headers,
            observe: 'response',
            responseType: 'text'
        });
    }

}