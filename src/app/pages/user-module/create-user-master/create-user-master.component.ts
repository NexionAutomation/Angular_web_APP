import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserModuleServicesService } from '../user-module-services.service';

@Component({
  selector: 'app-create-user-master',
  templateUrl: './create-user-master.component.html',
  styleUrls: ['./create-user-master.component.scss']
})
export class CreateUserMasterComponent implements OnInit {
  

  dtOptions:DataTables.Settings = {};
  persons: any ;
  persons1: any ;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  constructor(private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_:UserModuleServicesService,
    private Logins1:Logins,
    private http:HttpClient,) { 
    
  }

  ngOnInit(): void {
    this.LodeDataTable()
    // this.dtOptions1 = {
    //   ajax: 'http://l-lin.github.io/angular-datatables/data/data.json',
    //   columns: [{
    //     title: 'ID',
    //     data: 'id'
    //   }, {
    //     title: 'First name',
    //     data: 'firstName'
    //   }, {
    //     title: 'Last name',
    //     data: 'lastName'
    //   }],
    //   // Declare the use of the extension in the dom parameter
    //   dom: 'Bfrtip',
    //   buttons:[{
    //     extend: 'excel',
    //     text: 'hello',
    //     exportOptions: {
    //       columns: ':visible'
    //     }}],
    //   // Configure the buttons
    //   responsive: true
    // };
  }

  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
     let query = `{
      userMasterData {
        userName
        userId
        upassword
        emailId
        mobileNo
        groupId
        accountStatus
        fromTime
        fromTimeAmPm
        toTime
        toTimeAmPm
        userImage
        creationDate
        cuserId
        modificationDate
        muserId
        recordstatus
        reasonForDeletion
        deletedDate
        duserCode
        userCode
        lastLoginDateTime
        reportingManager
      }
    }
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
return ss;

  }
  
  async LodeDataTable()
  {
    var data= await this.GETData("","");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

    this.persons= obj["data"]["userMasterData"]


    var result = [];


    for(let i in this.persons)
    {
      console.log([i,this.persons[i]]);
        result.push([i,this.persons[i]]);
      }

      for (var key in this.persons) {
        console.log(key);
        result.push(key);

    }
    
    this.headers = Object.keys(this.persons[1]);
   
  

        this.persons1=result;
        console.log(this.persons1);

        $(document).ready( function () {
         var dt= $('#example').DataTable({
          processing: true,
         
          dom: 'Bfrtip'
         
         
         
        });
         
      } );
      
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    
  }

}
