import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';

declare var jsPDF: any;
@Component({
  templateUrl: './doughnut-chart.html'
})
export class DoughnutChartComponent implements OnInit{

  currentUser: String = "";
  reportee: string = "";
  recordSet: string = "";
  reportees: String[] = [];
  recordSets: String[] = [];
  displayChart: boolean = false;
  doughnutChartLabels: String[] = [];
  doughnutChartData: Number[] = [];
  doughnutChartType: string = "doughnut";

  //public doughnutChartLabels = ['10th Board Total Marks', 'Title2', 'Title3'];
  //public doughnutChartData = [550, 375, 400];
  //public doughnutChartType = 'doughnut';

  constructor(private userService: UserService, private router: Router, 
    private route: ActivatedRoute, private snackBar: MatSnackBar) { 
      route.params.subscribe(params => {
        this.currentUser = params['username'];
        this.userService.getReportees(this.currentUser)
          .subscribe(data => {
            data.forEach(each => {
                this.reportees.push(each.username);
            });
          });
      });
  } 
  
  populateRecordSet(reportee) {
    this.reportee = reportee;
    this.userService.getProfileRecordTitles(reportee)
        .subscribe(data => {
            this.recordSets = data;
        }); 
  }

  recordSetSelected(recordSet) {
      this.recordSet = recordSet;
  }
  
  populateChart() {
    if(!this.reportee) {
      this.openSnackBar("Please select the Reportee", "Error! ");
    }
    else if(!this.recordSet) {
      this.openSnackBar("Please select the Record Set", "Error! ");
    }
    else {
      this.userService.getDoughnutChart(this.reportee, this.recordSet)
        .subscribe(data => {
            if(data) {
              this.doughnutChartLabels = data.labels;
              this.doughnutChartData = data.values;
              this.displayChart = true;
            }
            else {
              this.openSnackBar("Valid chart data parameters unavailable", "Error! ");
            }
        });
    }
  }

  exportAsPDF() {
    var chart = <HTMLCanvasElement>document.getElementById("doughnutChart");
    var dataUrl = chart.toDataURL();
    var title = "Bar Chart Representation - " + this.reportee.toUpperCase() + " | " + this.recordSet;
    var pdf;

    if(chart.width > chart.height){
      pdf = new jsPDF('l', 'mm', [chart.width, chart.height]);
      pdf.text(10, 10, title);
      pdf.addImage(dataUrl, 'JPEG', 30, 30);
      }
      else{
        pdf = new jsPDF('p', 'mm', [chart.height, chart.width]);
        pdf.text(10, 10, title);
        pdf.addImage(dataUrl, 'JPEG', 30, 30);
      }
      pdf.save("doughnutchart_" + this.reportee + ".pdf");
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }

  ngOnInit() {
  }
  
}