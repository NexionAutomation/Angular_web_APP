import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, ExpenseItems, TM_CompanyMaster, TM_CountryMaster, Tm_supplierMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePOComponent implements OnInit {
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
  

  POTmSupplierMasters: Enumerable<Tm_supplierMaster>;
  POTmCompanyMasters: Enumerable<TM_CountryMaster>;
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

      ddlcompanyname: new FormControl(),
ddlsuppliername: new FormControl(),
txtorderdate: new FormControl(),
txtpaymentterms: new FormControl(),
txtindentno: new FormControl(),
txtfreightterms: new FormControl(),
txtorderno: new FormControl(),
txtgst: new FormControl(),
txtdelivery: new FormControl(),
chkuplaod: new FormControl(),
chklot: new FormControl(),
Drop_gst: new FormControl(),
DropDownList1: new FormControl(),
gst_rdo: new FormControl(),
btnsearch: new FormControl(),
txtdescription: new FormControl(),
txtcat: new FormControl(),
ddluom: new FormControl(),
txtqty: new FormControl(),
txtlistprice: new FormControl(),
txtdiscount: new FormControl(),
btn_add: new FormControl(),
txtremarks: new FormControl(),
txttotal: new FormControl(),
txtenduser: new FormControl(),
     
     

    });



    this.LodeDataTable();



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
      pOTmSupplierMasters {
        id
        address1
        address2
        address3
        cmobileNo
        contactPerson
        creationDate
        cuserId
        gst
        modificationDate
        muserId
        recordStatus
        supplierName
      }
      pOTmCompanyMasters {
        caddress1
        caddress2
        caddress3
        cemailId
        cmobileNo
        companyName
        cphoto
        creationDate
        cuserId
        cwebsite
        deletedDate
        duserCode
        iaddress1
        iaddress2
        iaddress3
        id
        imobileNo
        igst
        iname
        ipanNo
        modificationDate
        muserId
        reasonForDeletion
        recordstatus
        saddress1
        saddress2
        saddress3
        sattendentName
        smobileNo
        sname
        spanNo
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

    this.POTmSupplierMasters = Enumerable.from( obj["data"]["pOTmSupplierMasters"]).cast<Tm_supplierMaster>();
    this.POTmCompanyMasters =  Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<TM_CountryMaster>()

    
    console.log(this.POTmSupplierMasters);
    console.log(this.POTmCompanyMasters)
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
    1,
            "INSERT"
          );


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);
        
            var outputFinal = obj["data"]["cMTmPurchaseHead"];
            //localStorage.setItem("EXPOID",outputFinal[0].detail)
          

          
          

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
	 expenseItemsId: 1,//Number(uniqId()) ,
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
