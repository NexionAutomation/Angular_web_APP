import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, CM_Web_UserRightsMaster, TmGroupMaster, TmUserMaster } from '@modules/Module/PoModules';
import { AppService } from '@services/app.service';
import { data, when } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { concat, Subject } from 'rxjs';
import { findIndex } from 'rxjs/operators';
import { Dictionary, Enumerable, List, ReadOnlyList } from 'sharp-collections';
import { UserModuleServicesService } from '../user-module-services.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { element } from 'protractor';
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
   array2= new Array();

  rightsModule2:List<CM_Web_UserRightsMaster>
  rightsModule5:[];
   Rights= new Array();
  array23= new Array();
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
      cMWebUserRightsMaster {
        canDelete
        canExport
        canSave
        canSearch
        canUpdate
        canView
        creationDate
        cuserId
        groupId
        modificationDate
        moduleId
        muserId
        rid
        subModuleId
        userCode
      }
    }
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }

  async INSERT(
    group_Id: number,
	 module_Id: number,
	 subModule_Id: number,
	 canView: boolean,
	 canSave: boolean,
	 canSearch: boolean,
	 canUpdate: boolean,
	 canDelete: boolean,
	 cUser_Id: number,
	 mUser_Id: number,
	 user_Code: number,
	 canExport: boolean,
	 rID: number,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `

    mutation MyMutation($group_Id: Int!, $module_Id: Int!, $subModule_Id: Int!, $canView: Boolean!, $canSave: Boolean!, $canSearch: Boolean!, $canUpdate: Boolean!, $canDelete: Boolean!, $cUser_Id: Int!, $mUser_Id: Int!, $user_Code: Int!, $canExport: Boolean!, $rID: Int!) {
      __typename
      cMWebUserRights(data: {detail: {
        groupId: $group_Id,
        moduleId: $module_Id,
        subModuleId: $subModule_Id,
        canView: $canView, 
        canSave: $canSave,
        canSearch: $canSearch,
        canUpdate: $canUpdate, 
        canDelete: $canDelete,
        creationDate: "2019-10-10",
        cuserId: $cUser_Id,
        muserId: $mUser_Id,
        userCode: $user_Code,
        canExport: $canExport,
        rid: $rID,
        modificationDate: "2019-10-10"
      }}, triger: "UPDATE") {
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
        group_Id,
	 module_Id,
	 subModule_Id,
	 canView,
	 canSave,
	 canSearch,
	 canUpdate,
	 canDelete,
	 cUser_Id,
	 mUser_Id,
	 user_Code,
	 canExport,
	 rID
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
    this.rightsModule2 = Enumerable.from(obj["data"]["cMWebUserRightsMaster"]).cast<CM_Web_UserRightsMaster>().toList();

console.log(this.rightsModule2);





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


    this.submodule2=null;
    this.ModuleMaster2 = Enumerable.from(this.submodule).where(x => x.moduleId == Number(event)).toList();
    this.submodule2 = this.ModuleMaster2;








console.log( this.array23 );
  }



  checkAllCheckBox(ev: any) {



    
    var data ="#"+ev.srcElement.id
    var ckbox = $(data);

    var element = document.getElementById(ev.srcElement.id);
    var datafetch=element.getAttribute('value');

    var element2 = document.getElementById("Delete,4");
    





    var table = $('#example').DataTable();




var splitted = datafetch.toString().split(",");




var splitdata=splitted;


// switch (splitdata[0])
// {
//   case splitdata[0]:"Create"
//   this.array2.push({ canCreate:1})
//   break;
//   case splitdata[0]:"Update"
//   this.array2.push({ canUpdate:1})
//   break;
//   case splitdata[0]:"Delete"
//   this.array2.push({ canDelete:1})
//   break;
//   case splitdata[0]:"Show"
//   this.array2.push({ canshow:1})
//   break;
//   case splitdata[0]:"ImportExcel"
//   this.array2.push({ canExport:1})
//   break;
//   case splitdata[0]:"ImportExcel"
//   this.array2.push({ canImportExcel:1})
//   break;
//   case splitdata[0]:"Save"
//   this.array2.push({ canSave:1})
//   break;

// }



        this.finddata=this.submodule2.where(a=>a.rid==datafetch);



      // ...use `element`...



    console.log(this.finddata.toList());
     if ((ev.target || ev.srcElement).checked){

      //document.getElementById("Delete,4").setAttribute('checked', 'checked');




      this.Rights.push(
        {
          groupID: Number(this.loginFormRights.get('ddlGroup_Id').value),
          moduleID:Number(this.loginFormRights.get('lstModules').value),
          userID:Number(this.loginFormRights.get('lstUsers').value),
          key:splitdata[1],
          Status:splitdata,

        }
      );

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
  submitData(){
   
  var Finddata= Enumerable.from( this.rightsModule2).where(x=>x.group_Id== Number(this.loginFormRights.get('ddlGroup_Id').value) 
  && x.user_Code==Number(this.loginFormRights.get('lstUsers').value) && x.module_Id==Number(this.loginFormRights.get('lstModules').value) );
  if(Finddata.any())
  {




alert("hello");


  }
  else{

    console.log(Dataf);

    var  Dataf=new Array();
    Dataf.push( this.Rights);
   var co=0;
   console.log(Dataf);

   Dataf.forEach(element => {
  //alert("a");
});

var df=Enumerable.from(Dataf).toList();

for(var t=0;t<=this.Rights.length;t++)
{

  this.INSERT(
    this.Rights[t].groupID,
    this.Rights[t].moduleID,
    Number(this.Rights[t].key),
    this.Rights[t].Status[0]=="Create"?true:false,
    this.Rights[t].Status[0]=="Save"?true:false,
    this.Rights[t].Status[0]=="Search"?true:false,
    this.Rights[t].Status[0]=="Update"?true:false,
    this.Rights[t].Status[0]=="Delete"?true:false,
    this.Logins1.TMUserMaster.userCode,
    this.Logins1.TMUserMaster.userCode,
    this.Rights[t].userID,
    this.Rights[t].Status[0]=="ExportExcel"?true:false,
    0


  )


}

  //  Dataf.forEach(element=>{



  //     this.INSERT(
  //       element[co].groupID,
  //       element[co].moduleID,
  //       Number(element[co].key),
  //       element[co].Status[0]=="Create"?true:false,
  //       element[co].Status[0]=="Save"?true:false,
  //       element[co].Status[0]=="Search"?true:false,
  //       element[co].Status[0]=="Update"?true:false,
  //       element[co].Status[0]=="Delete"?true:false,
  //       this.Logins1.TMUserMaster.userCode,
  //       this.Logins1.TMUserMaster.userCode,
  //       element[co].userID,
  //       element[co].Status[0]=="ExportExcel"?true:false,
  //       0


  //     )




  //    // co+1
  //     });
    //---- create data
  }

   
  }

  ngOnDestroy(): void {


    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }
}
