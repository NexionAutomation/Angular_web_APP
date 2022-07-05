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
import { join } from 'path';
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
  finddata: any;
  ActionStatus: any;
  array2 = new Array();

  rightsModule2: List<CM_Web_UserRightsMaster>
  rightsModule5: [];
  Rights = new Array();
  array23 = new Array();
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
    Action: string,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `
    mutation MyMutation(
      
        $group_Id: Int!,
        $module_Id: Int!,
        $subModule_Id: Int!,
        $canView: Boolean!,
        $canSave: Boolean!,
        $canSearch: Boolean!,
        $canUpdate: Boolean!,
        $canDelete: Boolean!,
        $cUser_Id: Int!,
        $mUser_Id: Int!,
        $user_Code: Int!,
        $canExport: Boolean!,
        $rID: Int!
      
    ) {
      __typename
      cMWebUserRights(triger: "${Action}", data: 
        {detail: {
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
        }, iD: "${rID}"}) {
        code
        detail
        iD
        message
        status
      }
    }
    
       `
       this.ActionStatus=Action;
    switch (this.ActionStatus) {
      case this.ActionStatus: "INSERT"
        query = query.replace("INSERT", "INSERT");
        break;
      case this.ActionStatus: "UPDATE"
        query = query.replace("INSERT", "UPDATE");
        break;
      case this.ActionStatus: "DELETE"
        query.replace("INSERT", "DELETE");
        query = query.replace("INSERT", "DELETE");
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
    this.submodule2 = null;
    this.ModuleMaster2 = Enumerable.from(this.submodule).where(x => x.moduleId == Number(event)).toList();
    this.submodule2 = this.ModuleMaster2;

    // var rights = Enumerable.from(this.rightsModule2).where(x => x.userCode == Number(this.loginFormRights.get('lstUsers').value)).toList();


    // var result =  this.submodule2
    // .join(rights, a => a.user_Code, b => b.user_Code)
    // .where(s => s.left.userCode == s.right.userCode && s.left.moduleId == s.right.moduleId 
    // &&    s.left.groupId== s.right.groupId)
    // .toList();
    //  this.persons=result;


    




    // console.log(result);

    // console.log( this.submodule2);







    //console.log(this.array23);
  }



  checkAllCheckBox(ev: any) {


    var rights = Enumerable.from(this.rightsModule2).where(x => x.userCode == Number(this.loginFormRights.get('lstUsers').value)).toList();

    console.log();
    // document.getElementById("Delete,4").setAttribute('checked', true);
    //document.getElementById("Create,1").setAttribute('checked', 'checked');
    if (rights.any()) {
      var data = rights.toArray()
      console.log(rights);
      for (var a = 0; a <= data.length; a++) {


        // $(this).parent().find('input[type="checkbox"]').prop('checked', true);

        //$(this).parent().find('input[type="checkbox"]').prop('checked', true);
        if (data[a].canView == true) {
          document.getElementById("Create," + data[a].subModuleId + "").setAttribute('checked', 'checked')
        } if (data[a].canUpdate == true) {
          document.getElementById("Update," + data[a].subModuleId + "").setAttribute('checked', 'checked')
        } if (data[a].canDelete == true) {
          document.getElementById("Delete," + data[a].subModuleId + "").setAttribute('checked', 'checked')

        }
        if (data[a].canSave == true) {
          document.getElementById("Save," + data[a].subModuleId + "").setAttribute('checked', 'checked')
        }
        //data[a].canView==true?document.getElementById("Create,1").setAttribute('checkbox', 'checked'):document.getElementById("Create,1").removeAttribute('checked');
        // data[a].canUpdate==true?document.getElementById("Update,"+data[a].subModuleId+"").setAttribute('checked', 'checked'):'';
        // data[a].canDelete==true?document.getElementById("Delete,"+data[a].subModuleId+"").setAttribute('checked', 'checked'):"";
        //  //rights[a].canshow==true?document.getElementById("Show,"+rights[a].subModuleId+"").setAttribute('checked', 'checked'):"";
        // //   // rights[a].canImportExcel==true?document.getElementById("ImportExcel,"+rights[a].subModuleId+"").setAttribute('checked', 'checked'):"";
        //    data[a].canSave==true?document.getElementById("Save,"+data[a].subModuleId+"").setAttribute('checked', 'checked'):"";





      }

      this.submodule2 = this.submodule2;
      console.log(data);


    }
    //	this.submodule2.forEach(x => x.checked = ev.target.checked)
  }

  isAllCheckBoxChecked() {
    return this.submodule2.every(p => p.checked);
  }
  async submitData() {
    var rit = new Array();
    var groupID = Number(this.loginFormRights.get('ddlGroup_Id').value);
    var moduleID = Number(this.loginFormRights.get('lstModules').value);
    var userID = Number(this.loginFormRights.get('lstUsers').value);
    var someObj = new Array();
    //this.submodule2 = null;
    var splitted = null;
    var splitdata = null;
    var datafetch = null;

    this.finddata = this.submodule2.where(a => a.rid == datafetch);
    $("input:checkbox").each(function () {
      if ($(this).is(":checked")) {
        var data = "#" + $(this).attr("id")
        var element = document.getElementById($(this).attr("id"));
        datafetch = element.getAttribute('value');
        var element2 = document.getElementById("Delete,4");
        var table = $('#example').DataTable();
        splitted = datafetch.toString().split(",");
        var splitdata = splitted;

        rit.push(
          {
            groupID: groupID,
            moduleID: moduleID,
            userID: userID,
            key: splitdata[1],
            Status: splitdata,

          });

        //someObj.push($(this).attr("id"));
      }
    });

    this.Rights = rit;
    console.log(someObj);

    var Finddata = Enumerable.from(this.rightsModule2).where(x => x.groupId == Number(this.loginFormRights.get('ddlGroup_Id').value)
      && x.userCode == Number(this.loginFormRights.get('lstUsers').value) && x.moduleId == Number(this.loginFormRights.get('lstModules').value));

    var Dataf = new Array();
    Dataf.push(this.Rights);
    var co = 0;


    Dataf.forEach(element => {
      //alert("a");
    });

    var df = Enumerable.from(Dataf).toList();

    for (var t = 0; t <= 1; t++) {
      if(t==0)
      {

        
          this.INSERT(
            this.Rights[t].groupID,
            this.Rights[t].moduleID,
            Number(this.Rights[t].key),
            this.Rights[t].Status[0] == "Create" ? true : false,
            this.Rights[t].Status[0] == "Save" ? true : false,
            this.Rights[t].Status[0] == "Search" ? true : false,
            this.Rights[t].Status[0] == "Update" ? true : false,
            this.Rights[t].Status[0] == "Delete" ? true : false,
            this.Logins1.TMUserMaster.userCode,
            this.Logins1.TMUserMaster.userCode,
            this.Rights[t].userID,
            this.Rights[t].Status[0] == "ExportExcel" ? true : false,
            Number(this.loginFormRights.get('lstModules').value),
      "DELETE"
          )
          
     
     
    }
    }
   

    for (var t = 0; t <= this.Rights.length; t++) {

        //------------------------delete----------------
       
        //-------------------end delete------------------------

        
          await this.INSERT(
            this.Rights[t].groupID,
            this.Rights[t].moduleID,
            Number(this.Rights[t].key),
            this.Rights[t].Status[0] == "Create" ? true : false,
            this.Rights[t].Status[0] == "Save" ? true : false,
            this.Rights[t].Status[0] == "Search" ? true : false,
            this.Rights[t].Status[0] == "Update" ? true : false,
            this.Rights[t].Status[0] == "Delete" ? true : false,
            this.Logins1.TMUserMaster.userCode,
            this.Logins1.TMUserMaster.userCode,
            this.Rights[t].userID,
            this.Rights[t].Status[0] == "ExportExcel" ? true : false,
            0,
            "INSERT"
    
          )
      
       
        
        

     

    }


  }

  ngOnDestroy(): void {


    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }
}
