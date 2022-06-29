import { Logins } from '@/Model/Utility/login';
import { NumberSymbol } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CMAdminModuleMasterUser, ExpenseItems, pOTmPurchaseBodies, TM_CompanyMaster, TM_CountryMaster, TM_PurchaseHead, Tm_supplierMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
//import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';
//import { SearchPoComponent } from '../search-po/search-po.component';

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
  ExpenseItemsList: any;

  public loginForm: FormGroup;
  ActionFlag = 0;
  editData: CMAdminModuleMasterUser;
  arr: ExpenseItems[] = [];
   arr2=new Array() ;


  POTmSupplierMasters: Enumerable<Tm_supplierMaster>;
  POTmCompanyMasters: Enumerable<TM_CountryMaster>;
  chatRoomUid$: any;
  URLid: number;
  pOExpenseItems: any;
  pOTmPurchaseHeads: any;
  pOTmPurchaseBodiess: Enumerable<pOTmPurchaseBodies>;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    //private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router:Router

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


    
    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );

    if (this.chatRoomUid$.destination._value.id != undefined) {
      this.URLid = this.chatRoomUid$.destination._value.id;
      this.ActionFlag = 1;
       this.urlload( this.URLid);
      //console.log(this.URLid);
    }
    else {
      //this._router.navigate(['/SearchPo']);
      this.ActionFlag = 0;
    }
    



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
    ActionStatus: string,
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
    
    poId: number,
description: String,
uom: String,
qty: number,
listPrice: number,
dis: number,
unitPrice: number,
netPrice: number,
// creationDate: Date,
cuserId: number,
// modificationDate: Date,
muserId: number,

