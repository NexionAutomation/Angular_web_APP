import { NgModule, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupMasterComponent } from './user-group-master/user-group-master.component';
import { DataTablesModule } from 'angular-datatables';

import { CreateUserMasterComponent } from './create-user-master/create-user-master.component';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '@services/app.service';
import { UserModuleServicesService } from './user-module-services.service';
import { CreateUserRightsComponent } from './create-user-rights/create-user-rights.component';
import { CreateModulemasterComponent } from './create-modulemaster/create-modulemaster.component';
import { CreateSubModulemasterComponent } from './create-sub-modulemaster/create-sub-modulemaster.component';
import { ReactiveFormsModule } from '@angular/forms';





@NgModule({
  declarations: [


    UserGroupMasterComponent,

    CreateUserMasterComponent,
    CreateUserRightsComponent,
    CreateModulemasterComponent,
    CreateSubModulemasterComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    ReactiveFormsModule
  ]
})
export class UserModuleModule {

  /**
   *
   */
  constructor(
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService
  ) {





  }


}
