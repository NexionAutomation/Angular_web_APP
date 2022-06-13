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
    
    
     console.log(this.login.TMUserMaster);
   
    
       
       // .join()


        // var result = this.rightsModule2
        //       .join(this.submodule, a => a.subModule_Id, b => b.rid)
             
        //       .toList();

              var result = this.submodule
              .join(this.rightsModule2, a => a.moduleId, b => b.subModule_Id)
              .where(s => s.left.moduleId == s.right.subModule_Id && s.right.cUser_Id==this.login.TMUserMaster.userCode )
              .toList();
    //.where(s => s.left.moduleId == s.right.rid )
     //this.persons=result;




  //    var result = 
  // // as Jon Skeet pointed out, OrderBy is useless here, I just leave it 
  // // show how to use OrderBy in a LINQ query
  // persons.OrderBy(mc => mc.SomePropToSortOn)
  //                  .ToDictionary(mc => mc.mo.ToString(), 
  //                                mc => mc.ValueProp.ToString(), 
  //                                );

  console.log(result);

     var array2= new Array(); 

     var array = new Array();

     this.submodule.toArray().forEach(element => {
    
    array2.push({
        name:  element.subModuleName ,
        path: element.navigationUrl
    });
});


//console.log(array2);
//or the shortcut: = []
for(var a=0;a<=0;a++)
{

  array.push (
    {
        name: 'User Master',
        path: ['/'],
        children:array2
    });
    
    
}

this.menu=array;

      }
}

//export const MENU =  datas
//const menu=

// export const MENU = [
//     {
//         name: 'Dashboard',
//         path: ['/'],
//         children:[]
//     },
//     {
//         name: 'Blank',
//         path: ['/blank'],
//         children:[]
//     },
//     {
//         name: 'Main Menu',
//         path: [],
//         children: [
//             {
//                 name: 'Sub Menu',
//                 path: ['/sub-menu-1']
//             },

//             {
//                 name: 'Blank',
//                 path: ['/sub-menu-2']
//             }
//         ]
//     },
//     {
//         name: 'User Management',
//         path: [],
//         children: [
//             {
//                 name: 'Create',
//                 path: ['/Create-Drawing']
//             },

//             {
//                 name: 'UserMaster',
//                 path: ['/UserMaster']
//             },
//             {
//                 name: 'CreateUser',
//                 path: ['/CreateUser']
//             },
//             {
//                 name: 'CreateUserRight',
//                 path: ['/CreateUserRight']
//             },
//             {
//                 name: 'CreateUserModule',
//                 path: ['/CreateUserModule']
//             },
//             {
//                 name: 'CreateUsersubmodule',
//                 path: ['/CreateUsersubmodule']
//             }

            
//         ]
//     },

   
// ];


// {
//     name: 'Drawing',
//     children: [
//         {
//             name: 'Create Drawing',
//             path: ['/Create-Drawing']
//         },

//         {
//             name: 'Update Drawing',
//             path: ['/Read-Drawing']
//         }
//     ]
// }
