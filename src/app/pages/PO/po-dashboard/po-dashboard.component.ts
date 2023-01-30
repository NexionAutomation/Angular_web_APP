

import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import {  pOTmPurchaseBodies, TM_CompanyMaster, TM_CountryMaster, TM_PurchaseHead, TM_PurchaseHeadscema, Tm_supplierMaster } from '@modules/Module/PoModules.js';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component.js';


import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Subject } from 'rxjs';

import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';
import Chart from "../../../../assets/Chart.js";

@Component({
  selector: 'app-po-dashboard',
  templateUrl: './po-dashboard.component.html',
  styleUrls: ['./po-dashboard.component.scss']
})
export class PoDashboardComponent implements OnInit {
 
  public Module_Id: number;
  public ModuleName: string;
  public ModuleOrder: number;
  public CUser_Id: number;
  public MUser_Id: number;
  public RID: number;
  public status: any;
   public TotalAmount: any;
   public Qty: any;
  public deleverydate:any;
  public status2:TM_PurchaseHeadscema;
  public CM_AdminModuleMaster: CM_AdminModuleMaster
   ActionFlag= 0;

  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  //CM_AdminModuleMaster: CM_AdminModuleMaster;


  public loginForm: FormGroup;
  POTmSupplierMasters: Enumerable<Tm_supplierMaster>;
  POTmCompanyMasters: Enumerable<TM_CountryMaster>;
  pOTmPurchaseHeads: Enumerable<TM_PurchaseHead>;
  POTmCompanyMasters1: Enumerable<TM_CompanyMaster>;
  public PurchaseHead: TM_PurchaseHead;
  editData: any;
 
  constructor(
   
   
    private Logins1: Logins,

    private _router:Router


  ) {
    //super();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      txtModuleName: new FormControl(null),
      txtModuleOrder: new FormControl(null),

    });

    this.LodeDataTable();
    const date = new Date()
const year = date.getFullYear()

let month: number | string = date.getMonth() + 1
let day: number | string = date.getDate()

if (month < 10) month = '0' + month
if (day < 10) day = '0' + day

