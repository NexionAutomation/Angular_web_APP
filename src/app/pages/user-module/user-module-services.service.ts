import { CRUD } from '@/Model/Utility/crud';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserModuleServicesService  {

  constructor() { }
  apiUrl: string;
 async GETGroupModule(): Promise<any> {
   
    throw new Error('Method not implemented.');
  }
  GETBYID(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  UPDATEBYID(ID: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  DELETEBYID(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  CREATE(any: any): Promise<string> {
    throw new Error('Method not implemented.');
  }


}
