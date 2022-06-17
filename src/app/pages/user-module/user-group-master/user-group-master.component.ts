import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserModuleServicesService } from '../user-module-services.service';


@Component({
  selector: 'app-user-group-master',
  templateUrl: './user-group-master.component.html',
  styleUrls: ['./user-group-master.component.scss']
})
export class UserGroupMasterComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  ActionFlag: any;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.ActionFlag=1;
   this.LodeDataTable();
    }

  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      pOTmGroupMasters {
        groupName
        creationDate
        cuserId
        modificationDate
        muserId
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

    this.persons = obj["data"]["pOTmGroupMasters"]


    var result = [];


    for (let i in this.persons) {

      result.push([i, this.persons[i]]);
    }

    for (var key in this.persons) {

      result.push(key);

    }

    this.headers = Object.keys(this.persons[1]);



    this.persons1 = result;

    $(document).ready(function () {
      var dt = $('#example').DataTable({
        processing: true,

        dom: 'Bfrtip',
        paging: false,
        lengthChange: true,
        responsive: true,


      });

    });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }

}
