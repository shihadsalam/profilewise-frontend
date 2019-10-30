import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../service/token.storage';
import { Router, ActivatedRoute } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './upload-user-profile.html',
  styles: []
})
export class UploadUserProfileComponent implements OnInit {
  
  uploader: FileUploader;
  username: string = "";
  private url = 'http://localhost:8088/user-profile/json-upload"';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private token: TokenStorage) {
    route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  ngOnInit() {
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: this.url, autoUpload: true, headers: headers});
    //this.uploader.onCompleteAll = () => {alert('File uploaded'); this.router.navigate(['users', {msg: 'File uploaded'}]);}
  };

  navidateToCard(username) {
    this.router.navigate(['userCard', {username: username}]);
  }

}