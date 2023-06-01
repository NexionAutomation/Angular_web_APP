import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { CM_AdminModuleMaster } from '../create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '../user-module-services.service';
//import { initializeLinq, IEnumerable, from } from "linq-to-typescript"
import { Enumerable, List } from 'sharp-collections';
import { contains } from 'jquery';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster } from '@modules/Module/PoModules';
import { Console } from 'console';
@Component({
  selector: 'app-create-sub-modulemaster',
  templateUrl: './create-sub-modulemaster.component.html',
  styleUrls: ['./create-sub-modulemaster.component.scss']
})
export class CreateSubModulemasterComponent implements OnInit {

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
  ActionFlag=0;
  editData: any;
  editDataID: any;
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
      ddlModule: new FormControl(null),
      SubModuleName: new FormControl(null),
      SubModuleOrder: new FormControl(null),
      NavigationUrl: new FormControl(null),
      SubModuleTarget: new FormControl(null),
    });


    this.LodeDataTable();

  }


  async INSERT(
    moduleId: number,
    subModuleId: number,
    subModuleName: String,
  
    cuserId: number,
    
    muserId: number,
    subModuleOrder: number,
    navigationUrl: String,
    targetModule: String,
    rid: number,
    actionStatus:string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($moduleId: Int!
      $subModuleId: Int!
      $subModuleName: String
     
      $cuserId: Int!
     
      $muserId: Int!
      $subModuleOrder: Int!
      $navigationUrl: String
      $targetModule: String
      $rid: Int!
      ) {
      __typename
      cMTmAdminSubModuleMasters(data: {detail: {
        moduleId: $moduleId,
        subModuleId: $subModuleId,
        creationDate: "2019-10-10",
        cuserId: $cuserId,
        modificationDate: "2019-10-10",
        muserId: $muserId, 
        subModuleOrder: $subModuleOrder, 
        rid: $rid,
        navigationUrl: $navigationUrl, 
        subModuleName: $subModuleName,
        targetModule: $targetModule
      }, iD: "${rid}"}, triger: "${actionStatus}") {
        code
        detail
        iD
        message
        status
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
        moduleId,
        subModuleId,
        subModuleName,
       
        cuserId,
        
        muserId,
        subModuleOrder,
        navigationUrl,
        targetModule,
        rid
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
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
    
   
    var table=$('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({
        drawCallback: function(){
          $('.paginate_button.next:not(.disabled)', this.api().table().container())          
             .on('click', function(){
              //this.test();
              
              $('#show_alert').html(
                'Currently showing page '+(info.page+1)+' of '+info.pages+' pages.'
            );
        // Output the data for the visible rows to the browser's console
           
             
             });       
       },

        dom: 'Bfrtip',
        paging: true



      });



    });


    var info = table.page.info();
 





  }

   show_alert() {
    alert("Hello! I am an alert box!");
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






  //----------------------------------CURD OPERATIONS-------------------------------------------------------------

  async onSubmit() {
    try{

    

    if(this.ActionFlag==0)
    {


      if (this.ActionFlag == 0) {
        const { value: showConfirmButton } = await Swal.fire({
          title: "Do You Want To Save",
          icon: 'question',
          //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
    
          showConfirmButton: true,
          showCancelButton: true
        })
    
        if (showConfirmButton == true) {


          var output =   await this.INSERT(
            parseInt( this.loginForm.get('ddlModule').value),
           1,
           this.loginForm.get('SubModuleName').value,
           this.Logins1.TMUserMaster.userCode,
           this.Logins1.TMUserMaster.userCode,
           this.loginForm.get('SubModuleOrder').value,
           this.loginForm.get('NavigationUrl').value,
           
           this.loginForm.get('SubModuleTarget').value,
           0,
           "INSERT"
         );


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);
        
            var outputFinal = obj["data"]["cMTmAdminSubModuleMasters"];
   
      


            if(outputFinal[0].message=="Success")
            {
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

            }else{

              Swal.fire(
                'Failed',
                '',
                'error'
              )

            }

         
        }
    
      }
     
    
  }
  if(this.ActionFlag==1)
  {
    if (this.ActionFlag == 1) {
      const { value: showConfirmButton } = await Swal.fire({
        title: "Do You Want To Update",
        icon: 'question',
        //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
  
        showConfirmButton: true,
        showCancelButton: true
      })
  
      if (showConfirmButton == true) {


        var output =  await this.INSERT(
          parseInt( this.loginForm.get('ddlModule').value),
         1,
         this.loginForm.get('SubModuleName').value,
         this.Logins1.TMUserMaster.userCode,
         this.Logins1.TMUserMaster.userCode,
         this.loginForm.get('SubModuleOrder').value,
         this.loginForm.get('NavigationUrl').value,
         
         this.loginForm.get('SubModuleTarget').value,
         Number(this.editDataID),
         "UPDATE"
       );

          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);
      
          var outputFinal =obj["data"]["cMTmAdminSubModuleMasters"];
    


          if(outputFinal[0].message=="Success")
          {
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
              title: 'Data Update Successfully',


            })
            this.LodeDataTable();
          this.ActionFlag=0;
          this.onReset();
          }else{

            Swal.fire(
              'Failed',
              '',
              'error'
            )

          }

       
      }
  
    }
  }
}catch(error )
{
  Swal.fire(
    'Failed',
    error,
    'error')
}

 }
async onDel(string :string)
{
  try{
  var state="Delete"
  if(state==state)
  {


    
      const { value: showConfirmButton } = await Swal.fire({
        title: "Are You Sure Want To Delete",
        icon: 'question',
        //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',
  
        showConfirmButton: true,
        showCancelButton: true
      })
  
      if (showConfirmButton == true) {


        var output =  await this.INSERT(
         0,
         1,
         this.loginForm.get('SubModuleName').value,
         this.Logins1.TMUserMaster.userCode,
         this.Logins1.TMUserMaster.userCode,
         0,
         this.loginForm.get('NavigationUrl').value,
         
         this.loginForm.get('SubModuleTarget').value,
         Number(string),
         "DELETE"
       );
    
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal =obj["data"]["cMTmAdminSubModuleMasters"];

       
          if(outputFinal[0].message=="Success")
          {
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
              title: 'Data Delete Successfully',


            })
            this.LodeDataTable();

          }else{

            Swal.fire(
              'Failed ',
              '',
              'error'
            )

          }

       
      }
  
}


}
catch(error)
{
  Swal.fire(
    'Failed',
    error,
    'error')
}
}

async onReset()
{
  this.loginForm.reset();
  this.ActionFlag=0;
}

async onedit(string:string)
{
  
  this.editDataID=string;
  var result = this.persons
  .where(s => s.left.rid == Number(string) )
  .singleOrDefault();

  this.editData=result;
  this.loginForm .setValue({
    ddlModule:this.editData.right.rid ,
    SubModuleName: this.editData.left.subModuleName,
    SubModuleOrder:  this.editData.left.subModuleOrder,
    NavigationUrl:  this.editData.left.navigationUrl,
    SubModuleTarget:  this.editData.left.targetModule,
  });
  this.ActionFlag=1;

}

//----------------------------------CURD OPERATIONS-------------------------------------------------------------

}



