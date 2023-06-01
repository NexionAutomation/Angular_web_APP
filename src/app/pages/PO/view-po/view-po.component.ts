import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pOTmPurchaseBodies, TM_CompanyMaster, TM_CountryMaster, TM_PurchaseHead, Tm_supplierMaster } from '@modules/Module/PoModules';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Enumerable } from 'sharp-collections';
const numWords = require('num-words');



@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.scss']
})
export class ViewPOComponent implements OnInit {
  chatRoomUid$: any;
  URLid: any;
  Total:any;

  items: any;
  POTmSupplierMasters: Enumerable<any>;
  POTmCompanyMasters1: Enumerable<any>;
  pOTmPurchaseHeads: Enumerable<any>;
  persons: Enumerable<any>;
  pOTmPurchaseBodiessss: Enumerable<pOTmPurchaseBodies>;

   pohead: any;
   pobody: any;
   pocomp: any;
   posuppl: any; 
   Usercode: any; 
 Totalinnumber:any

   heroes = [
   1,2,3,4
  ];
  myHero:any;
  predate: any 
  Podate: any;
  user: any;
  pOTmUserMasters: Enumerable<any>;
  
  constructor(
    private renderer: Renderer2,
    private toastr: ToastrService,
    private appService: AppService,
    //private UserModule_: UserModuleServicesService,
    private Logins1: Logins,
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {



    

    
    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );
   
    if (this.chatRoomUid$.destination._value.id != undefined) {
      
      this.URLid = this.chatRoomUid$.destination._value.id;

        //var site = "http://po.nexionautomation.com/printpo.aspx?poid="+this.URLid ;
      //document.getElementById('iFrameName').setAttribute("src",site) ;

      // this.printDiv("print");
    }
    else {
      //alert( this.URLid);
      this._router.navigate(['/SearchPo']);
      //this.ActionFlag = 0;
    }

    this.LodeDataTable();

  }

  async LodeDataTable() {
    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

    this.POTmSupplierMasters = Enumerable.from(obj["data"]["pOTmSupplierMasters"]).cast<any>();
    this.POTmCompanyMasters1 = Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<any>();
    this.pOTmPurchaseHeads = Enumerable.from(obj["data"]["pOTmPurchaseHeads"]["nodes"]).cast<any>();
    this.pOTmPurchaseBodiessss = Enumerable.from(obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();;

    this.pOTmUserMasters = Enumerable.from(obj["data"]["pOTmUserMasters"]).cast<any>();;


    
    this.pohead = this.pOTmPurchaseHeads.where(x => x.poId == Number(this.URLid)).singleOrDefault();
 this.pocomp = this.POTmCompanyMasters1.where(x => x.id == Number(this.pohead.companyId)).singleOrDefault();
 this.posuppl = this.POTmSupplierMasters.where(x => x.id == Number(this.pohead.supplierId)).singleOrDefault();
 this.persons = this.pOTmPurchaseBodiessss.where(x => x.poId == Number(this.URLid)).toList();
 this.user = this.pOTmUserMasters.where(x => x.userCode == Number(this.pohead.cuserId)).singleOrDefault();

var datainword= Number( Enumerable.from( this.persons).sum(a=>a.netPrice).toString());


var datae= new Date( this.pohead.orderDate );
var gf=datae.getMonth()+1
if(gf>=4)
{
  this.predate= (Number(datae.getFullYear().toString())-(2000));
  this.Podate=Number(this.predate)+1
}
else
{
  this.predate=(Number(datae.getFullYear().toString())-(2000)-1)
  this.Podate=Number(this.predate)+1
}
 this.Total = numWords( Math.round( datainword)) ;
var user= this.user.userName.toString()

 var res= Math.round(datainword).toLocaleString('en-IN'); 
 this.Totalinnumber=res+" /-";
 
 //this.Podate= Number(datae.getFullYear().toString())-(2000)+1;
 this.Usercode=  user.toUpperCase();//user.substring(0,2).toUpperCase()



 this.persons.toArray().map(a=>a.listPrice=parseFloat(parseFloat(a.listPrice).toFixed(2)).toLocaleString('en-IN'))
 this.persons.toArray().map(a=>a.unitPrice=parseFloat(parseFloat(a.unitPrice).toFixed(2)).toLocaleString('en-IN'))
 this.persons.toArray().map(a=>a.netPrice=parseFloat(parseFloat(a.netPrice).toFixed(2)).toLocaleString('en-IN'))
 
    $('#example').DataTable().destroy();
    $(document).ready(function () {

      this.dtOptions = $('#example').DataTable({

        dom: 'Bfrtip',
        paging: true

      });

    });

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
      pOTmPurchaseHeads(
        where: {poId: {eq: ${  this.URLid=="undefined"?null:this.URLid}}}) {
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
      pOTmPurchaseBodies (where: {poId: {eq: ${  this.URLid=="undefined"?null:this.URLid}}}){
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

      pOTmUserMasters  {
        userName
        userId
       
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
        rid
      }
      
    }
    
      `
    var datas = JSON.stringify({ query, variables: { User, Password } });
    var ss = await this.Logins1.GraphqlFetchQuery("query", query);
    return ss;

  }

  async printDiv(divName) {
    //var printContents = document.getElementById(divName).innerHTML;
    //var originalContents = document.body.innerHTML;

    //document.body.innerHTML = printContents;

    window.print();

    //document.body.innerHTML = originalContents;
  }


}



