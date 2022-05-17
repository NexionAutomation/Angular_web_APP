import { ICRUD } from "../IServices/icrud"; 
import { environment } from "environments/environment.prod";
export class CRUD implements ICRUD{

    apiUrl = environment.apiUrl;
    GET(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    GETBYID(id: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    UPDATEBYID(ID: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
  
    DELETEBYID(): Promise<string> {
        throw new Error("Method not implemented.");
    }
    CREATE(any: any): Promise<string> {
        throw new Error("Method not implemented.");
    }
    
}
