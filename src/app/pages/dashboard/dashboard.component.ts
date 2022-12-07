import {Component} from '@angular/core';

import * as CanvasJSAngularChart from '../../../assets/canvasjs.angular.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


    chartOptions = {
        title:{
          text: "Total Impressions by Platforms"
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
          suffix: "K"
        },
        data: [{
          type: "bar",
          indexLabel: "{y}",
          yValueFormatString: "#,###K",
          dataPoints: [
            { label: "Snapchat", y: 15 },
            { label: "Instagram", y: 20 },
            { label: "YouTube", y: 24 },
            { label: "Twitter", y: 29 },
            { label: "Facebook", y: 73 }
          ]
        }]
      }	
}
