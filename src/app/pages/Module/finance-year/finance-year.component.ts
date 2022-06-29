import { Logins } from '@/Model/Utility/login';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CMAdminModuleMasterUser, CMAdminSubModuleMaster, TM_FinaicalYear } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-finance-year',
  templateUrl: './finance-year.component.html',
  styleUrls: ['./finance-year.component.scss']
})
export class FinanceYearComponent implements OnInit {

  
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
  TM_FinaicalYear: List<TM_FinaicalYear>;
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
      txtFYname: new FormControl(null),
      txtstartdate: new FormControl(null),
      txtenddate: new FormControl(null),
      txtponumber: new FormControl(null),
     
    });


    this.LodeDataTable();

  }

  
  async INSERT(
    
    fyname: String,
    startDate: Date,
    enddate: Date,
    poNumber: number,
    //creationDate: Date,
    cuserId: number,
    //modificationDate: Date,
    muserId: number,
    expenseid: number,
    id: number,
    targetModule: string,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($id: Int
      $fyname: String
      $startDate: DateTime
      $enddate: DateTime
      $poNumber: Int
      
      $cuserId: Int
     
      $muserId: Int
      $expenseid: Int) {
      __typename
      cMFinanceYearMaster(data: {detail: 
        {creationDate: "2019-10-10", 
          cuserId: $cuserId,
          enddate: $enddate, 
          expenseid: $expenseid,
          fyname: $fyname, 
          id: $id,
          modificationDate: "2019-10-10",
          muserId: $muserId,
          poNumber: $poNumber,
          startDate: $startDate}, iD: "${id}"}, triger: "${targetModule}") {
        iD
        code
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
        fyname,
    startDate,
    enddate,
    poNumber,
    //creationDate: Date,
    cuserId,
    //modificationDate: Date,
    muserId,
    expenseid,
    id,
   
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
      pOTmFinaicalYears {
        id
        creationDate
        cuserId
        enddate
        expenseid
        fyname
        modificationDate
        muserId
        poNumber
        startDate
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

    //this.persons = obj["data"]["cMFinanceYearMaster"]


    const enumerable = Enumerable.from(this.persons).asEnumerable();
    this.TM_FinaicalYear = Enumerable.from(obj["data"]["pOTmFinaicalYears"]).cast<TM_FinaicalYear>().toList();
 // or List.from(data)
    



    // var result = this.cMTmAdminSubModuleMasters
    // .join(this.CMAdminModuleMasterUser, a => a.moduleId, b => b.rid)
    // .where(s => s.left.moduleId == s.right.rid )
    // .toList();
     this.persons= this.TM_FinaicalYear;
    
   
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


          var output =
          await this.INSERT(
            this.loginForm.get('txtFYname').value,
            this.loginForm.get('txtstartdate').value,
            this.loginForm.get('txtenddate').value,
            this.loginForm.get('txtponumber').value,
            this.Logins1.TMUserMaster.userCode
            , 0, 0,0,"INSERT");
           


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);
        
            var outputFinal = obj["data"]["cMFinanceYearMaster"];
      


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


        var output = await this.INSERT(
          this.loginForm.get('txtFYname').value,
          this.loginForm.get('txtstartdate').value,
          this.loginForm.get('txtenddate').value,
          this.loginForm.get('txtponumber').value,
          this.Logins1.TMUserMaster.userCode
          , 0, 0,this.editDataID,"UPDATE");


          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);
      
          var outputFinal = obj["data"]["cMFinanceYearMaster"];
    


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
          this.loginForm.get('txtFYname').value,
          this.loginForm.get('txtstartdate').value,
          this.loginForm.get('txtenddate').value,
          this.loginForm.get('txtponumber').value,
          this.Logins1.TMUserMaster.userCode
          , 0, 0,this.editDataID,"DELETE");

        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMFinanceYearMaster"];

       
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

  this.editDataID=Number(string)
  
  this.editData= this.persons.where(x=>x.id==Number(string)).singleOrDefault();
  

  this.loginForm .setValue({
    txtFYname:  this.editData.fyname,
    txtstartdate: formatDate(this.editData.startDate,'yyyy-MM-dd','en'),
    txtenddate: formatDate(this.editData.enddate,'yyyy-MM-dd','en'),
    txtponumber:  this.editData.poNumber,
   
  });



  this.ActionFlag=1;
}

//----------------------------------CURD OPERATIONS-------------------------------------------------------------



}
