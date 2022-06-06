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
        UpdateDrawingQrcodeComponent
   
    ],
    imports: [
        // ApolloModule,
        UserModuleModule,
        DataTablesModule,
         ApolloModule, 
        BrowserModule,
        
        StoreModule.forRoot({auth: authReducer, ui: uiReducer}),
        SweetAlert2Module.forRoot(),

    //=> In submodules only:
    SweetAlert2Module,

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
