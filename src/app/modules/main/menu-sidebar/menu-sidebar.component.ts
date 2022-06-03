import { Logins } from '@/Model/Utility/login';
import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

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
    }
}


//const menu=

export const MENU = [
    {
        name: 'Dashboard',
        path: ['/'],
        children:[]
    },
    {
        name: 'Blank',
        path: ['/blank'],
        children:[]
    },
    {
        name: 'Main Menu',
        path: [],
        children: [
            {
                name: 'Sub Menu',
                path: ['/sub-menu-1']
            },

            {
                name: 'Blank',
                path: ['/sub-menu-2']
            }
        ]
    },
    {
        name: 'User Management',
        path: [],
        children: [
            {
                name: 'Create',
                path: ['/Create-Drawing']
            },

            {
                name: 'UserMaster',
                path: ['/UserMaster']
            },
            {
                name: 'CreateUser',
                path: ['/CreateUser']
            },
            {
                name: 'CreateUserRight',
                path: ['/CreateUserRight']
            },
            {
                name: 'CreateUserModule',
                path: ['/CreateUserModule']
            },
            {
                name: 'CreateUsersubmodule',
                path: ['/CreateUsersubmodule']
            }

            
        ]
    },

   
];


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
