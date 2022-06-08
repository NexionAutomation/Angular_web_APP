import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { CreateDrawingQrcodeComponent } from '@pages/DrawingQrCode/create-drawing-qrcode/create-drawing-qrcode.component';
import { ReadDrawingQrcodeComponent } from '@pages/DrawingQrCode/read-drawing-qrcode/read-drawing-qrcode.component';
import { UserGroupMasterComponent } from '@pages/user-module/user-group-master/user-group-master.component';
import { CreateUserMasterComponent } from '@pages/user-module/create-user-master/create-user-master.component';
import { CreateUserRightsComponent } from '@pages/user-module/create-user-rights/create-user-rights.component';

import { CreateModulemasterComponent } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { CreateSubModulemasterComponent } from '@pages/user-module/create-sub-modulemaster/create-sub-modulemaster.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: 'Create-Drawing',
                component: CreateDrawingQrcodeComponent
            },
            {
                path: 'Read-Drawing',
                component: ReadDrawingQrcodeComponent
            },
          
            {
                path: 'UserGroup',
                component: UserGroupMasterComponent
            },
            {
                path: 'CreateUser',
                component: CreateUserMasterComponent
            },
            {
                path: 'CreateUserRight',
                component: CreateUserRightsComponent
            },
            {
                path: 'CreateUserModule',
                component: CreateModulemasterComponent
            },
            {
                path: 'CreateUsersubmodule',
                component: CreateSubModulemasterComponent
            },
            {
                path: '',
                component: DashboardComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
