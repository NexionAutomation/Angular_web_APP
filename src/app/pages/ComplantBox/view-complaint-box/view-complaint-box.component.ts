import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TM_CompanyMaster, TM_CountryMaster, TM_PurchaseHead, Tm_supplierMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-complaint-box',
  templateUrl: './view-complaint-box.component.html',
  styleUrls: ['./view-complaint-box.component.scss']
})
export class ViewComplaintBoxComponent implements OnInit {

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
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  //CM_AdminModuleMaster: CM_AdminModuleMaster;


  public loginForm: FormGroup;
  POTmSupplierMasters: Enumerable<Tm_supplierMaster>;
  POTmCompanyMasters: Enumerable<TM_CountryMaster>;
  pOTmPurchaseHeads: Enumerable<any>;
  POTmCompanyMasters1: Enumerable<TM_CompanyMaster>;
  public PurchaseHead: TM_PurchaseHead;
  editData: any;
  userMasterData: Enumerable<any>;
 
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

  async INSERT(
    
rid: number,
    ActionStatus:string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($expenseId: Long!
      ) {
        __typename
        cmComplaintBoxHead(data: {detail: {expenseId: $expenseId}}, triger: "DELETE") {
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
        expenseId:rid
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      cmComplaintBoxHead {
        createdBy
        createdOn
        description
        expenseId
        status
        tokennumber
        updateBy
        updateOn
      }
      userMasterData {
        rid
        reportingManager
        userName
        userCode
        accountStatus
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

    this.pOTmPurchaseHeads = Enumerable.from( obj["data"]["cmComplaintBoxHead"]).cast<any>();
    
    this.userMasterData = Enumerable.from( obj["data"]["userMasterData"]).cast<any>();
    
   var result = this.pOTmPurchaseHeads
    .join(this.userMasterData, a => a.createdBy, b => b.userCode)
    .where(s => s.left.userCode == s.right.createdBy  ) //&& s.right.userCode==this.login.TMUserMaster.userCode
    .toList();

    
    this.persons= result.take(200);
    
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


          // var output = await this.INSERT(0,
          //   this.loginForm.get('txtModuleName').value,
          //   this.loginForm.get('txtModuleOrder').value,
          //   this.Logins1.TMUserMaster.userCode
          //   , 0, 0,"INSERT");


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


     var output =null;
     
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

        
        var output = await this.INSERT( parseInt( string),"DELETE");
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cmComplaintBoxHead"];

       
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
  this.PurchaseHead=Enumerable.from( this.persons).cast<any>().where(x=>x.pOId==Number(string)).singleOrDefault();
  
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
