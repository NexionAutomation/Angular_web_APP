import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, TM_CompanyMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companymaster',
  templateUrl: './companymaster.component.html',
  styleUrls: ['./companymaster.component.scss']
})
export class CompanymasterComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;



ActionStatus:any;
  public loginForm: FormGroup;
  CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  pOTmCompanyMasters: List<TM_CompanyMaster>;
 
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
      ddlModule: new FormControl(null),
      SubModuleName: new FormControl(null),
      SubModuleOrder: new FormControl(null),
      NavigationUrl: new FormControl(null),
      SubModuleTarget: new FormControl(null),
    });


    this.LodeDataTable();

  }

  async onSubmit() {



    console.log(this.loginForm);
    this.ActionStatus="INSERT";
    var output = await this.INSERT(
       parseInt( this.loginForm.get('ddlModule').value),
      1,
      this.loginForm.get('SubModuleName').value,
      this.Logins1.TMUserMaster.userCode,
      this.Logins1.TMUserMaster.userCode,
      this.loginForm.get('SubModuleOrder').value,
      this.loginForm.get('NavigationUrl').value,
      0,
      this.loginForm.get('SubModuleTarget').value,
    );
    this.ActionStatus="";
    const myJSON = JSON.stringify(output);
    const obj = JSON.parse(myJSON);
    const status = obj["data"]["cMTmAdminModuleMasters"];

    if (status[0].message == "Success") {
      const { value: showConfirmButton } = await Swal.fire({
        title: 'success',
        icon: 'success',
        html: '<div class="alert alert-success" role="alert">Data Create Successfully</div>',

        showConfirmButton: true,
        showCancelButton: true
      })


      if (showConfirmButton == true) {
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
      }

    }

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
    let query = `
    query MyQuery {
      __typename
      pOTmCompanyMasters {
        caddress1
        caddress2
        caddress3
        cemailId
        companyName
        cmobileNo
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
        igst
        imobileNo
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

    

    const enumerable = Enumerable.from(this.persons).asEnumerable();
    this.pOTmCompanyMasters = Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<TM_CompanyMaster>().toList();
 // or List.from(data)
   



    // var result = this.cMTmAdminSubModuleMasters
    // .join(this.CMAdminModuleMasterUser, a => a.moduleId, b => b.rid)
    // .where(s => s.left.moduleId == s.right.rid )
    // .toList();
     this.persons= this.pOTmCompanyMasters;
    
   
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

}
