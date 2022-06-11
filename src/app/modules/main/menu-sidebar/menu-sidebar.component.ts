import { Logins } from '@/Model/Utility/login';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {concat, Observable} from 'rxjs';

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
        let query = `
        query MyQuery {
          __typename
          cMTmAdminSubModuleMasters {
            creationDate
            cuserId
            modificationDate
            moduleId
            muserId
            navigationUrl
            rid
            subModuleId
            subModuleName
            subModuleOrder
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
    
           var persons = obj["data"]["cMTmAdminSubModuleMasters"]
    
    
     console.log(persons);
   
    
        





  //    var result = 
  // // as Jon Skeet pointed out, OrderBy is useless here, I just leave it 
  // // show how to use OrderBy in a LINQ query
  // persons.OrderBy(mc => mc.SomePropToSortOn)
  //                  .ToDictionary(mc => mc.mo.ToString(), 
  //                                mc => mc.ValueProp.ToString(), 
  //                                );


     var array2= new Array(); 

     var array = new Array();

persons.forEach(element => {
    
    array2.push({
        name:  element.subModuleName ,
        path: element.navigationUrl
    });
});


console.log(array2);
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
