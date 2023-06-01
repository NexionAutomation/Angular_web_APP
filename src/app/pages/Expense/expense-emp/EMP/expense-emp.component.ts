import { Logins } from '@/Model/Utility/login';
import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CMAdminModuleMasterUser, ExpenseItems } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-emp',
  templateUrl: './expense-emp.component.html',
  styleUrls: ['./expense-emp.component.scss']
})
export class ExpenseEmpComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any;
  pOVwOutstationExpenseComments2:any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;
  ExpenseItemsList: any;
  isDisabled: boolean;
  
  public loginForm: FormGroup;
  ActionFlag = 0;
  editData: CMAdminModuleMasterUser;
  arr: ExpenseItems[] = [];
  Expheaders: any;
  pOExpenseItems: any;
  file: any
  pOExpenseItemAttachmentss: any;
  displayStyle = "none";

  chatRoomUid$: any;
  URLid: any;
  pOExpenseHeadsdata: any;
  pOExpenseTypes:any
  pOExpenseItemssdata: any;
  pOExpenseStatusStatesData: any;
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


  ) {

  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({

      txttitle: new FormControl(),
      txtworkorderno: new FormControl(),
      txtlocation: new FormControl(),
      txtfromdate: new FormControl(),
      txttodate: new FormControl(),
      txtdate: new FormControl(),
      txtdescription: new FormControl(),
      ddlPaidby: new FormControl(),
      ddlExpenseType: new FormControl(),
      txtDistance: new FormControl(),
      txtamount: new FormControl(),
      txtParkingAmt: new FormControl(),
      btn_add: new FormControl(),
      btnUpload: new FormControl(),
      FileUpload1: new FormControl(),
      ddlstatus: new FormControl(),
      txtcomments: new FormControl(),
      txtstatus: new FormControl(),
      txtdescription1: new FormControl(),

    });



    this.LodeDataTable();


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
      this.URLid = 
      this.ActionFlag = 0;
    }






  }
  openPopup(event) {
    this.displayStyle = "block";
    console.log(event);
    $('#imagemodel').attr('src', 'http://app.nexionautomation.com/FileData/' + event);

    // console.log(event);
  }
  closePopup() {
    this.displayStyle = "none";
  }


  async urlload(STRING) {
    var data = await this.GETData2("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);
    console.log(obj);

    var pOVwOutstationExpenseComments = Enumerable.from(obj["data"]["pOVwOutstationExpenseComments"]).cast<any>();
     this.pOExpenseTypes = Enumerable.from(obj["data"]["pOExpenseTypes"]).cast<any>();
    var pOExpenseHeads = Enumerable.from(obj["data"]["pOExpenseHeads"]["nodes"]).cast<any>();
    var pOExpenseItemss = Enumerable.from(obj["data"]["pOExpenseItems"]).cast<any>();
    var pOExpenseStatusStates = Enumerable.from(obj["data"]["pOExpenseStatusStates"]).cast<any>();
    var pOExpenseItemAttachments = Enumerable.from(obj["data"]["pOExpenseItemAttachments"]).cast<any>();


    this.pOExpenseHeadsdata = pOExpenseHeads.where(x => x.expenseId == Number(STRING)).singleOrDefault();

    this.pOExpenseItemssdata = pOExpenseItemss.where(x => x.expenseId == Number(STRING)).toList();


    this.pOExpenseStatusStatesData = pOExpenseStatusStates.where(x => x.expenseId == Number(STRING)).toList();

    var pOExpenseStatusStatesData2 = pOExpenseStatusStates.where(x => x.expenseId == Number(STRING)).orderByDescending(x=>x.rid).take(1).singleOrDefault();



    this.loginForm.controls.txttitle.setValue(this.pOExpenseHeadsdata.title);
    this.loginForm.controls.txtworkorderno.setValue(this.pOExpenseHeadsdata.workOrderId);
    this.loginForm.controls.txtlocation.setValue(this.pOExpenseHeadsdata.location);
    this.loginForm.controls.txtfromdate.setValue(formatDate(this.pOExpenseHeadsdata.periodForm, 'yyyy-MM-dd', 'en'));
    this.loginForm.controls.txttodate.setValue(formatDate(this.pOExpenseHeadsdata.periodTo, 'yyyy-MM-dd', 'en'));
    this.loginForm.controls.ddlstatus.setValue(  pOExpenseStatusStatesData2.statusId);
    
    
    if( pOExpenseStatusStatesData2.statusId==4)
    {
      this.isDisabled=true;
    }
    
    var pOVwOutstationExpenseComments2=Enumerable.from(pOVwOutstationExpenseComments).cast<any>().where(x => x.expenseId == Number(this.URLid)).orderByDescending(a=>a.createdOn).toList();
    var result =  this.pOExpenseItemssdata
    .join(this.pOExpenseTypes, a => a.expenseTypeId, b => b.expenseTypeId)
    .where(s => s.left.expenseTypeId == s.right.expenseTypeId )
    // &&    s.left.groupId== s.right.groupId)
    .toList();

    console.log(result);
     this.persons=result;
     this.pOVwOutstationExpenseComments2=pOVwOutstationExpenseComments2;
    this.pOExpenseItems = result;
    this.pOExpenseItemAttachmentss = Enumerable.from(pOExpenseItemAttachments).cast<any>().where(x => x.expenseId == Number(this.URLid)).toList();
    ;



    this.LodeDatascema();

  }


  async INSERTHeader(
    expenseId: number,
    title: String,
    periodForm: Date,
    periodTo: Date,
    workOrderId: String,
    location: String,

    createdBy: number,

    updateBy: number,
    ActionStatus: string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($expenseId: Long!
      $title: String
      $periodForm: DateTime
      $periodTo: DateTime
      $workOrderId: String
      $location: String
      
      $createdBy: Int
    
      $updateBy: Int) {
      __typename
      cMExpenseHead(data: {detail:
        {expenseId: $expenseId,
          createdBy: $createdBy,
          createdOn: "2019-10-10",
          location: $location,
          periodForm: $periodForm,
          periodTo: $periodTo,
          title:$title,
          updateBy: $updateBy,
          updateOn: "2019-10-10",
          workOrderId: $workOrderId
        }, iD: "${expenseId}"}, triger: "${ActionStatus}") {
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
        title,
        periodForm,
        periodTo,
        workOrderId,
        location,

        createdBy,

        updateBy
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async INSERTITEMS(
    expenseId: number,
    date: Date,
    expenseTypeId: number,
    amount: number,
    approvedAmount: number,
    //createdOn: Date,
    createdBy: number,
    //updateOn: Date,
    updateBy: number,
    description: String,
    paidBy: String,
    distance: number,
    parkingAmt: number,
    amt: number,
    expenseItemsId: number,
    ActionStatus: string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation(
      $expenseId: Int
      $date: DateTime
      $expenseTypeId: Int
      $amount: Float
      $approvedAmount: Float
      $createdOn: DateTime
      $createdBy: Int
     
      $updateBy: Int
      $description: String
      $paidBy: String
      $distance: Float
      $parkingAmt: Float
      $amt: Float
      $expenseItemsId: Long!) {
      __typename
      cMExpenseItem(data: {detail: 
        {expenseItemsId: $expenseItemsId,
          approvedAmount: $approvedAmount,
          amount: $amount,
          amt: $amt,
          date: $date,
          description:$description,
          distance: $distance,
          expenseId: $expenseId,
          expenseTypeId: $expenseTypeId,
          paidBy: $paidBy,
          parkingAmt: $parkingAmt,
          updateBy: $updateBy,
          updateOn: "2019-10-10",
          createdOn: $createdOn,
          createdBy: $createdBy
        }, iD: "${expenseItemsId}"}, triger: "${ActionStatus}") {
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
        date,
        expenseTypeId,
        amount,
        approvedAmount,
        //createdOn: Date,
        createdBy,
        //updateOn: Date,
        updateBy,
        description,
        paidBy,
        distance,
        parkingAmt,
        amt,
        expenseItemsId,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async INSERTStatus(
    expenseId: number,
    statusId: number,
    //createdOn: Date,
    createdBy: number,
    //updateOn: Date,
    updateBy: number,
    comments: String,
    rid: number,
    ActionStatus: string
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation( $expenseId: Int
      $statusId: Int
     
      $createdBy: Int
     
      $updateBy: Int
      $comments: String
      $rid: Long!) {
      __typename
      cMExpenseStatusState(data: {detail:
        {rid: $rid, 
          comments: $comments,
          createdBy: $createdBy, 
          createdOn: "2019-10-10",
          expenseId: $expenseId,
          statusId: $statusId,
          updateBy: $updateBy,
          updateOn: "2019-10-10"
        }, iD: ""}, triger: "INSERT") {
        iD
        code
        message
        status
      }
    }
     
       `

    var datas = JSON.stringify({
      query, variables: {
        expenseId,
        statusId,
        //createdOn: Date,
        createdBy,
        //updateOn: Date,
        updateBy,
        comments,
        rid,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async INSERTAttach(
    moduleId: number,
    moduleName: String,
    moduleOrder: number,

    cuserId: number,

    muserId: number,
    rid: number,
    ActionStatus: string
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
  async GETData(User: string, Password: string): Promise<any> {
    const d = new Date();
    let day = d.getDate();
    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
      pOExpenseHeads(order: {expenseId: DESC, periodForm: DESC}, first: 5) {
        nodes {
          amount
          approvedAmount
          createdBy
          createdName
          createdOn
          expenseId
          location
          periodForm
          periodTo
          statusname
          statusId
          title
          updatedBy
          updatedName
          workOrderId
        }
      }
     
      pOExpenseItems {
        expenseId
        date
        expenseTypeId
        amount
        approvedAmount
        createdOn
        createdBy
        updateOn
        updateBy
        description
        paidBy
        distance
        parkingAmt
        amt
        expenseItemsId
      }
      pOExpenseStatusStates {
        expenseId
        statusId
        createdOn
        createdBy
        updateOn
        updateBy
        comments
        rid
      }
      pOExpenseItemAttachments {
        expenseId
        name
        contentType
        imagDescription
        createdBy
        createdOn
        attchmentId
      }

      pOVwOutstationExpenseComments {
        expenseId
        comments
        statusName
        userName
        createdOn
      }
    
    

    pOExpenseTypes {
      typeName
      egroupId
      createdOn
      createdBy
      updateOn
      updateBy
      rate
      amt
      km
      park
    }
  }
    
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }



 async LodeDatascema()
  {
   $('#example').DataTable().destroy();
   
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: false,
        search: true

      });

    });

    $('#example2').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example2').DataTable({

        dom: 'Bfrtip',
        paging: false,
        search: true

      });

    });

  }

  async GETData2(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
      pOExpenseHeads (where: {expenseId: {eq: ${ parseInt( this.URLid)}}}){
        nodes {
        title
        periodForm
        periodTo
        workOrderId
        location
        createdOn
        createdBy
       
        expenseId
        amount
        approvedAmount
        createdName
        statusId
        statusname
        updatedBy
        updatedName
        }
      }
      pOExpenseItems (where: {expenseId: {eq: ${ parseInt( this.URLid)}}}){
        expenseId
        date
        expenseTypeId
        amount
        approvedAmount
        createdOn
        createdBy
        updateOn
        updateBy
        description
        paidBy
        distance
        parkingAmt
        amt
        expenseItemsId
      }
      pOExpenseStatusStates (where: {expenseId: {eq: ${ parseInt( this.URLid)}}}) {
        expenseId
        statusId
        createdOn
        createdBy
        updateOn
        updateBy
        comments
        rid
      }
      pOExpenseItemAttachments (where: {expenseId: {eq: ${ parseInt( this.URLid)}}}) {
        attchmentId
        contentType
        createdBy
        createdOn
        expenseId
        imagDescription
        name
      }

      pOVwOutstationExpenseComments (where: {expenseId: {eq: ${ parseInt( this.URLid)}}}) {
        expenseId
        comments
        statusName
        userName
        createdOn
      }
    
    

    pOExpenseTypes {
      typeName
      egroupId
      createdOn
      createdBy
      updateOn
      updateBy
      rate
      amt
      km
      park
      expenseTypeId
    }


    }
    
    
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }

  async GETData3(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      __typename
     
      pOExpenseItemAttachments(where: {expenseId: {eq: ${parseInt( this.URLid)}}}) {
        attchmentId
        contentType
        createdBy
        createdOn
        expenseId
        imagDescription
        name
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

    this.persons = obj["data"]["pOExpenseHeads"]["nodes"];
    //this.pOExpenseItemAttachmentss = null;//obj["data"]["pOExpenseItemAttachments"]


    
    this.LodeDatascema();

  }


  async LodeDataheader() {
    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

    this.Expheaders = obj["data"]["pOExpenseHeads"]["nodes"];


  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }

  //----------------------------------CURD OPERATIONS-------------------------------------------------------------

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


            var output = await this.INSERTHeader(
              1,
              this.loginForm.get('txttitle').value,
              new Date(this.loginForm.get('txtfromdate').value),
              new Date(this.loginForm.get('txttodate').value),
              this.loginForm.get('txtworkorderno').value,
              this.loginForm.get('txtlocation').value,

              this.Logins1.TMUserMaster.userCode,

              this.Logins1.TMUserMaster.reportingManager,
              "INSERT"
            );

            // status Comment
            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);

            var outputFinal = obj["data"]["cMExpenseHead"];

            // console.log(this.persons);
            var datas = (this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1);
            // console.log(datas);

            var output2 = await this.INSERTStatus(
              Number(datas),
              Number(this.loginForm.get('ddlstatus').value),


              this.Logins1.TMUserMaster.userCode,

              this.Logins1.TMUserMaster.userCode,
              this.loginForm.get('txtcomments').value
              ,

              1,
              "INSERT"
            );


            const myJSON2 = JSON.stringify(output2);
            const obj2 = JSON.parse(myJSON2);

            var outputFinal2 = obj2["data"]["cMExpenseStatusState"];


            if (outputFinal[0].message == "Success" && outputFinal2[0].message == "Success") {
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

              this._router.navigate(['/','CreateExpOutView']);
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

      if (this.ActionFlag == 1) {


        if (this.ActionFlag == 1) {
          const { value: showConfirmButton } = await Swal.fire({
            title: "Do You Want To Save",
            icon: 'question',
            //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

            showConfirmButton: true,
            showCancelButton: true
          })

          if (showConfirmButton == true) {


            var output = await this.INSERTHeader(
              Number(this.URLid),
              this.loginForm.get('txttitle').value,
              new Date(this.loginForm.get('txtfromdate').value),
              new Date(this.loginForm.get('txttodate').value),
              this.loginForm.get('txtworkorderno').value,
              this.loginForm.get('txtlocation').value,

              this.Logins1.TMUserMaster.userCode,

              this.Logins1.TMUserMaster.reportingManager,
              "UPDATE"
            );

            // status Comment
            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);

            var outputFinal = obj["data"]["cMExpenseHead"];

       
            var output2 = await this.INSERTStatus(
              Number(this.URLid),
              Number(this.loginForm.get('ddlstatus').value),


              this.Logins1.TMUserMaster.userCode,

              this.Logins1.TMUserMaster.userCode,
              this.loginForm.get('txtcomments').value
              ,

              1,
              "INSERT"
            );


            const myJSON2 = JSON.stringify(output2);
            const obj2 = JSON.parse(myJSON2);

            var outputFinal2 = obj2["data"]["cMExpenseStatusState"];


            // status Comment



            if (outputFinal[0].message == "Success" && outputFinal2[0].message == "Success") {
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
              this._router.navigate(['/','CreateExpOutView']);
             

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
    } catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }

  }


  async onReset() {
    this.loginForm.reset();
    this.ActionFlag = 0;
  }

  async onedit(string: string) {
    this.editData = Enumerable.from(this.persons).cast<CMAdminModuleMasterUser>().where(x => x.rid == Number(string)).singleOrDefault();

    this.loginForm.setValue({
      txtModuleName: this.editData.moduleName,
      txtModuleOrder: this.editData.moduleOrder,

    });
    this.ActionFlag = 1;
  }

  //----------------------------------CURD OPERATIONS-------------------------------------------------------------






  async Add_ImageUplode($event) {
    try {


      var dataid = 0;

      if (this.ActionFlag == 0) { 
       
        dataid = Number(this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1)
        this.URLid=dataid;
      }
      else if (this.ActionFlag == 1) {
        dataid = this.URLid;


      }

      var output = this.uploadI(
        Number(dataid),
        "test",
        " test",
        this.loginForm.get('txtdescription1').value,
        1,
        new Date(Date.now()),
        0,
        this.file,
"INSERT"
      );

      
      this.attachedLoad();

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
          title: 'File Uloade Successfully',


        })
        //this.LodeDataTable();

      


      this.LodeDatascema();




     








    }
    catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }

  }


 async attachedLoad()
  {

    
    var data = await this.GETData3("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

    var datafe = Enumerable.from(obj["data"]["pOExpenseItemAttachments"]).cast<any>();
      
    
     var datas=datafe
    
   
    if (this.ActionFlag == 0) {
      var datass = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1)).toList();

    }
    else if (this.ActionFlag == 1) {
      var datass = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.URLid)).toList();
    }
   
    this.pOExpenseItemAttachmentss=datass;
  }

  async uploadI(
    expenseId: number,
    name: String,
    contentType: String,
    imagDescription: String,
    createdBy: number,
    createdOn: Date,
    attchmentId: number,
    files: File,
    ACTION:String

  ) {
    
    

    if(ACTION=="INSERT")
    {

      var operations = {
        query: `
  
  
      mutation MyMutation($file: Upload) {
        __typename
        cMExpenseItemAttachment07(data: 
          {detail:
            {attchmentId: ${attchmentId},
              contentType: "${contentType}",
              createdBy: ${createdBy},
              createdOn: "2019-10-10",
              expenseId: ${expenseId},
              imagDescription:"${imagDescription}",
              name: " ${name}"
            }}, file: $file, triger: "INSERT") {
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
  
  
      var file = files;
      var fd = new FormData()
      fd.append('operations', JSON.stringify(operations))
      fd.append('map', JSON.stringify(_map))
      fd.append('file', file, file.name)
  
  
  
      var ss = await this.Logins1.Graphqlfiledata("query", fd, file);

      return ss;
    }
    else if(ACTION=="DELETE")
    {
      
        let query= `
      mutation MyMutation {
        __typename
        cMExpenseItemAttachment07(data: 
          {detail:
            {attchmentId: ${attchmentId},
              contentType: "${contentType}",
              createdBy: ${createdBy},
              createdOn: "2019-10-10",
              expenseId: ${expenseId},
              imagDescription:"${imagDescription}",
              name: " ${name}"
            }}, triger: "DELETE") {
          code
          detail
          iD
          message
          status
        }
      }
      
      `

      var datas = JSON.stringify({
        query
      });


      var ss2 = await this.Logins1.GraphqlFetchdata("query", datas);
      return ss2;
    }
   





    
    

  }


  async upload($event) {

    this.file = $event.target.files[0];




  }


  async onDel(string: string) {
    try {

      var state = "Delete"
      if (state == state) {



        const { value: showConfirmButton } = await Swal.fire({
          title: "Are You Sure Want To Delete",
          icon: 'question',
          //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

          showConfirmButton: true,
          showCancelButton: true
        })

        if (showConfirmButton == true) {


          var output =
            await this.INSERTITEMS(
              0,
              this.loginForm.get('txtdate').value,
              Number(this.loginForm.get('ddlExpenseType').value),
              this.loginForm.get('txtamount').value,
              0,
              //createdOn: Date,
              this.Logins1.TMUserMaster.userCode,
              //updateOn: Date,
              this.Logins1.TMUserMaster.userCode,
              this.loginForm.get('txtdescription').value,
              this.loginForm.get('ddlPaidby').value,
              this.loginForm.get('txtDistance').value,
              this.loginForm.get('txtParkingAmt').value,
              0,
              Number(string),
              "DELETE");


          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);

          var outputFinal = obj["data"]["cMExpenseItem"];


          if (outputFinal[0].message == "Success") {
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

            var data = await this.GETData2("", "");
            const myJSON = JSON.stringify(data);
            const obj = JSON.parse(myJSON);

            var datafe = Enumerable.from(obj["data"]["pOExpenseItems"]).cast<any>();
        
       var pOExpenseTypes = Enumerable.from(obj["data"]["pOExpenseTypes"]).cast<any>();



      
            var datas;
            if (this.ActionFlag == 0) {
              datas = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1)).toList();

            }
            else if (this.ActionFlag == 1) {
              datas = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.URLid)).toList();


            }


            var result =  datas
        .join(pOExpenseTypes, a => a.expenseTypeId, b => b.expenseTypeId)
        .where(s => s.left.expenseTypeId == s.right.expenseTypeId  )
        // &&    s.left.groupId== s.right.groupId)
        .toList();
            this.pOExpenseItems = result;

this.LodeDatascema();

          } else {

            Swal.fire(
              'Failed ',
              '',
              'error'
            )

          }


        }

      }


    }
    catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }
  }
  async onDelI(string: string) {
    try {

      var state = "DELETE"
      if (state == state) {



        const { value: showConfirmButton } = await Swal.fire({
          title: "Are You Sure Want To Delete",
          icon: 'question',
          //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

          showConfirmButton: true,
          showCancelButton: true
        })

        if (showConfirmButton == true) {


          var output =
            await this.uploadI(
              0,
              "test",
              " test",
              this.loginForm.get('txtdescription1').value,
              1,
              new Date(Date.now()),
              Number(string),
              null,
              "DELETE"
      
            );


            


          const myJSON = JSON.stringify(output);
          const obj = JSON.parse(myJSON);

          var outputFinal = obj["data"]["cMExpenseItemAttachment07"];


          if (outputFinal[0].message == "Success") {
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

            var data = await this.GETData3("", "");
            const myJSON = JSON.stringify(data);
            const obj = JSON.parse(myJSON);
      
            var datafe = Enumerable.from(obj["data"]["pOExpenseItemAttachments"]).cast<any>();
        
       

        
         var datas=datafe
           
            if (this.ActionFlag == 0) {
              var datass = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1)).toList();
      
            }
            else if (this.ActionFlag == 1) {
              var datass = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.URLid)).toList();
            }
           
           
            

            this.pOExpenseItemAttachmentss=datass;



            $('#example2').DataTable().destroy();
            $(document).ready(function () {
        
              this.dtOptions = $('#example2').DataTable({
        
                dom: 'Bfrtip',
                paging: false,
                search: true
        
              });
        
            });



          } else {

            Swal.fire(
              'Failed ',
              '',
              'error'
            )

          }


        }

      }


    }
    catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }
  }
  async Add_items() {
    try {
      var output = null;
      var expid = 0;
      console.log(this.persons);
      if (this.ActionFlag == 0) {
        console.log(this.persons);
        expid = Number(this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1);
        this.URLid=  expid;
      }
      else {
        expid = this.URLid;

      }

      var output = await this.INSERTITEMS(
        Number(expid),
        this.loginForm.get('txtdate').value,
        Number(this.loginForm.get('ddlExpenseType').value),
        this.loginForm.get('txtamount').value,
        0,
        //createdOn: Date,
        this.Logins1.TMUserMaster.userCode,
        //updateOn: Date,
        this.Logins1.TMUserMaster.userCode,
        this.loginForm.get('txtdescription').value,
        this.loginForm.get('ddlPaidby').value,
        this.loginForm.get('txtDistance').value,
        this.loginForm.get('txtParkingAmt').value,
        0,
        0,
        "INSERT");









      const myJSON = JSON.stringify(output);
      const obj = JSON.parse(myJSON);

      var outputFinal = obj["data"]["cMExpenseItem"];


      if (outputFinal[0].message == "Success") {
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
          title: 'Data ADD Successfully',


        })


        var data = await this.GETData2("", "");
        const myJSON = JSON.stringify(data);
        const obj = JSON.parse(myJSON);

        //var datafe = obj["data"]["pOExpenseItems"];

        var datafe = Enumerable.from(obj["data"]["pOExpenseItems"]).cast<any>();
        
       var pOExpenseTypes = Enumerable.from(obj["data"]["pOExpenseTypes"]).cast<any>();

         
         var datas=datafe
        if (this.ActionFlag == 0) {
          datas = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.persons.reduce((oa, u) => Math.max(oa, u.expenseId), 0) + 1)).toList();

        }
        else if (this.ActionFlag == 1) {
          datas = Enumerable.from(datafe).cast<any>().where(x => x.expenseId == Number(this.URLid)).toList();


        }
        



        var result =  datas
        .join(pOExpenseTypes, a => a.expenseTypeId, b => b.expenseTypeId)
        .where(s => s.left.expenseTypeId == s.right.expenseTypeId  )
        // &&    s.left.groupId== s.right.groupId)
        .toList();
        this.pOExpenseItems = result;

      }



      //---------------------------important code---------------------
      // // console.log();
      // const  datain=[{key:
      //       {


      //          expenseId: 0,
      // 	 expenseTypeId: Number(this.loginForm.get('ddlExpenseType').value),
      // 	 amount:  Number(this.loginForm.get('txtamount').value),
      // 	 approvedAmount: 1,
      // 	 createdBy: 1,
      // 	 updateBy: 1,
      // 	 description: this.loginForm.get('txtdescription').value,
      // 	 paidBy: this.loginForm.get('ddlPaidby').value,
      // 	 distance: Number(this.loginForm.get('txtDistance').value),
      // 	 parkingAmt: Number(this.loginForm.get('txtParkingAmt').value),
      // 	 aMt: Number(this.loginForm.get('ddlExpenseType').value),
      // 	 expenseItemsId: Number(uniqId()) ,
      //     Date:new Date(this.loginForm.get('txtdate').value)
      //   }}] as unknown as ExpenseItems;

      //    this.arr.push(datain);


      // const sorted = this.arr.sort((a, b) => a.expenseItemsId - b.expenseItemsId);

      //---------------------------important code---------------------

      this.LodeDatascema();

    } catch (error) {
      Swal.fire(
        'Failed',
        error,
        'error')
    }

  }


}

export function hashCode(s) {
  for (var i = 0, h = 0; i < s.length; i++)
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}

const uniqId = (() => {
  let i = 0;
  return () => {
    return i++;
  }
})();