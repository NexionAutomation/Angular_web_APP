import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, TM_CountryMaster, TM_StateMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.scss']
})
export class StateMasterComponent implements OnInit {

   
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
  TM_StateMaster: List<TM_StateMaster>;
  TM_CountryMaster: List<TM_CountryMaster>;
  ActionFlag=0;
  editData: any;
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
      ddlcountry: new FormControl(null),
      txtstatename: new FormControl(null),
      txtdisplayas: new FormControl(null),
      
    });


    this.LodeDataTable();

  }

 
  async INSERT(
    module_Id: number,
    subModule_Id: number,
    subModuleName: string,
    cUser_Id: number,
    mUser_Id: number,
    subModuleOrder: number,
    navigationUrl: string,
    rID: number,
    targetModule: string,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($module_Id: Int!,
    $subModule_Id: Int!,
    $subModuleName: String,
    $cUser_Id: Int!,
    $mUser_Id: Int!,
    $subModuleOrder: Int!,
    $navigationUrl: String, 
    $rID: Int!
    $targetModule:String) {
    __typename
    cMTmAdminSubModuleMasters(data: {detail: {moduleId: $module_Id, 
      subModuleId: $subModule_Id,
      creationDate: "2019-10-10",
      cuserId: $cUser_Id,
      modificationDate: "2019-10-10",
      muserId: $mUser_Id, 
      subModuleOrder: $subModuleOrder,
      rid: $rID, 
      subModuleName: $subModuleName, 
      targetModule:$targetModule,
      navigationUrl: $navigationUrl}}, triger: "INSERT") {
      iD
      code
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
        module_Id,
        subModule_Id,
        subModuleName,
        cUser_Id,
        mUser_Id,
        subModuleOrder,
        navigationUrl,
        rID,
        targetModule,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
      pOTmStateMasters {
        statename
        displayAs
        deleted
        editable
        countrycode
        creationdate
        modificationdate
        statecode
        usercode
      }
      pOTmCountryMasters {
        countryname
        displayAs
        creationdate
        modificationdate
        usercode
        deleted
        editable
        countrycode
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




    const enumerable = Enumerable.from(this.persons).asEnumerable();
    this.TM_StateMaster = Enumerable.from(obj["data"]["pOTmStateMasters"]).cast<TM_StateMaster>().toList();
 // or List.from(data)
    this.TM_CountryMaster = Enumerable.from(obj["data"]["pOTmCountryMasters"]).cast<TM_CountryMaster>().toList();


console.log(this.TM_CountryMaster);

    var result = this.TM_StateMaster
    .join(this.TM_CountryMaster, a => a.cOUNTRYCODE, b => b.cOUNTRYCODE)
    .where(s => s.left.cOUNTRYCODE == s.right.cOUNTRYCODE )
    .toList();
    
     this.persons=result;
    
   
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


          var output = null;
          // await this.INSERT(0,
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


        var output = null;//await this.INSERT( 0,"0",0,0,0,Number(string),"DELETE");
    
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
  alert(string);
  console.log(this.persons)
  this.editData= this.persons.where(x=>x.left.statecode==Number(string)).singleOrDefault();
  
  console.log(this.editData)
  // this.loginForm.setValue({
  //   txtModuleName: this.editData.moduleName,
  //   txtModuleOrder:this.editData.moduleOrder,

  // });
  this.loginForm = new FormGroup({
    ddlcountry: this.editData.right.countryname,
    txtstatename: this.editData.left.statename,
    txtdisplayas: this.editData.left.displayAs,

   
    
  });
  this.ActionFlag=1;
}

//----------------------------------CURD OPERATIONS-------------------------------------------------------------


}
