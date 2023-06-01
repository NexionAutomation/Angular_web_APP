import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TM_CompanyMaster, TM_CountryMaster, TM_PurchaseHead, Tm_supplierMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { environment } from 'environments/environment.prod';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';

interface DataReturn {
  Return: any;

}


@Component({
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.scss']
})
export class AttandanceComponent implements OnInit {

 

  public Module_Id: number;
  public ModuleName: string;
  public ModuleOrder: number;
  public CUser_Id: number;
  public MUser_Id: number;
  public RID: number;
  public status: any;
  public CM_AdminModuleMaster: CM_AdminModuleMaster
   ActionFlag= 0;

  dtOptions: DataTables.Settings = {};
  persons: any;
  Attand: any;
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
  ActionStatus: any;
 
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
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

  async INSERT1(
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
      cMPOFetchdata {
        id
        workOrderNo
        total
        supplierName
        supplierId
        remarks
        poId
        paymentTerms
        orderDate
        muserId
        modificationDate
        indentNo
        gst
        freightTerms
        enduser
        deliveryMode
        deliveryDate
        cuserId
        creationDate
        companyName
        companyId
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
    this.POTmCompanyMasters1 =  Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<TM_CompanyMaster>()
    this.pOTmPurchaseHeads = Enumerable.from( obj["data"]["cMPOFetchdata"]).cast<TM_PurchaseHead>();
    
    

    //   var result = this.pOTmPurchaseHeads
    // .join(this.POTmSupplierMasters, a => a.supplierID, b => b.iD)
    // .where(s => s.left.supplierID == s.right.iD )
    // .toList();

    
    // var result2 = result
    // .join(this.POTmCompanyMasters1, a => a.left.companyID, b => b.iD)
    // .where(s => s.left.left.companyID== s.right.iD)
    // .toList();
   
    
this.persons= this.pOTmPurchaseHeads.take(200);
    //console.log(da.take(10));
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


          var output = await this.INSERT1(0,
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


        var output = await this.INSERT1(0,
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

async upload($event) {
 
  var operations = {
    query: `
    query MyQuery($file: Upload) {
      uploadFileExcel(files: $file) {
      
        t1
        t10
        t11
        t12
        t13
        t14
        t15
        t16
        t17
        t18
        t19
        t2
        t20
        t21
        t22
        t23
        t24
        t25
        t26
        t27
        t28
        t29
        t3
        t30
        t31
        t32
        t33
        t34
        t35
        t36
        t37
        t38
        t39
        t4
        t40
        t41
        t42
        t43
        t44
        t45
        t46
        t48
        t49
        t47
        t5
        t50
        t51
        t6
        t7
        t8
        t9
    
      }
    }
    
    `,
    variables: {
      file: null
    }
  }


     var _map = {
      file: ["variables.file"]
    }


    var file =  $event.target.files[0];
var fd = new FormData()
fd.append('operations', JSON.stringify(operations))
fd.append('map', JSON.stringify(_map))
fd.append('file', file, file.name)


 var ret= await this.Logins1.Graphqlfiledata("query1", fd, file);


 const myJSON = JSON.stringify(ret);
 
 const obj = JSON.parse(myJSON);


 var outputFinal = obj["data"]["uploadFileExcel"];

 this.Attand=outputFinal;


 $('#example').DataTable().destroy();
 $(document).ready(function () {

   this.dtOptions = $('#example').DataTable({

     dom: 'Bfrtip',
     paging: true

   });

 });
}


async INSERT(
  files: File,
 
) {

  //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


  // let formData = new FormData();           
  // formData.append("file", files[0]);

console.log(files)
  let query = `
  mutation MyMutation($file:Upload) {
    __typename
    uploadFile(files: $file) {
      iD
      code
      message
      status
      detail
    },
    
variables: {
  file: null
}
  }
  
     
  
     `

   switch (this.ActionStatus)
   {
     case this.ActionStatus: "INSERT"
     query=query.replace("INSERT","INSERT");
     break;
     case this.ActionStatus: "UPDATE"
     query=query.replace("INSERT","UPDATE");
     break;
     case this.ActionStatus: "DELETE"
     query.replace("INSERT","DELETE");
     query=query.replace("INSERT","DELETE");
     break;


   }
  //query=  query.replace("INSERT","UPDATE");

  

  var datas = JSON.stringify({
    query, variables: {
      files,
      
    }
  });

  
  return null;
}
}
