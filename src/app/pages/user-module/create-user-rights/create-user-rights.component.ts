import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, TmGroupMaster, TmUserMaster } from '@modules/Module/PoModules';
import { AppService } from '@services/app.service';
import { when } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { findIndex } from 'rxjs/operators';
import { Enumerable, List, ReadOnlyList } from 'sharp-collections';
import { UserModuleServicesService } from '../user-module-services.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-create-user-rights',
  templateUrl: './create-user-rights.component.html',
  styleUrls: ['./create-user-rights.component.scss']
})
export class CreateUserRightsComponent implements OnInit {

  dtOptions:DataTables.Settings = {};
  persons: any ;
  persons1: any ;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  todos: List<CMAdminSubModuleMaster>;
  UserMaster2:any;
  public loginFormRights: FormGroup;


   submodule: List<CMAdminSubModuleMaster>;
     GroupMaster: List<TmGroupMaster>;
     UserMaster: List<TmUserMaster>;
     CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  constructor(private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_:UserModuleServicesService,
    private Logins1:Logins,
    private http:HttpClient,) { 
    
  }

  ngOnInit(): void {
    this.LodeDataTable();
    
    this.loginFormRights = new FormGroup({
      ddlGroup_Id: new FormControl(null),
      lstUsers: new FormControl(null),
      lstModules: new FormControl(null)
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
  
  async LodeDataTable()
  {
    
    var data= await this.GETData("","");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);


  
    
   
   
 this.submodule =Enumerable.from(obj["data"]["cMTmAdminSubModuleMasters"]).cast<CMAdminSubModuleMaster>().toList();
 this.GroupMaster =Enumerable.from(obj["data"]["pOTmGroupMasters"]).cast<TmGroupMaster>().toList();
 this.UserMaster =Enumerable.from(obj["data"]["pOTmUserMasters"]).cast<TmUserMaster>().toList();
 this.CMAdminModuleMasterUser =Enumerable.from(obj["data"]["cMTmAdminModuleMasters"]).cast<CMAdminModuleMasterUser>().toList();

 
   
    


  
    $('#example1').DataTable().destroy();
    $(document).ready(function () {
    
      this.dtOptions= $('#example1').DataTable({
    
        dom: 'Bfrtip'
      
        


      });
      
      

    });
      
  }
  onSubmit()
  {

  }
  onchange( event:Event)
  {
  
     this.UserMaster2 =Enumerable.from(this.UserMaster).where(x=>x.groupId== Number(event) ).toList();
console.log(this.UserMaster);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }
}
