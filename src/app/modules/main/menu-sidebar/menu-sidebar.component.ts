import { Logins } from '@/Model/Utility/login';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, CM_Web_UserRightsMaster, TmGroupMaster, TmUserMaster } from '@modules/Module/PoModules';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {concat, Observable} from 'rxjs';
import { Dictionary, Enumerable, List } from 'sharp-collections';

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
        
        this.rightsModule2 =this.rightsModule2.where(x=>x.userCode==this.login.TMUserMaster.userCode).toList();
       
var result = this.submodule
.join(this.rightsModule2, a => a.rid, b => b.subModuleId)
.where(s => s.left.rid == s.right.subModuleId  ) //&& s.right.userCode==this.login.TMUserMaster.userCode
.toList();

    var da= result 
     .join(this.CMAdminModuleMasterUser, a => a.right.moduleId, b => b.rid)
.where(s => s.left.right.moduleId == s.right.rid   )
.where(s => s.left.right.canSave != true  )// &&  s.left.right.userCode==this.login.TMUserMaster.userCode
.toList();
      

    
     var array2= new Array(); 

     var array = new Array();
     var array2 = new Array();

  

var submodule1=da.toLookup(x=>x.right.moduleName).select(x=>x).toArray();
var submodule2=da.groupBy(x=>x.left.left.moduleId ).select(x=>x).toList();
// var submodule2=da.groupBy(x=>x.left.left.cuserId).select(x=>x.first()).toArray();








const nams=new Array();

submodule1.forEach(element => {
    
    var Pat=new Array();
    
    element.toArray().forEach(ele=>{

  
        
    
    
        Pat.push({
      name:  ele.left.left.subModuleName,
      path:  ele.left.left.navigationUrl
  });


        
        }
        );


    array.push (
        {
            name:element.key,
            path: ['/'],
            children:Pat
        });

       

})



//   array.push (
//     {
//         name:'Dashboard' ,
//         path: ['/'],
//         children:[  {
//           path: 'profile',
//           name: " Profile"
//       },
//       {
//           path: 'blank',
//           name: " Blank"
//       },
//       {
//           path: 'sub-menu-1',
//           name: " SubMenu"
//       },
//       {
//           path: 'sub-menu-2',
//           name: " Blank"
//       },
//       {
//           path: 'Create-Drawing',
//           name: " CreateDrawingQrcode"
//       },
//       {
//           path: 'Read-Drawing',
//           name: " ReadDrawingQrcode"
//       },
    
//       {
//           path: 'UserGroup',
//           name: " UserGroupMaster"
//       },
//       {
//           path: 'CreateUser',
//           name: " CreateUserMaster"
//       },
//       {
//           path: 'CreateUserRight',
//           name: " CreateUserRights"
//       },
//       {
//           path: 'CreateUserModule',
//           name: " CreateModulemaster"
//       },
//       {
//           path: 'CreateUsersubmodule',
//           name: " CreateSubModulemaster"
//       },

//       {
//           path: 'CreateExpense',
//           name: " ExpenseEmp"
//       },
//       {
//           path: 'ApprovedExpense',
//           name: " ExpenseManager"
//       },
//       {
//           path: 'AccountExpense',
//           name: " ExpenseAccount"
//       },
//       {
//           path: 'Upode',
//           name: " UplodeFile"
//       },
//       {
//           path: 'CreatePo',
//           name: " CreatePO"
//       },
//       {
//           path: 'SearchPo',
//           name: " SearchPo"
//       },
//       {
//           path: 'CreateCity',
//           name: " CityMaster"
//       },
//       {
//           path: 'CreateCompany',
//           name: " Companymaster"
//       },
//       {
//           path: 'CreateCountryMaster',
//           name: " Countrymaster"
//       },
//       {
//           path: 'CreateExpenseGroup',
//           name: " ExpenseGroup"
//       },
//       {
//           path: 'CreateExpenseStatus',
//           name: " ExpenseStatusType"
//       },
//       {
//           path: 'CreateExpenseType',
//           name: " ExpenseType"
//       },
//       {
//           path: 'CreateFinanceYear',
//           name: " FinanceYear"
//       },
//       {
//           path: 'CreateLeaveType',
//           name: " LeaveType"
//       },
//       {
//           path: 'CreateLeaveSetting',
//           name: " LeaveSetting"
//       },
//       {
//           path: 'CreateStateMaster',
//           name: " StateMaster"
//       },
//       {
//           path: 'CreateSupplier',
//           name: " SupplierMaster"
//       },
//       {
//         path: 'CreateExpOutView',
//         name: "Expense OutStation View"
//     },


  array.push (
    {
        name:'Dashboard Rights' ,
        path: ['/'],
        children:[  {
          path: '/CreateUserRight',
          name: "User Rights"
      }]
    }
  )


this.menu=array;

      }
}

