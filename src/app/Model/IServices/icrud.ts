export interface ICRUD {
     
    apiUrl:string
    GET():  Promise<any>;
    GETBYID( id: string): Promise<any>;
    UPDATEBYID(ID: string): Promise<any>;
    DELETEBYID(ID :string): Promise<any>;
    CREATE(any :any): Promise<any>;
    
}