const today = `${year}-${month}-${day}`    
document.getElementById("birthday").ariaValueText = today;
    

  }

  async INSERTHeader(
    poId: number,
    companyId: number,
    supplierId: number,
    orderDate: Date,
    paymentTerms: String,
    indentNo: String,
    freightTerms: String,
    workOrderNo: String,
    gst: String,
    deliveryDate: Date,
    remarks: String,
    total: number,
    enduser: String,
    creationDate: Date,
    cuserId: number,
    modificationDate: Date,
    muserId: number,
    deliveryMode: String,
    id: number,
    ActionStatus:string,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation(
      $poId: Int
      $companyId: Int
      $supplierId: Int
      $orderDate: DateTime
      $paymentTerms: String
      $indentNo: String
      $freightTerms: String
      $workOrderNo: String
      $gst: String
      $deliveryDate: DateTime
      $remarks: String
      $total: Float
      $enduser: String
      $creationDate: DateTime
      $cuserId: Int
      $modificationDate: DateTime
      $muserId: Int
      $deliveryMode: String
      $id: Int) {
      __typename
      cMTmPurchaseHead(data: {detail:
        {
          companyId: $companyId,
          creationDate: $creationDate,
          cuserId: $cuserId, 
          deliveryDate: $deliveryDate, 
          deliveryMode: $deliveryMode,
          enduser: $enduser,
          freightTerms:$freightTerms,
          gst: $gst, 
          id: $id,
          indentNo: $indentNo,
          modificationDate: $modificationDate,
          muserId: $muserId,
          orderDate: $orderDate,
          paymentTerms: $paymentTerms, 
          poId: $poId,
          remarks: $remarks, 
          supplierId: $supplierId,
          total:$total,
          workOrderNo: $workOrderNo
        }, iD: "${poId}"}, triger: "${ActionStatus}")
        { 
          iD
          code
          message
          status
          detail
        }
    }
    
       `

    var datas = JSON.stringify({
      query, variables: {
        poId,
        companyId,
        supplierId,
        orderDate,
        paymentTerms,
        indentNo,
        freightTerms,
        workOrderNo,
        gst,
        deliveryDate,
        remarks,
        total,
        enduser,
        creationDate,
        cuserId,
        modificationDate,
        muserId,
        deliveryMode,
        id,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }

  async INSERT(
    moduleId: number,
moduleName: String,
moduleOrder: number,

cuserId: number,

muserId: number,
rid: number,
    ActionStatus:string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($moduleId: Int!
      $moduleName: String
      $moduleOrder: Int!
      
      $cuserId: Int!
      
      $muserId: Int!
      $rid: Int!) {
      __typename
      cMTmAdminModuleMasters(triger: "${ActionStatus}",
        data: {detail: {
          moduleId: $moduleId,
          moduleOrder: $moduleOrder,
          creationDate: "2019-10-10",
          cuserId: $cuserId,
          modificationDate: "2019-10-10",
          muserId: $muserId,
          rid: $rid,
          moduleName: $moduleName
        }, iD: "${rid}"}) {
        code
        detail
        iD
        message
        status
      }
    }
    
               
       `

    var datas = JSON.stringify({
      query, variables: {
        moduleId,
moduleName,
moduleOrder,

cuserId,

muserId,
rid,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      cMPOFetchdata2 {
        companyId
        companyName
        creationDate
        cuserId
        deliveryDate
        deliveryMode
        enduser
        freightTerms
        gst
        id
        indentNo
        modificationDate
        muserId
        orderDate
        paymentTerms
        poId
        remarks
        supplierId
        supplierName
        total
        workOrderNo
      }

      pOTmPurchaseBodies {
        id
        catname
        creationDate
        cuserId
        description
        dis
        listPrice
        modificationDate
        muserId
        netPrice
        poId
        qty
        unitPrice
        uom
      }
    
    
    }
  `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }

  async LodeDataTable() {
    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

   this.pOTmPurchaseHeads = Enumerable.from( obj["data"]["cMPOFetchdata2"]).cast<TM_PurchaseHead>();
      //this.persons= this.pOTmPurchaseHeads;

    this.persons= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
        var status2= this.persons.toLookup(x=>x.catname).toArray();
        //status2

        status2.toArray().forEach(element => {
         
         var a= element.value.sum(a=>a.qty)
          
        });
        // status2.forEach(a=>{
        //   this.Qty=this.Qty +a.value.qty
        // })
        
      
        this.TotalAmount=    Enumerable.from( this.pOTmPurchaseHeads).sum(a=>a.total);
        



  //  status2.forEach(element => {

  //    this.Qty += parseInt( element.sum(u => u.qty));
    
    
  // });

//'pie',
    //       var gsf2=new Chart(document.getElementById("myChart2"), {
    //   type: 'pie',
    //   data:{
    //     labels: data1,
    //     datasets: [{
    //       label: "Average Max Purchase Co",
    //       backgroundColor: data3,
    //       data: data2
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //   plugins: {
    //     legend: {
    //       position: 'top',
    //     }
    //   },
    //     title: {
    //       display: true,
    //       text: 'Total Number Of Average Max Purchase of Suppliers'
    //     }
    //   }
    // })


    $('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: true



      });



    });



  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }



  

   getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//----------------------------------CURD OPERATIONS-------------------------------------------------------------

  async onSubmit() {
    try{

    

    if(this.ActionFlag==0)
    {


      if (this.ActionFlag == 0) {
        const { value: showConfirmButton } = await Swal.fire({
          title: "Do You Want To Save",
          icon: 'question',
          //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
    
          showConfirmButton: true,
          showCancelButton: true
        })
    
        if (showConfirmButton == true) {


          var output = await this.INSERT(0,
            this.loginForm.get('txtModuleName').value,
            this.loginForm.get('txtModuleOrder').value,
            this.Logins1.TMUserMaster.userCode
            , 0, 0,"INSERT");


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);
        
            var outputFinal = obj["data"]["cMTmAdminModuleMasters"];
      


            if(outputFinal[0].message=="Success")
            {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }

              })

              this.Logins1.popupStatus
              Toast.fire({
                icon: 'success',
                title: 'Data Create Successfully',


              })
              this.LodeDataTable();

            }else{

              Swal.fire(
                'Failed',
                '',
                'error'
              )

            }

         
        }
    
      }
     
    
  }
  if(this.ActionFlag==1)
  {
    if (this.ActionFlag == 1) {
      const { value: showConfirmButton } = await Swal.fire({
        title: "Do You Want To Update",
        icon: 'question',
        //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
  
        showConfirmButton: true,
        showCancelButton: true
      })
  
      if (showConfirmButton == true) {


        var output = await this.INSERT(0,
          this.loginForm.get('txtModuleName').value,
          this.loginForm.get('txtModuleOrder').value,
          this.Logins1.TMUserMaster.userCode
          , 0, this.editData.rid,"UPDATE");


          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);
      
          var outputFinal = obj["data"]["cMTmAdminModuleMasters"];
    


          if(outputFinal[0].message=="Success")
          {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }

            })

            this.Logins1.popupStatus
            Toast.fire({
              icon: 'success',
              title: 'Data Update Successfully',


            })
            this.LodeDataTable();
          this.ActionFlag=0;
          this.onReset();
          }else{

            Swal.fire(
              'Failed',
              '',
              'error'
            )

          }

       
      }
  
    }
  }
}catch(error )
{
  Swal.fire(
    'Failed',
    error,
    'error')
}

 }
async onDel(string :string)
{
  try{
  var state="Delete"


 
  if(state==state)
  {


    
      const { value: showConfirmButton } = await Swal.fire({
        title: "Are You Sure Want To Delete",
        icon: 'question',
        //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
  
        showConfirmButton: true,
        showCancelButton: true
      })
  
      if (showConfirmButton == true) {

        
        var output = await  this.INSERTHeader(
          Number(string),
         1,
          1,
          new Date("2019-10-10"),
         "paymentTerms",
         "indentNo",
         "freightTerms",
         "workOrderNo",
         "gst",
         new Date("2019-10-10"),
         "remarks",
          1.0,
         "enduser",
         new Date("2019-10-10"),
         1
       ,
         new Date("2019-10-10"),
         1,
         "deliveryMode" ,
         Number(string),
         "DELETE"
       );
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmPurchaseHead"];

       
          if(outputFinal[0].message=="Success")
          {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }

            })

            await this.Logins1.popupStatus
            Toast.fire({
              icon: 'success',
              title: 'Data Delete Successfully',


            })
            await this.LodeDataTable();

          }else{

            Swal.fire(
              'Failed ',
              '',
              'error'
            )

          }

       
      }
  
}


}
catch(error)
{
  Swal.fire(
    'Failed',
    error,
    'error')
}
}
async onreport()
{
  const url = 'https://www.google.com';
    window.open(url, '_blank');
}
async onReset()
{
  this.loginForm.reset();
  this.ActionFlag=0;
}

async onedit(string:string)
{
  this.PurchaseHead=Enumerable.from( this.persons).cast<TM_PurchaseHead>().where(x=>x.pOId==Number(string)).singleOrDefault();
  
  this.loginForm.setValue({
    txtModuleName: this.editData.moduleName,
    txtModuleOrder:this.editData.moduleOrder,

  });
  this.ActionFlag=1;
  
  //this.router.navigate(['CreatePo',string]);
}


openCityInNewWindow(string) {
  // Converts the route into a string that can be used 
  // with the window.open() function
  const url = this._router.serializeUrl(
    this._router.createUrlTree(['/viewPo',string])
  );

  window.open(url, '_blank');
}
//----------------------------------CURD OPERATIONS-------------------------------------------------------------

}




//   constructor() { }

//   ngOnInit(): void {
    
//     var gsf2=new Chart(document.getElementById("myChart2"), {
//       type: 'pie',
      
//       data: {
//         labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
//         datasets: [{ 
//             data: [86,114,106,106,107,111,133,221,783,2478],
//             label: "Pending",
//             borderColor: "#3e95cd",
//             fill: false
//           }, { 
//             data: [282,350,411,502,635,809,947,1402,3700,5267],
//             label: "Submit",
//             borderColor: "#8e5ea2",
//             fill: false
//           }, { 
//             data: [168,170,178,190,203,276,408,547,675,734],
//             label: "Approved",
//             borderColor: "#3cba9f",
//             fill: false
//           }, { 
//             data: [40,20,10,16,24,38,74,167,508,784],
//             label: "Paid",
//             borderColor: "#e8c3b9",
//             fill: false
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//       plugins: {
//         legend: {
//           position: 'top',
//         }
//       },
//         title: {
//           display: true,
//           text: 'World population per region (in millions)'
//         }
//       }
//     })


    
      
   
   
//   }

 
// }



