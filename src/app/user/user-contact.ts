export class UserContact {
    constructor(
      public id: number = 0,
      public email: string = "",
      public phoneNumber: number = 0,
      public addressLine1: string = "",
      public addressLine2: string = "",
      public addressLine3: string = ""
    ) {}
  }