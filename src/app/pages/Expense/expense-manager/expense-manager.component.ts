import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, ExpenseItems } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-manager',
  templateUrl: './expense-manager.component.html',
  styleUrls: ['./expense-manager.component.scss']
})
export class ExpenseManagerComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;
  ExpenseItemsList:any;

  public loginForm: FormGroup;
  ActionFlag=0;
  editData: CMAdminModuleMasterUser;
   arr: ExpenseItems[] = [];
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder


  ) {
    
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
     
      txttitle: new FormControl(),
      txtworkorderno: new FormControl(),
      txtlocation: new FormControl(),
      txtfromdate: new FormControl(),
      txttodate: new FormControl(),
      txtdate: new FormControl(),
      txtdescription: new FormControl(),
      ddlPaidby: new FormControl(),
      ddlExpenseType: new FormControl(),
      txtDistance: new FormControl(),
      txtamount: new FormControl(),
      txtParkingAmt: new FormControl(),
      btn_add: new FormControl(),
      btnUpload: new FormControl(),
      FileUpload1: new FormControl(),
      ddlstatus: new FormControl(),
      txtcomments: new FormControl(),

    });



    this.LodeDataTable();

  }

 

  async INSERTHeader(
    expenseId: number,
    title: String,
    periodForm: Date,
    periodTo: Date,
    workOrderId: String,
    location: String,
  
    createdBy: number,
    
    updateBy: number,
    ActionStatus:string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($expenseId: Long!
      $title: String
      $periodForm: DateTime
      $periodTo: DateTime
      $workOrderId: String
      $location: String
      
      $createdBy: Int
    
      $updateBy: Int) {
      __typename
      cMExpenseHead(data: {detail:
        {expenseId: $expenseId,
          createdBy: $createdBy,
          createdOn: "2019-10-10",
          location: $location,
          periodForm: $periodForm,
          periodTo: $periodTo,
          title:$title,
          updateBy: $updateBy,
          updateOn: "2019-10-10",
          workOrderId: $workOrderId
        }, iD: "${expenseId}"}, triger: "${ActionStatus}") {
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
        expenseId,
        title,
        periodForm,
        periodTo,
        workOrderId,
        location,
       
        createdBy,
       
        updateBy
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async INSERTITEMS(
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
  async INSERTStatus(
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
  async INSERTAttach(
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
      __typename
      pOExpenseHeads {
        title
        periodForm
        periodTo
        workOrderId
        location
        createdOn
        createdBy
        updateOn
        updateBy
        expenseId
      }
      pOExpenseItems {
        expenseId
        date
        expenseTypeId
        amount
        approvedAmount
        createdOn
        createdBy
        updateOn
        updateBy
        description
        paidBy
        distance
        parkingAmt
        amt
        expenseItemsId
      }
      pOExpenseStatusStates {
        expenseId
        statusId
        createdOn
        createdBy
        updateOn
        updateBy
        comments
        rid
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

    this.persons = obj["data"]["cMTmAdminModuleMasters"]

    
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

//----------------------------------CURD OPERATIONS-------------------------------------------------------------

  async onSubmit() {
    try{

    alert("hello");
      

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


          var output =await  this.INSERTHeader(
            1,
           "fdf",
          new Date("2019-10-10"),
          new Date("2019-10-10"),
           " workOrderId: String,",
           " location: String,",
           
             1,
            
            1,
            "INSERT"
          );


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);
        
            var outputFinal = obj["data"]["cMExpenseHead"];
            localStorage.setItem("EXPOID",outputFinal[0].detail)
          

          
          

            // var output2 =await  this.INSERTITEMS(
            //   1,
            //  "fdf",
            // new Date("2019-10-10"),
            // new Date("2019-10-10"),
            //  " workOrderId: String,",
            //  " location: String,",
             
            //    1,
              
            //   1,
            //   "INSERT"
            // );

            



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
              //this.LodeDataTable();

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


        var output = null;
        // await this.INSERT(0,
        //   this.loginForm.get('txtModuleName').value,
        //   this.loginForm.get('txtModuleOrder').value,
        //   this.Logins1.TMUserMaster.userCode
        //   , 0, this.editData.rid,"UPDATE");


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
    
  // var state="Delete"
  // if(state==state)
  // {


    
  //     const { value: showConfirmButton } = await Swal.fire({
  //       title: "Are You Sure Want To Delete",
  //       icon: 'question',
  //       //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
  
  //       showConfirmButton: true,
  //       showCancelButton: true
  //     })
  
  //     if (showConfirmButton == true) {


  //       var output = null;
  //       //await this.INSERT( 0,"0",0,0,0,Number(string),"DELETE");
    
  //       const myJSON = JSON.stringify(output);
  //       const obj = JSON.parse(myJSON);
    
  //       var outputFinal = obj["data"]["cMTmAdminModuleMasters"];

       
  //         if(outputFinal[0].message=="Success")
  //         {
  //           const Toast = Swal.mixin({
  //             toast: true,
  //             position: 'top-end',
  //             showConfirmButton: false,
  //             timer: 3000,
  //             timerProgressBar: true,
  //             didOpen: (toast) => {
  //               toast.addEventListener('mouseenter', Swal.stopTimer)
  //               toast.addEventListener('mouseleave', Swal.resumeTimer)
  //             }

  //           })

  //           this.Logins1.popupStatus
  //           Toast.fire({
  //             icon: 'success',
  //             title: 'Data Delete Successfully',


  //           })
  //           this.LodeDataTable();

  //         }else{

  //           Swal.fire(
  //             'Failed ',
  //             '',
  //             'error'
  //           )

  //         }

       
  //     }
  
//}


}
catch(error)
{
  Swal.fire(
    'Failed',
    error,
    'error')
}
}

async onReset()
{
  this.loginForm.reset();
  this.ActionFlag=0;
}

async onedit(string:string)
{
  this.editData=Enumerable.from( this.persons).cast<CMAdminModuleMasterUser>().where(x=>x.rid==Number(string)).singleOrDefault();
  
  this.loginForm.setValue({
    txtModuleName: this.editData.moduleName,
    txtModuleOrder:this.editData.moduleOrder,

  });
  this.ActionFlag=1;
}

//----------------------------------CURD OPERATIONS-------------------------------------------------------------


async Add_items()
{try
  {


   
// console.log();
const  datain=[{key:
      {
        
      
         expenseId: 0,
	 expenseTypeId: Number(this.loginForm.get('ddlExpenseType').value),
	 amount:  Number(this.loginForm.get('txtamount').value),
	 approvedAmount: 1,
	 createdBy: 1,
	 updateBy: 1,
	 description: this.loginForm.get('txtdescription').value,
	 paidBy: this.loginForm.get('ddlPaidby').value,
	 distance: Number(this.loginForm.get('txtDistance').value),
	 parkingAmt: Number(this.loginForm.get('txtParkingAmt').value),
	 aMt: Number(this.loginForm.get('ddlExpenseType').value),
	 //expenseItemsId: Number(uniqId()) ,
    Date:new Date(this.loginForm.get('txtdate').value)
  }}] as unknown as ExpenseItems;

   this.arr.push(datain);


   const test = [
    { nation: { name: "Germany", iso: "DE", rankingPoints: 293949 } },
    { nation: { name: "Hungary", iso: "HU", rankingPoints: 564161 } },
    { nation: { name: "Serbia", iso: "SR", rankingPoints: 231651 } }
];    

const sorted = this.arr.sort((a, b) => a.expenseItemsId - b.expenseItemsId);


console.log(sorted);


}catch(error)
{
  Swal.fire(
    'Failed',
    error,
    'error')
}

}


}
