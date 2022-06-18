import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, TM_CompanyMaster, TM_CountryMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-countrymaster',
  templateUrl: './countrymaster.component.html',
  styleUrls: ['./countrymaster.component.scss']
})
export class CountrymasterComponent implements OnInit {

  
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;
FlagID=0;
EditModel!:any;


ActionStatus:any;
  public loginForm: FormGroup;
  CMAdminModuleMasterUser: List<CMAdminModuleMasterUser>;
  cMTmAdminSubModuleMasters: List<CMAdminSubModuleMaster>;
  TM_CompanyMaster: List<TM_CountryMaster>;
  ActionFlag: number;
  editData: CMAdminModuleMasterUser;
 
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
   


  ) {

  }



  ngOnInit(): void {
    this.loginForm = new FormGroup({
      txtcountrymaster: new FormControl(),
      txtdisplayname: new FormControl(),
    
    });
  


    var data = [
      {
          id: 0,
          text: 'enhancement'
      },
      {
          id: 1,
          text: 'bug'
      },
      {
          id: 2,
          text: 'duplicate'
      },
      {
          id: 3,
          text: 'invalid'
      },
      {
          id: 4,
          text: 'wontfix'
      }
  ];
 
//   Select2('.js-example-data-array').select2();
//   Select2(".js-example-data-array").select2()({
//     data: data
//   })

  
//   Select2(".js-example-data-array").select2({
//   data: data
// });
  
  
  // $(".js-example-data-array-selected").select2({
  //   data: data
  // })


    this.LodeDataTable();

  }

  
  async INSERT(
    countrycode: Number,
    countryname: String,
    displayAs: String,
   
    usercode: Number,
    deleted: String,
    editable: String,
    ActionFlag: String,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation(
      $countrycode: Int!,
      $countryname: String,
      $displayAs: String,
   
      $usercode: Int!,
      $deleted: String,
      $editable: String,
    
    ) {
      __typename
      cMCountryMaster(data: {detail: {
        countrycode: $countrycode, 
        countryname:  $countryname, 
        creationdate: "2019-10-10",
        deleted:  $deleted,
        displayAs: $displayAs,
        editable:  $editable,
        modificationdate: "2019-10-10",
        usercode: $usercode
      }, iD:"${countrycode}"}, triger: "${ActionFlag}") {
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
      
        countrycode,
    countryname,
    displayAs,
   
    usercode,
    deleted,
    editable,
  
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
      pOTmCountryMasters {
        countryname
        displayAs
        creationdate
        modificationdate
        usercode
        deleted
        editable
        countrycode
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
    this.TM_CompanyMaster = Enumerable.from(obj["data"]["pOTmCountryMasters"]).cast<TM_CountryMaster>().toList();
 // or List.from(data)
    



    // var result = this.cMTmAdminSubModuleMasters
    // .join(this.CMAdminModuleMasterUser, a => a.moduleId, b => b.rid)
    // .where(s => s.left.moduleId == s.right.rid )
    // .toList();
     this.persons=this.TM_CompanyMaster;
    
   
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

 
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }




  async onEdit(string:string)
  {
    console.log(this.persons)
    this.EditModel= this.persons.where(x=>x.countrycode==Number(string)).singleOrDefault()
    
  

    this.loginForm.setValue({
      txtcountrymaster: this.EditModel.countryname, 
      txtdisplayname:  this.EditModel.displayAs
    });

    this.FlagID=1


console.log(this.EditModel)
  }
  
 
async reset()
{
  this.loginForm.reset();
  this.FlagID=0;
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


        var output =null;
        //  await this.INSERT(0,
        //   this.loginForm.get('txtModuleName').value,
        //   this.loginForm.get('txtModuleOrder').value,
        //   this.Logins1.TMUserMaster.userCode
        //   , 0, 0,"INSERT");


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


      var output = null;
      // await this.INSERT(0,
      //   this.loginForm.get('txtModuleName').value,
      //   this.loginForm.get('txtModuleOrder').value,
      //   this.Logins1.TMUserMaster.userCode
      //   , 0, this.editData.rid,"UPDATE");


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


      var output = null;//await this.INSERT( 0,"0",0,0,0,Number(string),"DELETE");
  
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
