import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, RightsModule, TmGroupMaster, TmUserMaster } from '@modules/Module/PoModules';
import { AppService } from '@services/app.service';
import { when } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { concat, Subject } from 'rxjs';
import { findIndex } from 'rxjs/operators';
import { Dictionary, Enumerable, List, ReadOnlyList } from 'sharp-collections';
import { UserModuleServicesService } from '../user-module-services.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-create-user-rights',
  templateUrl: './create-user-rights.component.html',
  styleUrls: ['./create-user-rights.component.scss']
})
export class CreateUserRightsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  todos: List<CMAdminSubModuleMaster>;
  UserMaster2: any;
  ModuleMaster2: any;
  public loginFormRights: FormGroup;

  submodule2: any;
  submodule: List<CMAdminSubModuleMaster>;
  GroupMaster: List<TmGroupMaster>;
  UserMaster: List<TmUserMaster>;
  CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  products: any;
   finddata:any;
  ActionStatus: any;

  rightsModule2:List<RightsModule>
  rightsModule5:any;
  constructor(private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,) {

  }

  ngOnInit(): void {
    this.LodeDataTable();

    this.loginFormRights = new FormGroup({
      ddlGroup_Id: new FormControl(),
      lstUsers: new FormControl(),
      lstModules: new FormControl()
      // NavigationUrl: new FormControl(null),
      // SubModuleTarget: new FormControl(null),
    });

   
    

  }

  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      pOTmGroupMasters {
        groupName
        creationDate
        cuserId
        modificationDate
        muserId
        groupId
        rid
      }
      pOTmUserMasters {
        userName
        userId
        upassword
        emailId
        mobileNo
        groupId
        accountStatus
        fromTime
        fromTimeAmPm
        toTime
        toTimeAmPm
        userImage
        creationDate
        cuserId
        modificationDate
        muserId
        recordstatus
        reasonForDeletion
        deletedDate
        duserCode
        userCode
        lastLoginDateTime
        reportingManager
        rid
      }
      cMTmAdminSubModuleMasters {
        creationDate
        cuserId
        modificationDate
        muserId
        moduleId
        navigationUrl
        rid
        subModuleId
        subModuleName
        subModuleOrder
        targetModule
      }
      cMTmAdminModuleMasters {
        creationDate
        modificationDate
        cuserId
        moduleId
        moduleName
        moduleOrder
        muserId
        rid
      }
    }
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

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

  async LodeDataTable() {

    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);






    this.submodule = Enumerable.from(obj["data"]["cMTmAdminSubModuleMasters"]).cast<CMAdminSubModuleMaster>().toList();
    this.GroupMaster = Enumerable.from(obj["data"]["pOTmGroupMasters"]).cast<TmGroupMaster>().toList();
    this.UserMaster = Enumerable.from(obj["data"]["pOTmUserMasters"]).cast<TmUserMaster>().toList();
    this.CMAdminModuleMasterUser = Enumerable.from(obj["data"]["cMTmAdminModuleMasters"]).cast<CMAdminModuleMasterUser>().toList();







    $('#example1').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example1').DataTable({

        dom: 'Bfrtip'




      });



    });

  }
  onSubmit() {

  }
  onchange(event: Event) {

    this.UserMaster2 = Enumerable.from(this.UserMaster).where(x => x.groupId == Number(event)).toList();

  }
  onchangeModule(event: Event) {

    
    
    this.ModuleMaster2 = Enumerable.from(this.submodule).where(x => x.moduleId == Number(event)).toList();
    this.submodule2 = this.ModuleMaster2;
    

    
   this.rightsModule2.add ( {

   
     groupID: Number(this.loginFormRights.get('ddlGroup_Id').value),
   moduleID:Number(this.loginFormRights.get('lstModules').value),
    userID:Number(this.loginFormRights.get('lstUsers').value),
   canCreate:null,
   canDelete:null,
   canExport:null,
   canImportExcel:null,
   canUpdate:null,
   canshow:null

    });
    // this.RightsModule.groupID= this.loginFormRights.get('ddlGroup_Id').value;
    // this.RightsModule.moduleID=this.loginFormRights.get('lstModules').value;
    // this.RightsModule.userID=this.loginFormRights.get('lstUsers').value;
   
console.log( this.rightsModule2.toList() );
  }



  checkAllCheckBox(ev: any) {

  
    
    console.log(ev.srcElement.id);
    var data ="#"+ev.srcElement.id
    var ckbox = $(data);

    var element = document.getElementById(ev.srcElement.id);
    var datafetch=parseInt( element.getAttribute('value'));
    var element2 = document.getElementById("Delete,4");
    console.log(element);
    console.log(this.submodule.count());


    var table = $('#example').DataTable();
 
console.log(table.row( 0 ).data() );

   
        
        this.finddata=this.submodule2.where(a=>a.rid==datafetch);
     
      // ...use `element`...



    console.log(this.finddata.toList());
     if ((ev.target || ev.srcElement).checked){  
     
      document.getElementById("Delete,4").setAttribute('checked', 'checked');
     
     alert("Yes")

    }
     else   {
      
      alert("No")
     }  
        // $('input').on('click',function () {
        //     if (element.ariaChecked) {
        //         alert('You have Checked it');
        //     } else {
        //         alert('You Un-Checked it');
        //     }
        // });
	//	this.submodule2.forEach(x => x.checked = ev.target.checked)
	}

	isAllCheckBoxChecked() {
		return this.submodule2.every(p => p.checked);
	}
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }
}
