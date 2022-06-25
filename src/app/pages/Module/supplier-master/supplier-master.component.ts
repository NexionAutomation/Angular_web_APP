import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, Tm_supplierMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-master',
  templateUrl: './supplier-master.component.html',
  styleUrls: ['./supplier-master.component.scss']
})
export class SupplierMasterComponent implements OnInit {

   
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;



ActionStatus:any;
  public loginForm: FormGroup;
  CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  cMTmAdminSubModuleMasters: List<CMAdminSubModuleMaster>;
  Tm_supplierMaster: List<Tm_supplierMaster>;
  ActionFlag= 0;
  editData: any;
  editDataID: any;
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
      txtsuppliername: new FormControl(null),
      txtCaddress1: new FormControl(null),
      txtCaddress2: new FormControl(null),
      txtCaddress3: new FormControl(null),
      txtcontactperson: new FormControl(null),
      MobileNo: new FormControl(null),
      gst: new FormControl(null),
    });


    this.LodeDataTable();

  }

  

  async INSERT(
   
supplierName: String,
address1: String,
address2: String,
address3: String,
contactPerson: String,
cmobileNo: String,
gst: String,
recordStatus: String,

cuserId: number,

muserId: number,
id: number,
    targetModule: string,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($id: Int
      $supplierName: String
      $address1: String
      $address2: String
      $address3: String
      $contactPerson: String
      $cmobileNo: String
      $gst: String
      $recordStatus: String
      
      $cuserId: Int
      
      $muserId: Int) {
      __typename
      cMSupplierMaster(triger: "${targetModule}", data: {detail: 
        {address1: $address1,
          address2: $address2,
          address3: $address3, 
          cmobileNo: $cmobileNo, 
          contactPerson: $contactPerson,
          creationDate: "2019-10-10",
          cuserId: $cuserId,
          gst: $gst, 
          id: $id,
          modificationDate: "2019-10-10",
          muserId: $muserId,
          recordStatus: $recordStatus, 
          supplierName:$supplierName}, iD: "${id}"}) {
        code
        detail
        iD
        message
        status
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
        supplierName,
        address1,
        address2,
        address3,
        contactPerson,
        cmobileNo,
        gst,
        recordStatus,
        
        cuserId,
        
        muserId,
        id
        
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
      pOTmSupplierMasters {
        id
        address1
        address3
        address2
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

    //this.persons = obj["data"]["cMTmAdminSubModuleMasters"]



    this.Tm_supplierMaster = Enumerable.from(obj["data"]["pOTmSupplierMasters"]).cast<Tm_supplierMaster>().toList();

     this.persons=this.Tm_supplierMaster;
    
   
    $('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: true



      });



    });





  }

  ddlModule(event: Event) {

    //this.UserMaster2 = Enumerable.from(this.UserMaster).where(x => x.groupId == Number(event)).toList();
 console.log(event);
  }

  Edit(event :Event)
  {
alert (event)
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


        var output = 
        await this.INSERT(
          "supplierName",
"address1",
"address2",
"address3",
"contactPerson",
"cmobileNo",
"gst",
"recordStatus",

1,

1,
0,
 "INSERT");

             



          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);
      
          var outputFinal = obj["data"]["cMSupplierMaster"];
    


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


      var output = await this.INSERT(
        "supplierName",
"address1",
"address2",
"address3",
"contactPerson",
"cmobileNo",
"gst",
"recordStatus",

1,

1,
Number(this.editDataID),
"UPDATE");

        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMSupplierMaster"];
  


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


      var output = 
      await this.INSERT(
        "supplierName",
"address1",
"address2",
"address3",
"contactPerson",
"cmobileNo",
"gst",
"recordStatus",

1,

1,
Number(string),
"DELETE");
      const myJSON = JSON.stringify(output);
      const obj = JSON.parse(myJSON);
  
      var outputFinal = obj["data"]["cMSupplierMaster"];

     
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
          this.LodeDataTable();

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

async onReset()
{
this.loginForm.reset();
this.ActionFlag=0;
}

async onedit(string:string)
{

  this.editDataID=string;
this.editData= this.persons.where(x=>x.id==Number(string)).singleOrDefault();

this.loginForm .setValue({
  txtsuppliername: this.editData.supplierName,
  txtCaddress1: this.editData.address1,
  txtCaddress2: this.editData.address2,
  txtCaddress3: this.editData.address3,
  txtcontactperson: this.editData.contactPerson,
  MobileNo:this.editData.cmobileNo,
  gst: this.editData.gst,
});
this.ActionFlag=1;





}

//----------------------------------CURD OPERATIONS-------------------------------------------------------------

}
