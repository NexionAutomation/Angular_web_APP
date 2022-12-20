import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import {ButtonComponent} from './components/button/button.component';

import {registerLocaleData} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {LanguageComponent} from '@modules/main/header/language/language.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import {ControlSidebarComponent} from './modules/main/control-sidebar/control-sidebar.component';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './store/auth/reducer';
import {uiReducer} from './store/ui/reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SelectComponent } from './components/select/select.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

import { CreateDrawingQrcodeComponent } from './pages/DrawingQrCode/create-drawing-qrcode/create-drawing-qrcode.component';
import { ReadDrawingQrcodeComponent } from './pages/DrawingQrCode/read-drawing-qrcode/read-drawing-qrcode.component';
import { UpdateDrawingQrcodeComponent } from './pages/DrawingQrCode/update-drawing-qrcode/update-drawing-qrcode.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { DataTablesModule } from 'angular-datatables';
import { UserModuleModule } from '@pages/user-module/user-module.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UplodeFileComponent } from './pages/uplode-file/uplode-file.component';
import { ExpenseEmpComponent } from './pages/Expense/expense-emp/EMP/expense-emp.component';
import { ExpenseManagerComponent } from '@pages/Expense/expense-emp/expense-manager/expense-manager.component'; 

import { CreatePOComponent } from './pages/PO/create-po/create-po.component';
import { SearchPoComponent } from './pages/PO/search-po/search-po.component';
import { CityMasterComponent } from './pages/Module/city-master/city-master.component';
import { CompanymasterComponent } from './pages/Module/companymaster/companymaster.component';
import { CountrymasterComponent } from './pages/Module/countrymaster/countrymaster.component';
import { ExpenseGroupComponent } from './pages/Module/expense-group/expense-group.component';
import { ExpenseStatusTypeComponent } from './pages/Module/expense-status-type/expense-status-type.component';
import { ExpenseTypeComponent } from './pages/Module/expense-type/expense-type.component';
import { FinanceYearComponent } from './pages/Module/finance-year/finance-year.component';
import { StateMasterComponent } from './pages/Module/state-master/state-master.component';
import { SupplierMasterComponent } from './pages/Module/supplier-master/supplier-master.component';
import { LeaveTypeComponent } from './pages/Module/leave-type/leave-type.component';
import { LeaveSettingComponent } from './pages/Module/leave-setting/leave-setting.component';

import '../assets/select2/select2.min.js';
import { ViewPOComponent } from './pages/PO/view-po/view-po.component';
import { OutstationViewComponent } from '@pages/Expense/Exp-View/outstation-view/outstation-view.component'; 
import { AttandanceComponent } from './pages/Attandance/attandance/attandance.component';
import { CreateIndentComponent } from './pages/INDENT/create-indent/create-indent.component';
import { CreateExpDashboardComponent } from './pages/Expense/Exp_Dashboard/create-exp-dashboard/create-exp-dashboard.component';

import { CreatePOItemsComponent } from './pages/Po-File/create-poitems/create-poitems.component';
import { CreatePOFileComponent } from '@pages/Po-File/create-pofile/create-pofile.component';
import { SearchPoItemsComponent } from './pages/PO/search-po-items/search-po-items.component';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateComplaintBoxComponent } from './pages/ComplantBox/create-complaint-box/create-complaint-box.component';
import { ViewComplaintBoxComponent } from './pages/ComplantBox/view-complaint-box/view-complaint-box.component';
import { FormsModule } from '@angular/forms';
import { ExpenseViewAccountComponent } from './pages/Expense/Exp-View/expense-view-account/expense-view-account.component';
import { ExpenseViewmanagerComponent } from './pages/Expense/Exp-View/expense-viewmanager/expense-viewmanager.component';
import { PoDashboardComponent } from './pages/PO/po-dashboard/po-dashboard.component'; 

import { NgxOrgChartModule } from 'ngx-org-chart';
import { ExpenseFileComponent } from './pages/Expense/Exp-View/expense-file/expense-file.component';

//import "file-viewer";

// import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
// import { createHttpLink, HttpLink, InMemoryCache } from '@apollo/client';

registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        
       
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        LanguageComponent,
        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
        ControlSidebarComponent,
        SelectComponent,
        CheckboxComponent,
        
        CreateDrawingQrcodeComponent,
        ReadDrawingQrcodeComponent,
        UpdateDrawingQrcodeComponent,
        UplodeFileComponent,
        ExpenseEmpComponent,
        ExpenseManagerComponent,
       
        CreatePOComponent,
        SearchPoComponent,
        CityMasterComponent,
        CompanymasterComponent,
        CountrymasterComponent,
        ExpenseGroupComponent,
        ExpenseStatusTypeComponent,
        ExpenseTypeComponent,
        FinanceYearComponent,
        StateMasterComponent,
        SupplierMasterComponent,
        LeaveTypeComponent,
        LeaveSettingComponent,
        ViewPOComponent,
        OutstationViewComponent,
        AttandanceComponent,
        CreateIndentComponent,
        CreateExpDashboardComponent,
        CreatePOFileComponent,
        CreatePOItemsComponent,
        SearchPoItemsComponent,
        CreateComplaintBoxComponent,
        ViewComplaintBoxComponent,
        ExpenseViewAccountComponent,
        ExpenseViewmanagerComponent,
        PoDashboardComponent,
        ExpenseFileComponent
      
        
    ],
    imports: [
        // ApolloModule,
        UserModuleModule,
        DataTablesModule,
         ApolloModule, 
        BrowserModule,
        CKEditorModule,
        FormsModule,
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        SweetAlert2Module.forRoot(),
     
    //=> In submodules only:
    SweetAlert2Module,
    NgxOrgChartModule,

    //=> In submodules only, overriding options from your root module:
    SweetAlert2Module.forChild({ /* options */ }),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgbModule,
        
       
    ],
    providers: [
        
      ],
    bootstrap: [AppComponent]
})
export class AppModule {}

// {
//     provide: APOLLO_OPTIONS,
//     useFactory: (httpLink: HttpLink) => {
//       return {
//         cache: new InMemoryCache(),
//         link: new HttpLink({
//           uri: `https://48p1r2roz4.sse.codesandbox.io`
//         }),
//       };
//     },
//     deps: [createHttpLink],
//   },
