import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CMAdminModuleMasterUser } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-poitems',
  templateUrl: './create-poitems.component.html',
  styleUrls: ['./create-poitems.component.scss']
})
export class CreatePOItemsComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;


  public loginForm: FormGroup;
  ActionFlag: number;
  editData: any;
  cRMLeads: any;
  cRMAccounts: any;
  displayStyle: string;
  Attand: any;
  chatRoomUid$: any;
  URLid: any;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router:Router


  ) {
    
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      txtModuleName: new FormControl(null),
      txtModuleOrder: new FormControl(null),
      
    });




    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );


    if (this.chatRoomUid$.destination._value.id != undefined) {
      this.URLid = this.chatRoomUid$.destination._value.id;
      this.ActionFlag = 1;
     
      //console.log(this.URLid);
    }
    else {
      //this._router.navigate(['/SearchPo']);
      this.ActionFlag = 0;
    }

    this.LodeDataTable();

  }

 

  async INSERT(
    moduleId: number,
moduleName: String,
moduleOrder: number,

cuserId: number,

muserId: number,
rid: number,
    ActionStatus:string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($moduleId: Int!
      $moduleName: String
      $moduleOrder: Int!
      
      $cuserId: Int!
      
      $muserId: Int!
      $rid: Int!) {
      __typename
      cMTmAdminModuleMasters(triger: "${ActionStatus}",
        data: {detail: {
          moduleId: $moduleId,
          moduleOrder: $moduleOrder,
          creationDate: "2019-10-10",
          cuserId: $cuserId,
          modificationDate: "2019-10-10",
          muserId: $muserId,
          rid: $rid,
          moduleName: $moduleName
        }, iD: "${rid}"}) {
        code
        detail
        iD
        message
        status
      }
    }
    
               
       `

    var datas = JSON.stringify({
      query, variables: {
        moduleId,
moduleName,
moduleOrder,

cuserId,

muserId,
rid,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }



  async upload($event) {
    alert("call");
  
  
  
   
    var operations = {
      query: `
      query MyQuery($file: Upload) {
        pOItemFileUplodeExcel(files: $file) {
        
          t1
          t10
          t11
          t12
          t13
          t14
          t15
          t16
          t17
          t18
          t19
          t2
          t20
          t21
          t22
          t23
          t24
          t25
          t26
          t27
          t28
          t29
          t3
          t30
          t31
          t32
          t33
          t34
          t35
          t36
          t37
          t38
          t39
          t4
          t40
          t41
          t42
          t43
          t44
          t45
          t46
          t48
          t49
          t47
          t5
          t50
          t51
          t6
          t7
          t8
          t9
      
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
  
  
  //   var output = await this.INSERT(
  //     this.loginForm.get('file1').value,
     
  //  );
  
   var ret= await this.Logins1.Graphqlfiledata("query1", fd, file);
  
  
   const myJSON = JSON.stringify(ret);
   
   const obj = JSON.parse(myJSON);
  
  
   var outputFinal = obj["data"]["pOItemFileUplodeExcel"];
  
   this.persons=outputFinal;
  
  console.log(this.persons)
   $('#example1').DataTable().destroy();
   $(document).ready(function () {
  
     this.dtOptions = $('#example1').DataTable({
  
       dom: 'Bfrtip',
       paging: false
  
     });
  
   });
  }
  


  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
       
        cRMLeads(where: {id: {in: "${this.URLid}"}}) {
          accountId
          closeDate
          companyId
          createDate
          currency
          id
          isDeleted
          isFunded
          lastUpdated
          lastUpdatedBy
          leadTrackId
          mustWin
          owner
          description
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

   
    
    var arr=new Array;
    
   
    
    this.cRMLeads = Enumerable.from(obj["data"]["cRMLeads"]).cast<any>().toList();
//     this.cRMLeads=this.cRMLeads.select(x=>x.description ,x=>x.leadTrackId.tostring().replace(/[^\d]/g, ""),x=>x.accountId);
//  // or List.from(data)
 console.log( this.cRMLeads);
    // this.cRMAccounts = Enumerable.from(obj["data"]["cRMAccounts"]).cast<any>().toList();



// console.log(this.cRMLeads);
// console.log(this.cRMAccounts);
//     let result = this.cRMLeads
//     .join(this.cRMAccounts, a => a.accountId, b => b.id)
    
//     .where(s => s.left.accountId == s.right.id )
//     .toList();
    // let datas=result;
    // datas.left.leadTrackId.tostring().replace(/[^\d]/g, "");
    // console.log(datas);
    // console.log(this.persons);
     //this.persons=result;

 
    
    $('#example1').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example1').DataTable({

        dom: 'Bfrtip',
        paging: false

      });

    });

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


          var output = await this.INSERT(0,
            this.loginForm.get('txtModuleName').value,
            this.loginForm.get('txtModuleOrder').value,
            this.Logins1.TMUserMaster.userCode
            , 0, 0,"INSERT");


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);
        
            var outputFinal = obj["data"]["cMTmAdminModuleMasters"];
      


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


        var output = await this.INSERT(0,
          this.loginForm.get('txtModuleName').value,
          this.loginForm.get('txtModuleOrder').value,
          this.Logins1.TMUserMaster.userCode
          , 0, this.editData.rid,"UPDATE");


          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);
      
          var outputFinal = obj["data"]["cMTmAdminModuleMasters"];
    


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


        var output = await this.INSERT( 0,"0",0,0,0,Number(string),"DELETE");
    
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmAdminModuleMasters"];

       
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


openPopup(event) {
  this.displayStyle = "block";
  // console.log(event);
  // $('#imagemodel').attr('src', 'http://app.nexionautomation.com/FileData/' + event);

  // console.log(event);
}
closePopup() {
  this.displayStyle = "none";
}
async onReset()
{
  this.loginForm.reset();
  this.ActionFlag=0;
}

async onedit(string:string)
{
  this.editData=Enumerable.from( this.persons).cast<CMAdminModuleMasterUser>().where(x=>x.rid==Number(string)).singleOrDefault();
  
  this.loginForm.setValue({
    txtModuleName: this.editData.moduleName,
    txtModuleOrder:this.editData.moduleOrder,

  });
  this.ActionFlag=1;
}

//----------------------------------CURD OPERATIONS-------------------------------------------------------------



}
