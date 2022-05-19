import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-drawing-qrcode',
  templateUrl: './read-drawing-qrcode.component.html',
  styleUrls: ['./read-drawing-qrcode.component.scss']
})
export class ReadDrawingQrcodeComponent implements OnInit {
  dtOptions: any = {};
  constructor() { }

  ngOnInit(): void {
  
      

    this.dtOptions = {
      ajax: 'http://l-lin.github.io/angular-datatables/data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }, {
        title: 'Last name',
        data: 'lastName'
      }],
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      buttons:[{
        extend: 'excel',
        text: 'hello',
        exportOptions: {
          columns: ':visible'
        }}],
      // Configure the buttons
      responsive: true
    };
 
  }


}
