import {Component, OnInit} from '@angular/core';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Chart from "../../../assets/Chart.js";






@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public nodes: any;
  constructor() { }

  ngOnInit(): void {

    
    // var gsf=new Chart(document.getElementById("myChart"), {
    //   type: 'line',
      
    //   data: {
    //     labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    //     datasets: [{ 
    //         data: [86,114,106,106,107,111,133,221,783,2478],
    //         label: "Africa",
    //         borderColor: "#3e95cd",
    //         fill: false
    //       }, { 
    //         data: [282,350,411,502,635,809,947,1402,3700,5267],
    //         label: "Asia",
    //         borderColor: "#8e5ea2",
    //         fill: false
    //       }, { 
    //         data: [168,170,178,190,203,276,408,547,675,734],
    //         label: "Europe",
    //         borderColor: "#3cba9f",
    //         fill: false
    //       }, { 
    //         data: [40,20,10,16,24,38,74,167,508,784],
    //         label: "Latin America",
    //         borderColor: "#e8c3b9",
    //         fill: false
    //       }, { 
    //         data: [6,3,2,2,7,26,82,172,312,433],
    //         label: "North America",
    //         borderColor: "#c45850",
    //         fill: false
    //       }
    //     ]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'World population per region (in millions)'
    //     }
    //   }
    // })
    //public Editor = ClassicEditor;
    


    this.nodes = [
      {
        name: 'Nexion Automation',
      
      image: '',
      
      childs: [
      {
        name: 'Dalip Kumar',
        cssClass: 'ngx-org-ceo',
        image: 'assets/node.svg',
        title: 'CEO',
        childs:[
          {
            name: 'Sale',
            childs:[{
              name: 'Vinita',
              cssClass: 'ngx-org-head',
              image: 'http://app.nexionautomation.com/FileData/15122022032822.png',
              title: 'Sales Manager'

            }]
          },
          {
            name: 'Purchase',
            childs:[{
              name: 'Mansha Mishra',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Purchase Manager'

            },
            {
              name: 'Mandeep Kaur',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Purchase Manager'

            }]
          },
          {
            name: 'Costing',
            childs:[{
              name: 'Vijay Gopal',
              cssClass: 'ngx-org-head',
              image: 'assets/node.svg',
              title: 'Costing Manager'

            }]
          }
         
        ]
      },
      {
        name: 'Vikas Tomar',
        cssClass: 'ngx-org-head',
        image: 'assets/node.svg',
        title: 'CEO',
        childs:[{
          name:'Technical',
          childs:[{
            name: 'Sadiq',
        cssClass: 'ngx-org-ma',
        image: 'assets/node.svg',
        title: 'Project Manager',
        childs:[{

          name: 'Prashant Gupta',
          cssClass: 'ngx-org-ma',
          image: 'assets/node.svg',
          title: 'Project Engineer',
        },
        {

          name: 'Shiv Kumar',
          cssClass: 'ngx-org-ma',
          image: 'assets/node.svg',
          title: 'Project Engineer',
        }]
          },
          {
            name: 'Ram B Rawat',
        cssClass: 'ngx-org-ma',
        image: 'assets/node.svg',
        title: 'Project Manager',
        childs:[{

          
            name: 'Bharti',
            cssClass: 'ngx-org-ma',
            image: 'assets/node.svg',
            title: 'Project Engineer',
         
        },
        {

          
          name: 'Krishan Mohan',
          cssClass: 'ngx-org-ma',
          image: 'assets/node.svg',
          title: 'Project Engineer',
       
      }
      ]
          },
          {
            name: 'Rahul',
        cssClass: 'ngx-org-ma',
        image: 'assets/node.svg',
        title: 'IT (Software Developer Manager)',
        childs:[{
          name: 'Deepak Baghel',
        cssClass: 'ngx-org-ma',
        image: 'assets/node.svg',
        title: 'IT (Software Developer Engineer)'
        }]
          }]
        }]
      },
    ]
  }


    ];
  }
}
