import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-uplode-file',
  templateUrl: './uplode-file.component.html',
  styleUrls: ['./uplode-file.component.scss']
})
export class UplodeFileComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;



ActionStatus:any;
  public loginForm: FormGroup;
  CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  cMTmAdminSubModuleMasters: List<CMAdminSubModuleMaster>;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder


  ) {

  }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
     
      file1: new FormControl()
     
    });


    this.LodeDataTable();

  }

  async onSubmit() {

  

    console.log(this.loginForm);
    this.ActionStatus="INSERT";
    var output = await this.INSERT(
       this.loginForm.get('file1').value,
      
    );
    this.ActionStatus="";
    const myJSON = JSON.stringify(output);
    const obj = JSON.parse(myJSON);
    const status = null;//obj["data"]["uploadFile"];

    if (status[0].message == "Success") {
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
    files: File,
   
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    // let formData = new FormData();           
    // formData.append("file", files[0]);

console.log(files)
    let query = `
    mutation MyMutation($file:Upload) {
      __typename
      uploadFile(files: $file) {
        iD
        code
        message
        status
        detail
      },
      
  variables: {
    file: null
  }
    }
    
       
    
       `

     switch (this.ActionStatus)
     {
       case this.ActionStatus: "INSERT"
       query=query.replace("INSERT","INSERT");
       break;
       case this.ActionStatus: "UPDATE"
       query=query.replace("INSERT","UPDATE");
       break;
       case this.ActionStatus: "DELETE"
       query.replace("INSERT","DELETE");
       query=query.replace("INSERT","DELETE");
       break;


     }
    //query=  query.replace("INSERT","UPDATE");

    

    var datas = JSON.stringify({
      query, variables: {
        files,
        
      }
    });

    
    //var ss = await this.Logins1.Graphqlfiledata("query", datas, files);

    return null;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';



    
    let query = `query MyQuery {
      cMTmAdminSubModuleMasters {
        subModuleName
        navigationUrl
        targetModule
        subModuleOrder
        subModuleId
        rid
        muserId
        moduleId
        modificationDate
        cuserId
        creationDate
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

    this.persons = obj["data"]["cMTmAdminSubModuleMasters"]


    const enumerable = Enumerable.from(this.persons).asEnumerable();
    this.cMTmAdminSubModuleMasters = Enumerable.from(obj["data"]["cMTmAdminSubModuleMasters"]).cast<CMAdminSubModuleMaster>().toList();
 // or List.from(data)
    this.CMAdminModuleMasterUser = Enumerable.from(obj["data"]["cMTmAdminModuleMasters"]).cast<CMAdminModuleMasterUser>().toList();




    var result = this.cMTmAdminSubModuleMasters
    .join(this.CMAdminModuleMasterUser, a => a.moduleId, b => b.rid)
    .where(s => s.left.moduleId == s.right.rid )
    .toList();
     this.persons=result;
    
   
    $('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: true



      });



    });





  }

  ddlModule(event: Event) {

    //this.UserMaster2 = Enumerable.from(this.UserMaster).where(x => x.groupId == Number(event)).toList();
 console.log(event);
  }

  Edit(event :Event)
  {
alert (event)
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }


  async upload($event) {
    alert("call");




   
    var operations = {
      query: `
      mutation MyMutation($file: Upload) {
        __typename
        uploadFile(files: $file) {
          code
          detail
          iD
          message
          status
        }
      }
      `,
      variables: {
        file: null
      }
    }


       var _map = {
        file: ["variables.file"]
      }


      var file =  $event.target.files[0];
var fd = new FormData()
fd.append('operations', JSON.stringify(operations))
fd.append('map', JSON.stringify(_map))
fd.append('file', file, file.name)


    var output = await this.INSERT(
      this.loginForm.get('file1').value,
     
   );

   var ss = await this.Logins1.Graphqlfiledata("query", fd, file);

console.log(ss);
   
  }
}
