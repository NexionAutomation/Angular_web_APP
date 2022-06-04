import { environment } from "environments/environment.prod";
import { Injectable, OnDestroy, OnInit, Component } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Listener } from "selenium-webdriver";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { from } from "linq-to-typescript"


@Injectable({
  providedIn: 'root'
})

export class Logins implements OnInit {
  public user: any = null;
  public TMUserMaster:TMUserMaster

  // loading: boolean;
  // posts: any;

  // private querySubscription: Subscription;

  constructor(private apollo: Apollo, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {

  }


  apiUrl = environment.apiUrl;
  GET(accountID: string): void {

    throw new Error("Method not implemented.");
  }


  async GETBYID(User: string, Password: string): Promise<any> {

    let data = '{User="' + User + '",Password="' + Password + '" }';
    let query = `query MyQuery($User:String,$Password:String) {
        userMasterData(where: {userId: {eq: $User}, upassword: {eq: $Password}}) {
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
    var ss = await this.GraphqlFetchdata("query", datas);

    const myJSON = JSON.stringify(ss);
    const obj = JSON.parse(myJSON);

    var da = obj["data"]["userMasterData"][0]

    if (da != undefined) {
      this.user = da;
      this.TMUserMaster=da;
      this.router.navigate(['/']);
     
     
      
    }
    else {
      this.router.navigate(['/login']);
      this.toastr.error('Invalid User & Password Please Try Again..!');
    }

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

  async GraphqlFetchdata(query: string, Query: string) {

    return await fetch(environment.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }, body: Query
    })
      .then(r => r.json())
      .then(data => data)

  }

  async GraphqlFetchQuery(query: string, Query: string) {

    return await fetch(environment.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }, body: JSON.stringify({
        query: Query
      })
    })
      .then(r => r.json())
      .then(data => data)

  }

}

export class TMUserMaster
{
	public userName: string;
	public userID: string;
	public uPassword: string;
	public emailID: string;
	public mobileNo: string;
	public groupId: number;
	public accountStatus: string;
	public fromTime: string;
	public fromTimeAMPM: string;
	public toTime: string;
	public toTimeAMPM: string;
	public userImage: string;
	public cUserId: number;
	public mUserId: number;
	public recordstatus: string;
	public reasonForDeletion: string;
	public dUserCode: number;
	public userCode: number;
	public reportingManager: number;
	public rID: number;
}