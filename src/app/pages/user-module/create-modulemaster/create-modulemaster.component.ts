import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UserModuleServicesService } from '../user-module-services.service';


export class CM_AdminModuleMaster {
  public Module_Id: number;
  public ModuleName: string;
  public ModuleOrder: number;
  public CUser_Id: number;
  public MUser_Id: number;
  public RID: number;
  public status: any;
  public CM_AdminModuleMaster: CM_AdminModuleMaster

  // constructor(Module_Id_: number, ModuleName_: string, ModuleOrder_: number, CUser_Id_: number, MUser_Id_: number, RID_: number) {
  //   this.Module_Id = Module_Id_;
  //   this.ModuleName = ModuleName_;
  //   this.ModuleOrder = ModuleOrder_;
  //   this.CUser_Id = CUser_Id_;
  //   this.MUser_Id = MUser_Id_;
  //   this.RID = RID_;
  // }
}


@Component({
  selector: 'app-create-modulemaster',
  templateUrl: './create-modulemaster.component.html',
  styleUrls: ['./create-modulemaster.component.scss']
})

export class CreateModulemasterComponent extends CM_AdminModuleMaster implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;


  public loginForm: FormGroup;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder


  ) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      txtModuleName: new FormControl(null),
      txtModuleOrder: new FormControl(null),

    });

    this.LodeDataTable();

  }

  async onSubmit() {

    var output = await this.INSERT(0,
      this.loginForm.get('txtModuleName').value,
      this.loginForm.get('txtModuleOrder').value,
      this.Logins1.TMUserMaster.userCode
      , 0, 0);


    const myJSON = JSON.stringify(output);
    const obj = JSON.parse(myJSON);

    console.log(obj);
    this.status = obj["data"]["cMTmAdminModuleMasters"];

    if (this.status[0].message == "Success") {
      const { value: showConfirmButton } = await Swal.fire({
        title: 'success',
        icon: 'success',
        html: '<div class="alert alert-success" role="alert">Data Create Successfully</div>',

        showConfirmButton: true,
        showCancelButton: true
      })

      if (showConfirmButton == true) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }

        })

        this.Logins1.popupStatus
        Toast.fire({
          icon: 'success',
          title: 'Data Create Successfully',


        })
        this.LodeDataTable();
      }

    }

 }

  async INSERT(
    Module_Id: number,
    ModuleName: string,
    ModuleOrder: number,
    CUser_Id: number,
    MUser_Id: number,
    RID: number,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation(
        $Module_Id: Int!
        $ModuleName: String
        $ModuleOrder: Int!
        $CUser_Id: Int!
        $MUser_Id: Int!
        $ RID: Int!
     ) {
                 __typename
               cMTmAdminModuleMasters(triger: "INSERT", data: {
                 
                detail: {
                  moduleId : $Module_Id,
                  moduleOrder: $ModuleOrder,
                  creationDate: "2019-10-10" ,
                   cuserId: $CUser_Id, 
                   modificationDate: "2019-10-10" ,
                    muserId: $MUser_Id,
                     rid: $RID,
                   moduleName: $ModuleName}}) {
                 iD
                 code
                 message
                 status
               }
             }
               
       `

    var datas = JSON.stringify({
      query, variables: {
        Module_Id,
        ModuleName,
        ModuleOrder,
        CUser_Id,
        MUser_Id,
        RID,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `{
      cMTmAdminModuleMasters {
        moduleName
        creationDate
        cuserId
        modificationDate
        moduleId
        moduleOrder
        muserId
        rid
      }
    }
    
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }

  async LodeDataTable() {
    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

    this.persons = obj["data"]["cMTmAdminModuleMasters"]

    
    $('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: true

      });

    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }
}
