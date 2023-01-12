import { Logins } from '@/Model/Utility/login';
import { formatDate, NumberSymbol } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CMAdminModuleMasterUser, ExpenseItems, pOTmPurchaseBodies, TM_CompanyMaster, TM_CountryMaster, TM_PurchaseHead, Tm_supplierMaster } from '@modules/Module/PoModules';
import { CM_AdminModuleMaster } from '@pages/user-module/create-modulemaster/create-modulemaster.component';
//import { UserModuleServicesService } from '@pages/user-module/user-module-services.service';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enumerable, List } from 'sharp-collections';
import Swal from 'sweetalert2';
//import { SearchPoComponent } from '../search-po/search-po.component';

@Component({
  selector: 'app-create-po',
  templateUrl: './create-po.component.html',
  styleUrls: ['./create-po.component.scss']
})
export class CreatePOComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any;
  persons1: any;
  dtTrigger: Subject<any> = new Subject<any>();
  headers: any;
  CM_AdminModuleMaster: CM_AdminModuleMaster;
  ExpenseItemsList: any;
  datevalue:any;
  public loginForm: FormGroup;
  ActionFlag = 0;
  editData: CMAdminModuleMasterUser;
  editDataID:any;
  arr: ExpenseItems[] = [];
   arr2=new Array() ;
   edititems:boolean;
   poid:number
  

  POTmSupplierMasters: Enumerable<Tm_supplierMaster>;
  POTmCompanyMasters: Enumerable<TM_CountryMaster>;
  chatRoomUid$: any;
  public URLid: number;
  pOExpenseItems: any;
  pOTmPurchaseHeads: any;
  pOTmPurchaseBodiess: Enumerable<pOTmPurchaseBodies>;
  loginForm2: any;
  shown: boolean;
  shown2: boolean;
  Attand: any;
  isDisplay: boolean;

  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    //private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router:Router

  ) {

  }

   ngOnInit(): void {




    this.edititems=false
   

    this.loginForm = new FormGroup({

      ddlcompanyname: new FormControl(null),
      ddlsuppliername: new FormControl(null),
      txtorderdate: new FormControl(null),
      txtpaymentterms: new FormControl(null),
      txtindentno: new FormControl(null),
      txtfreightterms: new FormControl(null),
      txtorderno: new FormControl(null),
      txtgst: new FormControl(null),
      txtdelivery: new FormControl(null),
      chkuplaod: new FormControl(null),
      chklot: new FormControl(null),
      Drop_gst: new FormControl(null),
      DropDownList1: new FormControl(null),
      gst_rdo: new FormControl(null),
      btnsearch: new FormControl(null),
      txtdescription: new FormControl(null),
      txtcat: new FormControl(null),
      ddluom: new FormControl(null),
      txtqty: new FormControl(null),
      txtlistprice: new FormControl(null),
      txtdiscount: new FormControl(null),
      btn_add: new FormControl(null),
      txtremarks: new FormControl(null),
      txttotal: new FormControl(null),
      txtenduser: new FormControl(null),
      ddldelivery: new FormControl(null),
      ddlMake: new FormControl(null),

    });

    

    this.currentdatepicker()
    this.LodeDataTable();


    
    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );


    if (this.chatRoomUid$.destination._value.id != undefined) {
      this.URLid = this.chatRoomUid$.destination._value.id;
      this.ActionFlag = 1;
       this.urlload( this.URLid);
      //console.log(this.URLid);
    }
    else {
      //this._router.navigate(['/SearchPo']);
      this.ActionFlag = 0;
    }
    



  }



  mouseEnter(data : boolean, id:string,identity:string){

    var idname='label_'+identity+id
document.getElementById(identity+id).style.display = 'inline';
document.getElementById(  idname).style.display = 'none';

    
 }
 async Tabledatachange(id:string,status :string)
 {
  const { value: showConfirmButton } = await Swal.fire({
    title: "Are You Sure Want To Update",
    icon: 'question',
    //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

    showConfirmButton: true,
    showCancelButton: true
  })
  if(showConfirmButton==true)
  {
    let val =(<HTMLInputElement>document.getElementById(status+id)).value;
  
    var data= Enumerable.from( this.pOExpenseItems).cast<pOTmPurchaseBodies>().toArray();
    
    switch(status) { 
      case "desc": { 
        alert(val)
       data.filter(a=>a.id== parseInt( id)).map(a=>a.description=val)
         //statements; 
         break; 
      } 
      case "catname": { 
        data.filter(a=>a.id== parseInt( id)).map(a=>a.catname=val)
         //statements; 
         break; 
      } 
      case "make": { 
        data.filter(a=>a.id== parseInt( id)).map(a=>a.make=val)
        //statements; 
        break; 
     } 
     case "qty": { 
      data.filter(a=>a.id== parseInt( id)).map(a=>a.qty= Number( val))

      data.filter(a=>a.id== parseInt( id)).map(a=>a.unitPrice= Number(a.listPrice - (a.listPrice * a.dis) / 100))
      data.filter(a=>a.id== parseInt( id)).map(a=>a.netPrice= a.qty  * Number(a.listPrice - (a.listPrice * a.dis) / 100))
      
      this.loginForm.controls.txttotal.setValue(Math.round( Enumerable.from( data).sum(x=>x.netPrice)));
      //statements; 
      break; 
        } 
     case "listPrice": { 
      data.filter(a=>a.id== parseInt( id)).map(a=>a.listPrice= Number(val))

      data.filter(a=>a.id== parseInt( id)).map(a=>a.unitPrice= Number(a.listPrice - (a.listPrice * a.dis) / 100))
      data.filter(a=>a.id== parseInt( id)).map(a=>a.netPrice= a.qty  * Number(a.listPrice - (a.listPrice * a.dis) / 100))
      
      this.loginForm.controls.txttotal.setValue(Math.round( Enumerable.from( data).sum(x=>x.netPrice)));
      
          //statements; 
          break; 
            } 
     case "dis": { 
      data.filter(a=>a.id== parseInt( id)).map(a=>a.dis= Number(val))
      data.filter(a=>a.id== parseInt( id)).map(a=>a.unitPrice= Number(a.listPrice - (a.listPrice * a.dis) / 100))
      data.filter(a=>a.id== parseInt( id)).map(a=>a.netPrice= a.qty  * Number(a.listPrice - (a.listPrice * a.dis) / 100))
      
      this.loginForm.controls.txttotal.setValue(Math.round( Enumerable.from( data).sum(x=>x.netPrice)));
      
      
              //statements; 
              break; 
                } 
      default: { 
         //statements; 
         break; 
      } 
   } 
    
   var FinalDataFetch = Enumerable.from( this.pOExpenseItems).cast<any>()

   var data234=FinalDataFetch.where(a=>a.id==id).singleOrDefault();
    var output=
      await this.INSERTITEMS( Number(this.URLid),
      data234.description,
      data234.uom ,
      data234.qty  ,
      data234.listPrice ,
      data234.dis ,
      //createdOn: Date,
      data234.unitPrice ,
    //updateOn: Date,
    data234.netPrice ,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
   
     this.Logins1.TMUserMaster.userCode,
     this.Logins1.TMUserMaster.userCode,
    data234.catname ,
    data234.id,
    data234.make,
    "UPDATE");
     }
     
    
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmPurchaseBody"];

       
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

  }

 }

 mouseLeave(data : boolean, id:string,identity:string){
  var idname='label_'+identity+id
  document.getElementById(identity+id).style.display = 'none';
  document.getElementById(  idname).style.display = 'inline';
 }

  async INSERTHeader(
    poId: number,
    companyId: number,
    supplierId: number,
    orderDate: Date,
    paymentTerms: String,
    indentNo: String,
    freightTerms: String,
    workOrderNo: String,
    gst: String,
    deliveryDate: Date,
    remarks: String,
    total: number,
    enduser: String,
    creationDate: Date,
    cuserId: number,
    modificationDate: Date,
    muserId: number,
    deliveryMode: String,
    id: number,
    ActionStatus: string,
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation(
      $poId: Int
      $companyId: Int
      $supplierId: Int
      $orderDate: DateTime
      $paymentTerms: String
      $indentNo: String
      $freightTerms: String
      $workOrderNo: String
      $gst: String
      $deliveryDate: DateTime
      $remarks: String
      $total: Float
      $enduser: String
      $creationDate: DateTime
      $cuserId: Int
      $modificationDate: DateTime
      $muserId: Int
      $deliveryMode: String
      $id: Int) {
      __typename
      cMTmPurchaseHead(data: {detail:
        {
          companyId: $companyId,
          creationDate: $creationDate,
          cuserId: $cuserId, 
          deliveryDate: $deliveryDate, 
          deliveryMode: $deliveryMode,
          enduser: $enduser,
          freightTerms:$freightTerms,
          gst: $gst, 
          id: $id,
          indentNo: $indentNo,
          modificationDate: $modificationDate,
          muserId: $muserId,
          orderDate: $orderDate,
          paymentTerms: $paymentTerms, 
          poId: $poId,
          remarks: $remarks, 
          supplierId: $supplierId,
          total:$total,
          workOrderNo: $workOrderNo
        }, iD: "${poId}"}, triger: "${ActionStatus}")
        { 
          iD
          code
          message
          status
          detail
        }
    }
    
       `

    var datas = JSON.stringify({
      query, variables: {
        poId,
        companyId,
        supplierId,
        orderDate,
        paymentTerms,
        indentNo,
        freightTerms,
        workOrderNo,
        gst,
        deliveryDate,
        remarks,
        total,
        enduser,
        creationDate,
        cuserId,
        modificationDate,
        muserId,
        deliveryMode,
        id,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async INSERTITEMS(
    
    poId: number,
description: String,
uom: String,
qty: number,
listPrice: number,
dis: number,
unitPrice: number,
netPrice: number,
// creationDate: Date,
cuserId: number,
// modificationDate: Date,
muserId: number,

catname: String,
id: number,
make:string,
    ActionStatus: string
    
  ) {

    //var user= (Number)parseInt(this.Logins1.TM_UserMaster.User_Code.);


    let query = `mutation MyMutation($poId: Int
      $description: String
      $uom: String
      $qty: Int
      $listPrice: Float
      $dis: Float
      $unitPrice: Float
      $netPrice: Float
     
      $cuserId: Int
      
      $muserId: Int
      $id: Decimal!,
      
      $catname: String,
      $make:String) {
      __typename
      cMTmPurchaseBody(data: {detail:
        {id: $id,
          catname: $catname,
          creationDate: "2019-10-10",
          cuserId: $cuserId,
          description: $description,
          dis: $dis,
          listPrice: $listPrice,
          modificationDate: "2019-10-10",
          muserId: $muserId,
          netPrice: $netPrice,
          poId: $poId,
          qty: $qty,
          unitPrice: $unitPrice, 
          make:$make
          uom: $uom}, iD: "${id}"}, triger: "${ActionStatus}") {
        iD
        code
        message
        status
      }
    }
         
       `

    var datas = JSON.stringify({
      query, variables: {
        poId,
        description,
        uom,
        qty,
        listPrice,
        dis,
        unitPrice,
        netPrice,
        // creationDate,
        cuserId,
        // modificationDate,
        muserId,
        make,
        catname,
        id,
      }
    });
    var ss = await this.Logins1.GraphqlFetchdata("query", datas);

    return ss;
  }
  async INSERTStatus(
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

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery {
      pOTmSupplierMasters {
        id
        address1
        address2
        address3
        cmobileNo
        contactPerson
        creationDate
        cuserId
        gst
        modificationDate
        muserId
        recordStatus
        supplierName
      }
      pOTmCompanyMasters {
        caddress1
        caddress2
        caddress3
        cemailId
        cmobileNo
        companyName
        cphoto
        creationDate
        cuserId
        cwebsite
        deletedDate
        duserCode
        iaddress1
        iaddress2
        iaddress3
        id
        imobileNo
        igst
        iname
        ipanNo
        modificationDate
        muserId
        reasonForDeletion
        recordstatus
        saddress1
        saddress2
        saddress3
        sattendentName
        smobileNo
        sname
        spanNo
      }
      pOTmPurchaseHeads(order: {id: DESC, deliveryDate: DESC}, first: 5) {
        nodes {
          id
          companyId
          creationDate
          cuserId
          deliveryDate
          deliveryMode
          enduser
          freightTerms
          gst
          indentNo
          modificationDate
          muserId
          orderDate
          paymentTerms
          poId
          remarks
          supplierId
          total
          workOrderNo
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
      pOTmPurchaseBodies (where: {poId: {eq: ${  this.URLid="undefined"?null:this.URLid}}}){
        id
        catname
        creationDate
        cuserId
        description
        dis
        listPrice
        modificationDate
        muserId
        netPrice
        poId
        qty
        unitPrice
        uom,
        make
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

    this.POTmSupplierMasters = Enumerable.from(obj["data"]["pOTmSupplierMasters"]).cast<Tm_supplierMaster>();
    this.POTmCompanyMasters = Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<TM_CountryMaster>();
    this.pOTmPurchaseHeads = Enumerable.from(obj["data"]["pOTmPurchaseHeads"]["nodes"]).cast<TM_PurchaseHead>();;
    this.pOTmPurchaseBodiess = Enumerable.from(obj["data"]["pOTmPurchaseBodies"]);


    
this.datatableload();
   

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

  }


  async datatableload()
  {
    $('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: false

      });

    });

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
             this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1,
              Number(this.loginForm.get("ddlcompanyname").value),
              Number(this.loginForm.get("ddlsuppliername").value),
              new Date(this.loginForm.get("txtorderdate").value),
              this.loginForm.get("txtpaymentterms").value,
              this.loginForm.get("txtindentno").value,
              this.loginForm.get("txtfreightterms").value,
              this.loginForm.get("txtorderno").value,
              this.loginForm.get("txtgst").value,
              new Date( this.loginForm.get("txtdelivery").value),
              this.loginForm.get("txtremarks").value,
              this.loginForm.get("txttotal").value,
              this.loginForm.get("txtenduser").value,
              new Date(Date.now()),
              this.Logins1.TMUserMaster.userCode
              ,
              new Date(Date.now()),
              this.Logins1.TMUserMaster.userCode,
              this.loginForm.get("ddldelivery").value,
              0,
              "INSERT"
            );



            


            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);

            var outputFinal = obj["data"]["cMTmPurchaseHead"];
            

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
                title: 'Data Create Successfully',


              })
              this._router.navigate(['/SearchPo'])

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
            title: "Do You Want To Update",
            icon: 'question',
            //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

            showConfirmButton: true,
            showCancelButton: true
          })

          if (showConfirmButton == true) {


            var output =  await this.INSERTHeader(
              Number(this.URLid),
              this.loginForm.get("ddlcompanyname").value,
              Number(this.loginForm.get("ddlsuppliername").value),
              new Date(this.loginForm.get("txtorderdate").value),
              this.loginForm.get("txtpaymentterms").value,
              this.loginForm.get("txtindentno").value,
              this.loginForm.get("txtfreightterms").value,
              this.loginForm.get("txtorderno").value,
              this.loginForm.get("txtgst").value,
              new Date( this.loginForm.get("txtdelivery").value),
              this.loginForm.get("txtremarks").value,
              this.loginForm.get("txttotal").value,
              this.loginForm.get("txtenduser").value,
              new Date(Date.now()),
              this.Logins1.TMUserMaster.userCode
              ,
              new Date(Date.now()),
              this.Logins1.TMUserMaster.userCode,
              this.loginForm.get("ddldelivery").value,
              this.poid,
              "UPDATE"
            );

            const myJSON = JSON.stringify(output);
            const obj = JSON.parse(myJSON);

            var outputFinal = obj["data"]["cMTmPurchaseHead"];



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
                title: 'Data Update Successfully',


              })
              //this.LodeDataTable();
              //this.ActionFlag = 1;
              //this.onReset();
              this._router.navigate["/SearchPo"];
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


  async RemoveElementFromStringArray(element: string) {
    this.arr2.forEach((value,index)=>{
        if(index==Number(element)) this.arr2.splice(index,1);
        
    });
    
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


        var output = 
        await this.INSERTITEMS( 0,
        this.loginForm.get('txtdescription').value,
        this.loginForm.get('ddluom').value ,
        this.loginForm.get('txtqty').value,
        this.loginForm.get('txtlistprice').value,
        this.loginForm.get('txtdiscount').value,
       //createdOn: Date,
       0,
       //updateOn: Date,
       0,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
      
       this.Logins1.TMUserMaster.userCode,
       this.Logins1.TMUserMaster.userCode,
       this.loginForm.get('txtcat').value,
       Number(string),
       this.loginForm.get('ddlMake').value,
       
       "DELETE");
   
    
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmPurchaseBody"];

       
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
            
            var data = await this.GETData2("", "");
            const myJSON = JSON.stringify(data);
            const obj = JSON.parse(myJSON);
        
            var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
            console.log(pOTmPurchaseBodies);
            // var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1)).toList();
            var datas;

            if(this.ActionFlag==0) {
               datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1)).toList();
        
            }else if(this.ActionFlag==1)
            {
               datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.URLid)).toList();
        
            }

           
            this.pOExpenseItems=datas;

            this.loginForm.controls.txttotal.setValue(Math.round(datas.sum(x=>x.netPrice)));
            this.datatableload();

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


async onDelExcel(string :string)
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




       
     
      
      var data3 = Enumerable.from(this.Attand).toArray();
     var data4= data3.splice( parseInt( string),1)
      this.Attand=data3
          if("Success"=="Success")
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

            $('#example2').DataTable().destroy();
            $(document).ready(function () {
        
              this.dtOptions = $('#example2').DataTable({
        
                dom: 'Bfrtip',
                paging: true
        
              });
        
            });

         

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



  checked(value){
    var element = <HTMLInputElement> document.getElementById("abc");
var isChecked = element.checked;
    
    if(isChecked==true){
      this.shown= true;
    }
    else if(isChecked==false)
      this.shown= false;
  }

  checked2(value){
    var element = <HTMLInputElement> document.getElementById("abc2");
var isChecked = element.checked;
    
    if(isChecked==true){
      this.shown2= true;
    }
    else if(isChecked==false)
      this.shown2= false;
  }

  async upload($event) {



    const { value: showConfirmButton } = await Swal.fire({
      title: "Are You Sure  Want To Uplode Excel",
      icon: 'question',
      //html: '<div class="alert alert-success" role="alert">Do You Want To Save</div>',

      showConfirmButton: true,
      showCancelButton: true
    })


  
  if(showConfirmButton==true)
  {
    
    var operations = {
      query: `
      query MyQuery($file: Upload) {
        uploadFileExcel(files: $file) {
        
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
  
  
  
   var ret= await this.Logins1.Graphqlfiledata("query1", fd, file);
  
  
   const myJSON = JSON.stringify(ret);
   
   const obj = JSON.parse(myJSON);
  
  
   var outputFinal = obj["data"]["uploadFileExcel"];
  
   this.Attand=outputFinal;
  
  
   $('#example2').DataTable().destroy();
   $(document).ready(function () {
  
     this.dtOptions = $('#example2').DataTable({
  
       dom: 'Bfrtip',
       paging: true
  
     });
  
   });

  }
  
   
  }

  async Add_itemsUplodeExcel()
  {try
    {
        var output = null;
  
      var output= this.pOTmPurchaseHeads;
      this.pOTmPurchaseHeads= Enumerable.from(this.pOTmPurchaseHeads).toArray();
       
       if(this.ActionFlag==0)
       {
        this.URLid=Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1);
        var  exceldata2=  this.Attand;
          var ind=0;
        
          exceldata2.forEach(async a =>{
        var output=await this.INSERTITEMS( 
          Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1),
          a.t1,
        a.t3,
        Number( a.t5),
        Number(a.t6),
          Number(a.t7),
           //createdOn: Date,
           Number( a.t8),//unitdata1,
         //updateOn: Date,
         Number(a.t9),//netdata,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
        
         this.Logins1.TMUserMaster.userCode,
         this.Logins1.TMUserMaster.userCode,
         a.t2,
         0,
         a.t4,
         
         "INSERT")
          });

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

          this.Attand=null;

       }
       
  
  
        if(this.ActionFlag==1) {
          var  exceldata2=  this.Attand;
          var ind=0;
        
          exceldata2.forEach(async a =>{
           
        await this.INSERTITEMS( Number(this.URLid),
         a.t1,
        a.t3,
        Number( a.t5),
        Number(a.t6),
          Number(a.t7),
           //createdOn: Date,
           Number( a.t8),//unitdata1,
         //updateOn: Date,
         Number(a.t9),//netdata,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
        
         this.Logins1.TMUserMaster.userCode,
         this.Logins1.TMUserMaster.userCode,
         a.t2,
         0,
         a.t4,
      "INSERT");
      ind++;
          })

          this.Attand=null;
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

          //this.Attand=null;
       }
       
      
  
         
            if("Success"=="Success")
            {
              var data = await this.GETData2("", "");
              const myJSON = JSON.stringify(data);
              const obj = JSON.parse(myJSON);
          
              var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
              console.log(pOTmPurchaseBodies);
              if(this.ActionFlag==0) {
                var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1)).toList();
          
              }else if(this.ActionFlag==1)
              {
                var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.URLid)).toList();
          
              }
              
            
              console.log(datas);
              this.pOExpenseItems=datas;
  
  
              this.loginForm.controls.txttotal.setValue(Math.round(datas.sum(x=>x.netPrice)));
            
              this.datatableload();
            }
      
       
  }catch(error)
  {
    Swal.fire(
      'Failed',
      error,
      'error')
  }
  
  }


