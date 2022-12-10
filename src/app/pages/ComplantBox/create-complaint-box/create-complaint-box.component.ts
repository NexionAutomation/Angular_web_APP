import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { stringifyForDisplay } from '@apollo/client/utilities';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { getuid } from 'process';
import { map } from 'rxjs/operators';
import { Enumerable } from 'sharp-collections';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-complaint-box',
  templateUrl: './create-complaint-box.component.html',
  styleUrls: ['./create-complaint-box.component.scss']
})
export class CreateComplaintBoxComponent implements OnInit {

  public Output:any
  public Editor = ClassicEditor;

  
  public model;
  
  ActionFlag: number;
  chatRoomUid$: any;
  URLid: number;
  public test: string;
  
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.test=data
    console.log(data)
}

  ngOnInit(): void {



    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );


    if (this.chatRoomUid$.destination._value.id != undefined) {
      this.URLid = this.chatRoomUid$.destination._value.id;
      this.ActionFlag = 1;
      this.urlload(this.URLid);
      //console.log(this.URLid);
    }
    else {
      //this._router.navigate(['/SearchPo']);
      this.ActionFlag = 0;
    }
  }

  async urlload(STRING) {

     

    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);
    console.log(obj);

    var pOVwOutstationExpenseComments = Enumerable.from(obj["data"]["cmComplaintBoxHead"]).cast<any>();
    var data55=pOVwOutstationExpenseComments.where(x=>x.expenseId==this.URLid).select(x=>x.description).toArray();
  
    

    this.test= data55[0];
    

    

  }


  async GETData(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      cmComplaintBoxHead {
        createdBy
        createdOn
        description
        expenseId
        status
        tokennumber
        updateBy
        updateOn
      }
    }
     `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }

  async onSubmit() {
    try {
      if (this.ActionFlag == 0) {


        if (this.ActionFlag == 0) {
          const { value: showConfirmButton } = await Swal.fire({
            title: "Do You Want To Save",
            icon: 'question',
            //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

            showConfirmButton: true,
            showCancelButton: true
          })

          if (showConfirmButton == true) {

var data=new Date()
            var output = await this.INSERTHeader(
              0,
this.test,
"Submit",
"autogeneratted",
null,
this.Logins1.TMUserMaster.userCode,
 null,
0
            );

            // status Comment
            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);

            var outputFinal = obj["data"]["cmComplaintBoxHead"];

            // console.log(this.persons);
            //var datas = (this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1);
            // console.log(datas);

            // var output2 = await this.INSERTHeader(
            //   Number(datas),
            //   Number(this.loginForm.get('ddlstatus').value),


            //   this.Logins1.TMUserMaster.userCode,

            //   this.Logins1.TMUserMaster.userCode,
            //   this.loginForm.get('txtcomments').value
            //   ,

            //   1,
            //   "INSERT"
            // );


            // const myJSON2 = JSON.stringify(output2);
            // const obj2 = JSON.parse(myJSON2);

            // var outputFinal2 = obj2["data"]["cMExpenseStatusState"];


            // // status Comment



            if (outputFinal[0].message == "Success" ) {
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
              //this.LodeDataTable();

            } else {

              Swal.fire(
                'Failed',
                '',
                'error'
              )

            }


          }

        }


      }

      // if (this.ActionFlag == 1) {


      //   if (this.ActionFlag == 1) {
      //     const { value: showConfirmButton } = await Swal.fire({
      //       title: "Do You Want To Save",
      //       icon: 'question',
      //       //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

      //       showConfirmButton: true,
      //       showCancelButton: true
      //     })

      //     if (showConfirmButton == true) {


      //       var output = await this.INSERTHeader(
      //         Number(this.URLid),
      //         this.loginForm.get('txttitle').value,
      //         new Date(this.loginForm.get('txtfromdate').value),
      //         new Date(this.loginForm.get('txttodate').value),
      //         this.loginForm.get('txtworkorderno').value,
      //         this.loginForm.get('txtlocation').value,

      //         this.Logins1.TMUserMaster.userCode,

      //         this.Logins1.TMUserMaster.userCode,
      //         "UPDATE"
      //       );

      //       // status Comment
      //       const myJSON = JSON.stringify(output);
      //       const obj = JSON.parse(myJSON);

      //       var outputFinal = obj["data"]["cMExpenseHead"];

      //       // console.log(this.persons);
      //       //var datas=  (this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0)+1);
      //       // console.log(datas);

      //       var output2 = await this.INSERTStatus(
      //         Number(this.URLid),
      //         Number(this.loginForm.get('ddlstatus').value),


      //         this.Logins1.TMUserMaster.userCode,

      //         this.Logins1.TMUserMaster.userCode,
      //         this.loginForm.get('txtcomments').value
      //         ,

      //         1,
      //         "INSERT"
      //       );


      //       const myJSON2 = JSON.stringify(output2);
      //       const obj2 = JSON.parse(myJSON2);

      //       var outputFinal2 = obj2["data"]["cMExpenseStatusState"];


      //       // status Comment



      //       if (outputFinal[0].message == "Success" && outputFinal2[0].message == "Success") {
      //         const Toast = Swal.mixin({
      //           toast: true,
      //           position: 'top-end',
      //           showConfirmButton: false,
      //           timer: 3000,
      //           timerProgressBar: true,
      //           didOpen: (toast) => {
      //             toast.addEventListener('mouseenter', Swal.stopTimer)
      //             toast.addEventListener('mouseleave', Swal.resumeTimer)
      //           }

      //         })

      //         this.Logins1.popupStatus
      //         Toast.fire({
      //           icon: 'success',
      //           title: 'Data Update Successfully',


      //         })
      //         //this.LodeDataTable();

      //       } else {

      //         Swal.fire(
      //           'Failed',
      //           '',
      //           'error'
      //         )

      //       }


      //     }

      //   }


      // }
    
    } catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }

  }



   async INSERTHeader(
    expenseId: number,
description: String,
status: String,
tokennumber: String,
createdOn: Date,
createdBy: number,
updateOn: Date,
updateBy: number
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($expenseId: Long!, $description: String, $status: String, $tokennumber: String, $createdOn: DateTime, $createdBy: Int, $updateOn: DateTime, $updateBy: Int) {
      __typename
      cmComplaintBoxHead(triger: "INSERT",
        data: {detail: 
          {expenseId: $expenseId,
            createdBy: $createdBy,
            createdOn: $createdOn,
            description: $description,
            tokennumber: $tokennumber, 
            updateBy: $updateBy,
            updateOn: $updateOn,
            status: $status}}) {
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
        expenseId,
        description,
        status,
        tokennumber,
        createdOn,
        createdBy,
        updateOn,
        updateBy
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }

}
