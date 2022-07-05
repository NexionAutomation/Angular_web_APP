import { Logins } from '@/Model/Utility/login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '@services/app.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-view-po',
  templateUrl: './view-po.component.html',
  styleUrls: ['./view-po.component.scss']
})
export class ViewPOComponent implements OnInit {
  chatRoomUid$: any;
  URLid: any;

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
  ) { }

  ngOnInit(): void {



    
    var id;
    this.chatRoomUid$ = this.route.params.pipe(
      map(params => params['id'])
    );
    alert(this.chatRoomUid$.destination._value.id);
    if (this.chatRoomUid$.destination._value.id != undefined) {
      alert(this.chatRoomUid$.destination._value.id);
      this.URLid = this.chatRoomUid$.destination._value.id;
      
      var site = "http://po.nexionautomation.com/printpo.aspx?poid="+this.URLid ;
    document.getElementById('iFrameName').setAttribute("src",site) ;
    
     // this.printDiv("print");
    }
    else {
      //alert( this.URLid);
      this._router.navigate(['/SearchPo']);
      //this.ActionFlag = 0;
    }

    
    
  }


   async printDiv(divName) {
    //var printContents = document.getElementById(divName).innerHTML;
    //var originalContents = document.body.innerHTML;
  
    //document.body.innerHTML = printContents;
  
    window.print();
  
    //document.body.innerHTML = originalContents;
  }
  
 

}
