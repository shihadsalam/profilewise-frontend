
export class BarChartData {
    constructor(
      public labels: string[] = [],
      public dataSets: BarDataSet[]
    ) {}
  }

  export class BarDataSet {
    constructor(
      public label: string,
      public data: Number[]
    ) {}
  }