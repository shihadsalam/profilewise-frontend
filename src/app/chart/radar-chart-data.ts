
export class RadarChartData {
    constructor(
      public labels: string[] = [],
      public dataSets: RadarDataSet[]
    ) {}
  }

  export class RadarDataSet {
    constructor(
      public label: string,
      public data: Number[]
    ) {}
  }