async Add_items()
{try
  {
      var output = null;

     console.log(this.loginForm.get('txtlistprice').value);
    
     var unitdata= this.loginForm.get('txtlistprice').value - (this.loginForm.get('txtlistprice').value * this.loginForm.get('txtdiscount').value) / 100;
     var netdata= this.loginForm.get('txtqty').value  * Number(unitdata);

     if(this.loginForm.get('chklot').value==true)
     {
       netdata= unitdata;
     }


    var output= this.pOTmPurchaseHeads;
    this.pOTmPurchaseHeads= Enumerable.from(this.pOTmPurchaseHeads).toArray();
     
     if(this.ActionFlag==0)
     {
      this.URLid=Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1);
      var output=
      
      await this.INSERTITEMS(  Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1),
     this.loginForm.get('txtdescription').value,
     this.loginForm.get('ddluom').value ,
     this.loginForm.get('txtqty').value,
     this.loginForm.get('txtlistprice').value,
     this.loginForm.get('txtdiscount').value,
      //createdOn: Date,
    unitdata,
    //updateOn: Date,
    netdata,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
   
    this.Logins1.TMUserMaster.userCode,
    this.Logins1.TMUserMaster.userCode,
    this.loginForm.get('txtcat').value,
    0,
    this.loginForm.get('ddlMake').value,
    
    "INSERT");
     }


      if(this.ActionFlag==1) {

      var output=
      await this.INSERTITEMS( Number(this.URLid),
     this.loginForm.get('txtdescription').value,
     this.loginForm.get('ddluom').value ,
     this.loginForm.get('txtqty').value,
     this.loginForm.get('txtlistprice').value,
     this.loginForm.get('txtdiscount').value,
      //createdOn: Date,
    unitdata,
    //updateOn: Date,
    netdata,//(this.loginForm.get('txtlistprice').value)/(this.loginForm.get('txtqty').value/this.loginForm.get('txtdiscount').value/100),
   
    this.Logins1.TMUserMaster.userCode,
    this.Logins1.TMUserMaster.userCode,
    this.loginForm.get('txtcat').value,
    0,
    this.loginForm.get('ddlMake').value,
    "INSERT");
     }
     
    
        const myJSON = JSON.stringify(output);
        const obj = JSON.parse(myJSON);
    
        var outputFinal = obj["data"]["cMTmPurchaseBody"];

       
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
              title: 'Data ADD Successfully',


            })


            var data = await this.GETData2("", "");
            const myJSON = JSON.stringify(data);
            const obj = JSON.parse(myJSON);
        
            var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
            console.log(pOTmPurchaseBodies);
            if(this.ActionFlag==0) {
              var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.pOTmPurchaseHeads.reduce((oa, u) => Math.max(oa, u.poId), 0)+1)).toList();
        
            }else if(this.ActionFlag==1)
            {
              var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(this.URLid)).toList();
        
            }
            
          
            console.log(datas);
            this.pOExpenseItems=datas;


            this.loginForm.controls.txttotal.setValue(Math.round(datas.sum(x=>x.netPrice)));
          
            this.datatableload();
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



}catch(error)
{
  Swal.fire(
    'Failed',
    error,
    'error')
}

}