catname: String,
id: number,
    ActionStatus: string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($poId: Int
      $description: String
      $uom: String
      $qty: Int
      $listPrice: Float
      $dis: Float
      $unitPrice: Float
      $netPrice: Float
     
      $cuserId: Int
      
      $muserId: Int
      $id: Decimal!
      $catname: String) {
      __typename
      cMTmPurchaseBody(data: {detail:
        {id: $id,
          catname: $catname,
          creationDate: "2019-10-10",
          cuserId: $cuserId,
          description: $description,
          dis: $dis,
          listPrice: $listPrice,
          modificationDate: "2019-10-10",
          muserId: $muserId,
          netPrice: $netPrice,
          poId: $poId,
          qty: $qty,
          unitPrice: $unitPrice, 
          uom: $uom}, iD: "${id}"}, triger: "${ActionStatus}") {
        iD
        code
        message
        status
      }
    }
         
       `

    var datas = JSON.stringify({
      query, variables: {
        poId,
        description,
        uom,
        qty,
        listPrice,
        dis,
        unitPrice,
        netPrice,
        // creationDate,
        cuserId,
        // modificationDate,
        muserId,
        
        catname,
        id,
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
    ActionStatus: string
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
    ActionStatus: string
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
      pOTmPurchaseHeads {
        id
        companyId
        creationDate
        cuserId
        deliveryDate
        deliveryMode
        enduser
        freightTerms
        gst
        indentNo
        modificationDate
        muserId
        orderDate
        paymentTerms
        poId
        remarks
        supplierId
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

    this.POTmSupplierMasters = Enumerable.from(obj["data"]["pOTmSupplierMasters"]).cast<Tm_supplierMaster>();
    this.POTmCompanyMasters = Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<TM_CountryMaster>();
    this.pOTmPurchaseHeads = Enumerable.from(obj["data"]["pOTmPurchaseHeads"]).cast<TM_PurchaseHead>();;
    this.pOTmPurchaseBodiess = Enumerable.from(obj["data"]["pOTmPurchaseBodies"]);


    
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
    try {



      if (this.ActionFlag == 0) {


        if (this.ActionFlag == 0) {
          const { value: showConfirmButton } = await Swal.fire({
            title: "Do You Want To Save",
            icon: 'question',
            //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

            showConfirmButton: true,
            showCancelButton: true
          })

          if (showConfirmButton == true) {


            var output = await this.INSERTHeader(
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
              "deliveryMode",
              1,
              "INSERT"
            );


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);

            var outputFinal = obj["data"]["cMTmPurchaseHead"];
            

            if (outputFinal[0].message == "Success") {
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
              this._router.navigate(['/SearchPo'])

            } else {

              Swal.fire(
                'Failed',
                '',
                'error'
              )

            }


          }

        }


      }
      if (this.ActionFlag == 1) {
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



            if (outputFinal[0].message == "Success") {
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
              this.ActionFlag = 0;
              this.onReset();
            } else {

              Swal.fire(
                'Failed',
                '',
                'error'
              )

            }


          }

        }
      }
    } catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }

  }


  async RemoveElementFromStringArray(element: string) {
    this.arr2.forEach((value,index)=>{
        if(index==Number(element)) this.arr2.splice(index,1);
        
    });
    
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


        var output = 
        await this.INSERTITEMS(  Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1),
        this.loginForm.get('txtdescription').value,
        this.loginForm.get('ddluom').value ,
        this.loginForm.get('txtqty').value,
        this.loginForm.get('txtlistprice').value,
        this.loginForm.get('txtdiscount').value,
       //createdOn: Date,
       0,
       //updateOn: Date,
       0,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
      
       this.Logins1.TMUserMaster.userCode,
       this.Logins1.TMUserMaster.userCode,
       this.loginForm.get('txtcat').value,
       Number(string),
       "DELETE");
   
    
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmPurchaseBody"];

       
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
              title: 'Data Delete Successfully',


            })
            
            var data = await this.GETData2("", "");
            const myJSON = JSON.stringify(data);
            const obj = JSON.parse(myJSON);
        
            var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
            console.log(pOTmPurchaseBodies);
            var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1)).toList();
        
            console.log(datas);
            this.pOExpenseItems=datas;

           

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


  async onReset() {
    this.loginForm.reset();
    this.ActionFlag = 0;
  }

  async onedit(string: string) {
    this.editData = Enumerable.from(this.persons).cast<CMAdminModuleMasterUser>().where(x => x.rid == Number(string)).singleOrDefault();

    this.loginForm.setValue({
      txtModuleName: this.editData.moduleName,
      txtModuleOrder: this.editData.moduleOrder,

    });
    this.ActionFlag = 1;
  }

  //----------------------------------CURD OPERATIONS-------------------------------------------------------------


//   async Add_items() {
//     try {


   
// // console.log();
// var  datain=
//   {
    

//         txtdescription: this.loginForm.get('txtdescription').value,
//         txtcat:this.loginForm.get('txtcat').value,
//         ddluom: this.loginForm.get('ddluom').value,
//         txtqty: this.loginForm.get('txtqty').value,
//          txtlistprice: this.loginForm.get('txtlistprice').value,
//          txtdiscount: this.loginForm.get('txtdiscount').value,
    

// } ;

// console.log(datain);
// this.arr2.push(datain);




//     } catch (error) {
//       Swal.fire(
//         'Failed',
//         error,
//         'error')
//     }

//   }






  
async Add_items()
{try
  {
      var output = null;

     console.log(this.loginForm.get('txtlistprice').value);
    
     var unitdata= this.loginForm.get('txtlistprice').value - (this.loginForm.get('txtlistprice').value * this.loginForm.get('txtdiscount').value) / 100;
     var netdata= this.loginForm.get('txtqty').value  * Number(unitdata);

    var output= this.pOTmPurchaseHeads;
    this.pOTmPurchaseHeads= Enumerable.from(this.pOTmPurchaseHeads).toArray();
     
     
     
     var output=
      await this.INSERTITEMS(  Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1),
     this.loginForm.get('txtdescription').value,
     this.loginForm.get('ddluom').value ,
     this.loginForm.get('txtqty').value,
     this.loginForm.get('txtlistprice').value,
     this.loginForm.get('txtdiscount').value,
    //createdOn: Date,
    unitdata,
    //updateOn: Date,
    netdata,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
   
    this.Logins1.TMUserMaster.userCode,
    this.Logins1.TMUserMaster.userCode,
    this.loginForm.get('txtcat').value,
    0,
    "INSERT");


    
      

       

         




        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmPurchaseBody"];

       
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
              title: 'Data ADD Successfully',


            })


            var data = await this.GETData2("", "");
            const myJSON = JSON.stringify(data);
            const obj = JSON.parse(myJSON);
        
            var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
            console.log(pOTmPurchaseBodies);
            var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1)).toList();
        
            console.log(datas);
            this.pOExpenseItems=datas;

          }
    
       

   //---------------------------important code---------------------
// // console.log();
// const  datain=[{key:
//       {
        
      
//          expenseId: 0,
// 	 expenseTypeId: Number(this.loginForm.get('ddlExpenseType').value),
// 	 amount:  Number(this.loginForm.get('txtamount').value),
// 	 approvedAmount: 1,
// 	 createdBy: 1,
// 	 updateBy: 1,
// 	 description: this.loginForm.get('txtdescription').value,
// 	 paidBy: this.loginForm.get('ddlPaidby').value,
// 	 distance: Number(this.loginForm.get('txtDistance').value),
// 	 parkingAmt: Number(this.loginForm.get('txtParkingAmt').value),
// 	 aMt: Number(this.loginForm.get('ddlExpenseType').value),
// 	 expenseItemsId: Number(uniqId()) ,
//     Date:new Date(this.loginForm.get('txtdate').value)
//   }}] as unknown as ExpenseItems;

//    this.arr.push(datain);


// const sorted = this.arr.sort((a, b) => a.expenseItemsId - b.expenseItemsId);

 //---------------------------important code---------------------



}catch(error)
{
  Swal.fire(
    'Failed',
    error,
    'error')
}

}

async GETData2(User: string, Password: string): Promise<any> {

  let data = '{User="' + User + '",Password="' + Password + '" }';
  let query = `query MyQuery {
    __typename
    pOTmPurchaseHeads {
      id
      companyId
      creationDate
      cuserId
      deliveryDate
      deliveryMode
      enduser
      freightTerms
      gst
      indentNo
      modificationDate
      muserId
      orderDate
      paymentTerms
      poId
      remarks
      supplierId
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


async urlload(STRING)
{
  var data = await this.GETData2("", "");
  const myJSON = JSON.stringify(data);
  const obj = JSON.parse(myJSON);

  var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
  var pOTmPurchaseHeads1= Enumerable.from( obj["data"]["pOTmPurchaseHeads"]).cast<any>().where(x=>x.poId==Number(STRING)).singleOrDefault();
  console.log(pOTmPurchaseBodies);
  var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(STRING)).toList();

  console.log(datas);
  this.pOExpenseItems=datas;

  var da=pOTmPurchaseHeads1.toArray();
  
    
console.log(da)
console.log(da.companyId);
  this.loginForm.setValue({

    ddlcompanyname: da.companyId,
    ddlsuppliername: da.supplierId,
    txtorderdate: da.orderDate,
    txtpaymentterms: da.paymentTerms,
    txtindentno: da.indentNo,
    txtfreightterms:da.freightTerms,
    txtorderno: da.workOrderNo,
    // txtgst: da.gst,
    // txtdelivery: da.deliveryDate
   // chkuplaod: new FormControl(),
    // chklot: true,
    // Drop_gst: data.gst,
    // DropDownList1: ,
    // gst_rdo: new FormControl(),
    // btnsearch: new FormControl(),
    // txtdescription: new FormControl(),
    // txtcat: new FormControl(),
    // ddluom: new FormControl(),
    // txtqty: new FormControl(),
    // txtlistprice: new FormControl(),
    // txtdiscount: new FormControl(),
    // btn_add: new FormControl(),
    // txtremarks: new FormControl(),
    // txttotal: new FormControl(),
    // txtenduser: new FormControl(),




//     : 1
// creationDate: "2022-05-03T05:20:00.000+05:30"
// cuserId: 26
// : "2022-05-04T00:00:00.000+05:30"
// deliveryMode: "Lot"
// enduser: ""
// : "NIL"
// : "EXTRA@18%"
// id: 860
// : ""
// modificationDate: "2022-05-03T05:20:00.000+05:30"
// muserId: 26
// : "2022-05-03T00:00:00.000+05:30"
// : "30 DAYS CREDIT"
// poId: 1981
// remarks: ""
// : 43
// total: 341400
// : "1925"
   });


}

}
