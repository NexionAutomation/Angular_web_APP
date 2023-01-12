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
import { UplodeFileComponent } from '@pages/uplode-file/uplode-file.component';
import { ExpenseEmpComponent } from '@pages/Expense/expense-emp/EMP/expense-emp.component';
import { ExpenseManagerComponent } from '@pages/Expense/expense-emp/expense-manager/expense-manager.component'; 

import { CreatePOComponent } from '@pages/PO/create-po/create-po.component';
import { SearchPoComponent } from '@pages/PO/search-po/search-po.component';
import { CityMasterComponent } from '@pages/Module/city-master/city-master.component';
import { CompanymasterComponent } from '@pages/Module/companymaster/companymaster.component';
import { CountrymasterComponent } from '@pages/Module/countrymaster/countrymaster.component';
import { ExpenseTypeComponent } from '@pages/Module/expense-type/expense-type.component';
import { ExpenseGroupComponent } from '@pages/Module/expense-group/expense-group.component';
import { ExpenseStatusTypeComponent } from '@pages/Module/expense-status-type/expense-status-type.component';
import { FinanceYearComponent } from '@pages/Module/finance-year/finance-year.component';
import { LeaveTypeComponent } from '@pages/Module/leave-type/leave-type.component';
import { LeaveSettingComponent } from '@pages/Module/leave-setting/leave-setting.component';
import { StateMasterComponent } from '@pages/Module/state-master/state-master.component';
import { SupplierMasterComponent } from '@pages/Module/supplier-master/supplier-master.component';
import { ViewPOComponent } from '@pages/PO/view-po/view-po.component';
import { OutstationViewComponent } from '@pages/Expense/Exp-View/outstation-view/outstation-view.component'; 
import { AttandanceComponent } from '@pages/Attandance/attandance/attandance.component';
import { CreateIndentComponent } from '@pages/INDENT/create-indent/create-indent.component';
import { CreateExpDashboardComponent } from '@pages/Expense/Exp_Dashboard/create-exp-dashboard/create-exp-dashboard.component';
import { CreatePOFileComponent } from '@pages/Po-File/create-pofile/create-pofile.component'; 
import { CreatePOItemsComponent } from '@pages/Po-File/create-poitems/create-poitems.component';
import { SearchPoItemsComponent } from '@pages/PO/search-po-items/search-po-items.component';
import { CreateComplaintBoxComponent } from '@pages/ComplantBox/create-complaint-box/create-complaint-box.component';
import { ViewComplaintBoxComponent } from '@pages/ComplantBox/view-complaint-box/view-complaint-box.component';
import { ExpenseViewmanagerComponent } from '@pages/Expense/Exp-View/expense-viewmanager/expense-viewmanager.component';
import { ExpenseViewAccountComponent } from '@pages/Expense/Exp-View/expense-view-account/expense-view-account.component';
import { PoDashboardComponent } from '@pages/PO/po-dashboard/po-dashboard.component';
import { ExpenseFileComponent } from '@pages/Expense/Exp-View/expense-file/expense-file.component';

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
                path: 'CreateExpense',
                component: ExpenseEmpComponent
            },
            {
                path: 'ApprovedExpense/:id',
                component: ExpenseManagerComponent
            },
            // {
            //     path: 'AccountExpense/:id',
            //     component: ''//ExpenseAccountComponent
            // },
            {
                path: 'Upode',
                component: UplodeFileComponent
            },
           
            {
                path: 'CreatePo',
                component: CreatePOComponent
            },
            {
                path: 'CreatePo/:id',
                component: CreatePOComponent
            },
            {
                path: 'SearchPo',
                component: SearchPoComponent
            },
            {
                path: 'CreateCity',
                component: CityMasterComponent
            },
            {
                path: 'CreateCompany',
                component: CompanymasterComponent
            },
            {
                path: 'CreateCountryMaster',
                component: CountrymasterComponent
            },
            {
                path: 'CreateExpenseGroup',
                component: ExpenseGroupComponent
            },
            {
                path: 'CreateExpenseStatus',
                component: ExpenseStatusTypeComponent
            },
            {
                path: 'CreateExpenseType',
                component: ExpenseTypeComponent
            },
            {
                path: 'CreateFinanceYear',
                component: FinanceYearComponent
            },
            {
                path: 'CreateLeaveType',
                component: LeaveTypeComponent
            },
            {
                path: 'CreateLeaveSetting',
                component: LeaveSettingComponent
            },
            {
                path: 'CreateStateMaster',
                component: StateMasterComponent
            },
            {
                path: 'CreateSupplier',
                component: SupplierMasterComponent
            },
            {
                path: 'CreateExpOutView',
                component:OutstationViewComponent
            },
            {
                path: 'CreateExpOutMannagerView',
                component:ExpenseViewmanagerComponent
            },
            {
                path: 'CreateExpOutAccountView',
                component:ExpenseViewAccountComponent
            },
            {
                path: 'CreateExpense/:id',
                component:ExpenseEmpComponent
            },
            
            {
                path: 'CreateAttandance',
                component:AttandanceComponent
            },
            {
                path: 'CreateIndent',
                component:CreateIndentComponent
            },

            {
                path: 'CreateExpDashboard',
                component:CreateExpDashboardComponent
            },
        
            {
                path: 'CreatePOFile',
                component:CreatePOFileComponent
            },
            {
                path: 'CreatePOItems/:id',
                component:CreatePOItemsComponent
            },
            {
                path: 'SearchPOItems',
                component:SearchPoItemsComponent
            },
            {
                path: 'CreateComplaintBox/:id',
                component:CreateComplaintBoxComponent
            },
            {
                path: 'CreateComplaintBox',
                component:CreateComplaintBoxComponent
            },
            {
                path: 'ViewComplaintBox',
                component:ViewComplaintBoxComponent
            },
            {
                path: 'PoDashboard',
                component:PoDashboardComponent
            },
            
           
            {
                path: '',
                component: DashboardComponent,

            }
        ]
    },
    {
        path: 'viewPo/:id',
        component: ViewPOComponent,
        canActivate: [NonAuthGuard],
        
        
    },
    {
        path: 'viewExpense/:id',
        component: ExpenseFileComponent,
        canActivate: [NonAuthGuard],
        
        
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
    
    {path: '**',  component: LoginComponent,} //redirectTo: '',
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
