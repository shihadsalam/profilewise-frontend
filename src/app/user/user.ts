import { UserCareer } from './user-career';

export class User {
    constructor(
      public id: number = 0,
      public userCareer: UserCareer = new UserCareer(),
      public firstName: string = "",
      public lastName: string = "",
      public dob: string = "",
      public username: string = "",
      public email: string = "",
      public password: string = "",
      public country: string = "",
      public isAdmin: boolean = false
    ) {}
  }