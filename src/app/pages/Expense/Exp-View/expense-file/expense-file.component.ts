import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pOTmPurchaseBodies } from '@modules/Module/PoModules';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Enumerable } from 'sharp-collections';
const numWords = require('num-words');
@Component({
  selector: 'app-expense-file',
  templateUrl: './expense-file.component.html',
  styleUrls: ['./expense-file.component.scss']
})
export class ExpenseFileComponent implements OnInit {

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

   heroes = [
   1,2,3,4
  ];
  myHero:any; 
  
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



     this.Total = numWords(12345) 

    
    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );
   
    if (this.chatRoomUid$.destination._value.id != undefined) {
      
      this.URLid = this.chatRoomUid$.destination._value.id;

        var site = "http://po.nexionautomation.com/printoutstation.aspx?ID="+this.URLid ;
      document.getElementById('iFrameName').setAttribute("src",site) ;

      // this.printDiv("print");
    }
    else {
      //alert( this.URLid);
      //this._router.navigate(['/SearchPo']);
      //this.ActionFlag = 0;
    }

    //this.LodeDataTable();

  }

  async LodeDataTable() {
    var data = await this.GETData("", "");
    const myJSON = JSON.stringify(data);
    const obj = JSON.parse(myJSON);

    this.POTmSupplierMasters = Enumerable.from(obj["data"]["pOTmSupplierMasters"]).cast<any>();
    this.POTmCompanyMasters1 = Enumerable.from(obj["data"]["pOTmCompanyMasters"]).cast<any>();
    this.pOTmPurchaseHeads = Enumerable.from(obj["data"]["pOTmPurchaseHeads"]).cast<any>();
    this.pOTmPurchaseBodiessss = Enumerable.from(obj["data"]["pOTmPurchaseBodies"]).cast<pOTmPurchaseBodies>();;



    this.pohead = this.pOTmPurchaseHeads.where(x => x.poId == Number(this.URLid)).singleOrDefault();
 this.pocomp = this.POTmCompanyMasters1.where(x => x.id == Number(this.pohead.companyId)).singleOrDefault();
 this.posuppl = this.POTmSupplierMasters.where(x => x.id == Number(this.pohead.supplierId)).singleOrDefault();
 this.persons = this.pOTmPurchaseBodiessss.where(x => x.poId == Number(this.URLid)).toList();



console.log(this.pohead.companyName);
    console.log(this.pohead);
    console.log(this.pocomp);
    console.log(this.posuppl);
    console.log(this.persons);
    //var purchase=this.pOTmPurchaseBodiessss.where(x=>x.)
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
      pOTmPurchaseHeads {
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
      pOTmPurchaseBodies {
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
        uom
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
