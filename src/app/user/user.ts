import { UserContact } from './user-contact';

export class User {
    constructor(
      public id: number = 0,
      public userContact: UserContact = new UserContact(),
      public supervisor: User = null,
      public firstName: string = "",
      public lastName: string = "",
      public gender: string = "",
      public dob: string = "",
      public username: string = "",
      public password: string = "",
      public role: string = "",
      public isSupervisor: boolean = false,
      public isSupervisorAssigned: boolean = false
    ) {}
  }