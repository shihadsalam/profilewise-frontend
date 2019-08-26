export class UserCareer {
    constructor(
      public id: number = 0,
      public matches: number = 0,
      public runs: number = 0,
      public battingAvg: number = 0.0,
      public highScore: number = 0,
      public wickets: number = 0,
      public bowlingAvg: number = 0.0,
      public bestBowling: string = "",
      public catches: number = 0
    ) {}
  }