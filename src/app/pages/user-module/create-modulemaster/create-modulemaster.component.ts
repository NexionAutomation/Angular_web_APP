import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { UserModuleServicesService } from '../user-module-services.service';

@Component({
  selector: 'app-create-modulemaster',
  templateUrl: './create-modulemaster.component.html',
  styleUrls: ['./create-modulemaster.component.scss']
})
export class CreateModulemasterComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  public loginForm: FormGroup;
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      txtModuleName: new FormControl(null, Validators.required),
      txtModuleOrder: new FormControl(null, Validators.required),

    });

    this.LodeDataTable();

    this.persons
      .array.forEach(data => {
        this.persons = (data as any).data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

  }

  async onSubmit() {

    console.log('Email', this.loginForm.get('txtModuleName').value);
    console.log('Message', this.loginForm.get('txtModuleOrder').value);
   

    const { value: showConfirmButton } = await Swal.fire({
      title: 'Error!',
      text: 'Do you want to continue',
      icon: 'error',
      showConfirmButton:true,
      showCancelButton: true
    })
    
    if (showConfirmButton==true) {
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
      
      
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    }
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


    var result = [];


    // for(let i in this.persons)
    // {
    //   console.log([i,this.persons[i]]);
    //     result.push([i,this.persons[i]]);
    //   }

    //   for (var key in this.persons) {
    //     console.log(key);
    //     result.push(key);

    // }



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


  async loginByAuth(FormGroup: FormGroup) {
    if (this.loginForm.valid) {
      this.loginForm;
      //this.isAuthLoading = true;
      // await this.login.GETBYID(this.loginForm.get('email').value, this.loginForm.get('password').value);
      //this.isAuthLoading = false;
    } else {
      this.toastr.error('Form is not valid!');
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }
}
