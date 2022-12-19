import { Component, OnInit } from '@angular/core';
import Chart from "../../../../../assets/Chart.js";

@Component({
  selector: 'app-create-exp-dashboard',
  templateUrl: './create-exp-dashboard.component.html',
  styleUrls: ['./create-exp-dashboard.component.scss']
})
export class CreateExpDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var gsf2=new Chart(document.getElementById("myChart2"), {
      type: 'line',
      
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{ 
            data: [86,114,106,106,107,111,133,221,783,2478],
            label: "Pending",
            borderColor: "#3e95cd",
            fill: false
          }, { 
            data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Submit",
            borderColor: "#8e5ea2",
            fill: false
          }, { 
            data: [168,170,178,190,203,276,408,547,675,734],
            label: "Approved",
            borderColor: "#3cba9f",
            fill: false
          }, { 
            data: [40,20,10,16,24,38,74,167,508,784],
            label: "Paid",
            borderColor: "#e8c3b9",
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      },
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }
    })


   
  }

 
}



