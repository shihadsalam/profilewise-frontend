import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../service/token.storage';
import { Router, ActivatedRoute } from '@angular/router';
import {FileUploader} from 'ng2-file-upload';

import { User } from './user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './upload-user-career.component.html',
  styles: []
})
export class UploadUserCareerComponent implements OnInit {
  
  uploader: FileUploader;
  username: string = "";
  private userCareerUploadUrl = 'http://localhost:8088/user-career/json-upload"';

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private token: TokenStorage) {
    route.params.subscribe(params => {
      this.username = params['username'];
    });
  }

  ngOnInit() {
    const headers = [{name: 'Accept', value: 'application/json'}];
    this.uploader = new FileUploader({url: this.userCareerUploadUrl, autoUpload: true, headers: headers});
    //this.uploader.onCompleteAll = () => {alert('File uploaded'); this.router.navigate(['users', {msg: 'File uploaded'}]);}
  };

}