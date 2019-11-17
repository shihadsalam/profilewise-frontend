import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../service/user.service';
import { RadarDataSet } from './radar-chart-data';
import { User } from '../user/user';

declare var jsPDF: any;
@Component({
  templateUrl: './radar-chart.html'
})
export class RadarChartComponent implements OnInit{

  reportees: String[] = [];
  reportee: string = "";
  fieldType: String = "";
  profileFieldTypes: String[] = [];
  displayChart: boolean = false;
  radarChartLabels: String[] = [];
  radarChartData: RadarDataSet[] = [];
  radarChartType: String = "radar";
  currentUser: User;

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
        this.populateFieldSet(this.currentUser.username);
      }
  }

  populateFieldSet(reportee) {
    this.reportee = reportee;
    this.userService.getProfileFieldsAsMap(reportee)
          .subscribe(data => {
              this.profileFieldTypes = Object.keys(data);
          }); 
  }

  fieldSetSelected(fieldSet) {
    this.fieldType = fieldSet;
}
  
  populateChart() {
    if(!this.reportee) {
      this.openSnackBar("Please select the Reportee", "Error! ");
    }
    else if(!this.fieldType) {
      this.openSnackBar("Please select the Field Set", "Error! ");
    }
    else {
      this.userService.getRadarChart(this.reportee, this.fieldType)
        .subscribe(data => {
            if(data) {
              this.radarChartLabels = data.labels;
              this.radarChartData = data.dataSets;
              this.displayChart = true;
            }
            else {
              this.openSnackBar("Valid chart data parameters unavailable", "Error! ");
            }
        });
    }
  }

  exportAsPDF() {
    var chart = <HTMLCanvasElement>document.getElementById("radarChart");
    var dataUrl = chart.toDataURL();
    var title = "Bar Chart Representation - " + this.reportee.toUpperCase() + " | " + this.fieldType;
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
      pdf.save("radarchart_" + this.reportee + ".pdf");
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