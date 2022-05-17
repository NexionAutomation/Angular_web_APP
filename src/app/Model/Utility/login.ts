
import { environment } from "environments/environment.prod";
import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Listener } from "selenium-webdriver";



@Injectable({
    providedIn: 'root'
})

export  class Logins implements OnInit  {
    
    rates: any[];
  loading = true;
  error: any;
    // loading: boolean;
    // posts: any;
  
    // private querySubscription: Subscription;
  
    constructor(private apollo: Apollo,private router: Router, private toastr: ToastrService) {}
    ngOnInit(): void {
     
    }
    
    
    apiUrl = environment.apiUrl;
     GET(accountID: string): void {

        throw new Error("Method not implemented.");
    }

  
    async GETBYID(email: string, password: string): Promise<any> {


      let vat=` query MyQuery {
        userMasterData{
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

       await this.GraphqlFetchdata("query",vat);
       let dat =sessionStorage.get('Graphql')
       sessionStorage.removeItem;

console.log(dat);

      this.router.navigate(['/']);


        //throw new Error("Method not implemented.");
        //return querySubscription.;
    }
    async UPDATEBYID(email: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async DELETEBYID(email: string, password: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async CREATE(any: any): Promise<string> {
        throw new Error("Method not implemented.");
    }

    ngOnDestroy(): void {
        //this.querySubscription.unsubscribe();
    }


     async GraphqlFetchdata(query: string,Query :string )
    {
      
      let  data1;
      let response = await fetch(environment.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }, body: JSON.stringify({query:Query })})
        .then(r => r.json()) 
        .then(data => data );
        
          var a= await response.json();
          sessionStorage.setItem('Graphql',a);
    }
}