async GETData2(User: string, Password: string): Promise<any> {

  let data = '{User="' + User + '",Password="' + Password + '" }';
  let query = `query MyQuery {
    __typename
    pOTmPurchaseHeads(where: {poId: {eq: ${this.URLid}}}) {
      nodes {
        id
        companyId
        creationDate
        cuserId
        deliveryDate
        deliveryMode
        enduser
        freightTerms
        gst
        indentNo
        modificationDate
        muserId
        orderDate
        paymentTerms
        poId
        remarks
        supplierId
        total
        workOrderNo
      }
    }
    pOTmPurchaseBodies(where: {poId: {eq: ${this.URLid}}}) {
      id
      catname
      creationDate
      cuserId
      description
      dis
      listPrice
      modificationDate
      muserId
      netPrice
      poId
      qty
      unitPrice
      uom,
      make
    }
  }
  
    `
  var datas = JSON.stringify({ query, variables: { User, Password } });
  var ss = await this.Logins1.GraphqlFetchQuery("query", query);
  return ss;

}


currentdatepicker(){
  const date = new Date()
  const year = date.getFullYear()
  
  let month: number | string = date.getMonth() + 1
  let day: number | string = date.getDate()
  
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  
  const today =  `${day}-${month}-${year}` 
  // var dat=formatDate(today,'yyyy-MM-dd','en') 
 var dat= formatDate(date,'yyyy-MM-dd','en')
  this.loginForm.controls.txtorderdate.setValue(dat);

};

