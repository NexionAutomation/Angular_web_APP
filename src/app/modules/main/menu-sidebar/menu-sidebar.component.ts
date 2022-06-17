import { Logins } from '@/Model/Utility/login';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, CM_Web_UserRightsMaster, TmGroupMaster, TmUserMaster } from '@modules/Module/PoModules';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {concat, Observable} from 'rxjs';
import { Enumerable, List } from 'sharp-collections';

const BASE_CLASSES = 'main-sidebar elevation-4';
    var datas:any;

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu= new Array();

    submodule2: any;
  submodule: List<CMAdminSubModuleMaster>;
  GroupMaster: List<TmGroupMaster>;
  UserMaster: List<TmUserMaster>;
  CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  rightsModule2: List<CM_Web_UserRightsMaster>;
 
   // public menu = MENU;

    constructor(
        public appService: AppService,
        public login: Logins,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.login.user;
        this.LodeDataTable() ;
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
        var ss = await this.login.GraphqlFetchQuery("query", query);
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
    
var result = this.submodule
.join(this.rightsModule2, a => a.rid, b => b.subModuleId)
.where(s => s.left.rid == s.right.subModuleId ) //&& s.right.userCode==this.login.TMUserMaster.userCode
.toList();

    var da= result 
     .join(this.CMAdminModuleMasterUser, a => a.right.moduleId, b => b.rid)
.where(s => s.left.right.moduleId == s.right.rid   )// &&  s.left.right.userCode==this.login.TMUserMaster.userCode
.toList();
      
    
     var array2= new Array(); 

     var array = new Array();
     var array2 = new Array();

  
var mainmodule=da.groupBy(x=>x.right.moduleName).select(x=>x.first()).toArray();
var submodule1=da.groupBy(x=>x.left.left.subModuleName).select(x=>x.first()).toArray();

console.log(mainmodule);
console.log(submodule1);
submodule1.forEach(element => {
    
  
});

// this.submodule.toArray().forEach(element => {
    
//   array2.push({
//       name:  element.subModuleName ,
//       path: element.navigationUrl
//   });
// });

// for(var a=0;a<=mainmodule.length-1;a++)
// {
//   submodule1.forEach(element => {
    
//       if(element.right.moduleName==mainmodule[a].right.moduleName)
//       {
        
//         array2.push({
//           name:  element.left.left.subModuleName ,
//           path: element.left.left.navigationUrl
//       });

       

        

  
// }


//   });
 
  array.push (
    {
        name:'Dashboard' ,
        path: ['/'],
        children:[ {
          path: 'SearchPo',
          name:'SearchPoComponent'
      },
      {
          path: 'CreateCity',
          name:'CityMasterComponent'
      },
      {
          path: 'CreateCompany',
          name:'CompanymasterComponent'
      },
      {
          path: 'CreateCountryMaster',
          name:'CountrymasterComponent'
      },
      {
          path: 'CreateExpenseGroup',
          name:'ExpenseGroupComponent'
      },
      {
          path: 'CreateExpenseStatus',
          name:'ExpenseStatusTypeComponent'
      },
      {
          path: 'CreateExpenseType',
          name:'ExpenseTypeComponent'
      },
      {
          path: 'CreateFinanceYear',
          name:'FinanceYearComponent'
      },
      {
          path: 'CreateLeaveType',
          name:'LeaveTypeComponent'
      },
      {
          path: 'CreateLeaveSetting',
          name:'LeaveSettingComponent'
      },
      {
          path: 'CreateStateMaster',
          name:'StateMasterComponent'
      },
      {
          path: 'CreateSupplier',
          name:'SupplierMasterComponent'
      },]//array2
    });

//   // array.push (
//   //   {
//   //       name:mainmodule[a].right.moduleName ,
//   //       path: ['/'],
//   //       children:array2
//   //   });
    
// }

this.menu=array;

      }
}

