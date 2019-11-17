import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import { User } from '../user/user';

declare var jsPDF: any;
@Component({
  templateUrl: './pie-chart.html'
})
export class PieChartComponent implements OnInit{

  reportee: string = "";
  recordSet: string = "";
  reportees: String[] = [];
  recordSets: String[] = [];
  displayChart: boolean = false;
  pieChartLabels: String[] = [];
  pieChartData: Number[] = [];
  pieChartType: string = "pie";
  currentUser: User;

  //public pieChartLabels = ['10th Board Total Marks', 'Title2', 'Title3'];
  //public pieChartData = [550, 375, 400];
  //public pieChartType = 'pie';

  constructor(private userService: UserService, private router: Router, 
    private route: ActivatedRoute, private snackBar: MatSnackBar) { 
      this.currentUser = userService.getCurrentUser();
      if(this.currentUser.isSupervisor) {
        route.params.subscribe(params => {
          this.userService.getReportees()
            .subscribe(data => {
              data.forEach(each => {
                  this.reportees.push(each.username);
              });
            });
        });
      }
      else {
        this.populateRecordSet(this.currentUser.username);
      }
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
      this.userService.getPieChart(this.reportee, this.recordSet)
        .subscribe(data => {
            if(data) {
              this.pieChartLabels = data.labels;
              this.pieChartData = data.values;
              this.displayChart = true;
            }
            else {
              this.openSnackBar("Valid chart data parameters unavailable", "Error! ");
            }
        });
    }
  }

  exportAsPDF() {
    var chart = <HTMLCanvasElement>document.getElementById("pieChart");
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
      pdf.save("piechart_" + this.reportee + ".pdf");
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