async urlload(STRING)
{
  var data = await this.GETData2("", "");
  const myJSON = JSON.stringify(data);
  const obj = JSON.parse(myJSON);

  var pOTmPurchaseBodies= Enumerable.from( obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();
  var pOTmPurchaseHeads1= Enumerable.from( obj["data"]["pOTmPurchaseHeads"]["nodes"]).cast<any>()
  console.log(pOTmPurchaseBodies);
  var datas=  pOTmPurchaseBodies.where(x=>x.poId==Number(STRING)).toList();
  var datas2=  pOTmPurchaseHeads1.where(x=>x.poId==Number(STRING)).singleOrDefault();;

  this.poid=Number(datas2.id);
 
  this.pOExpenseItems=datas;

 
    this.datatableload();

  this.loginForm.setValue({
    DropDownList1: 0,
    Drop_gst: null,
    btn_add: null,
    btnsearch: null,
    chklot: null,
    chkuplaod: null,
    ddlcompanyname: datas2.companyId,
    ddlsuppliername: datas2.supplierId,
    ddluom:null,
    gst_rdo: null,
    txtcat: null,
    txtdelivery: formatDate(datas2.deliveryDate,'yyyy-MM-dd','en'),
    txtdescription: null,
    txtdiscount: null,
    txtenduser: datas2.enduser,
    txtfreightterms: datas2.freightTerms,
    txtgst: datas2.gst,
    txtindentno: datas2.indentNo,
    txtlistprice: null,
    txtorderdate: formatDate(datas2.orderDate,'yyyy-MM-dd','en') ,
    txtorderno: datas2.workOrderNo,
    txtpaymentterms: datas2.paymentTerms,
    txtqty: null,
    txtremarks: datas2.remarks,
    txttotal: Math.round(datas.sum(x=>x.netPrice)) ,
    ddldelivery:datas2.deliveryMode,
    ddlMake:null
  
   });




}

}
