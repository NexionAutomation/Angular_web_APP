export interface ICRUDlOGIN {

    apiUrl:string
    GET(accountID: string): void;
    GETBYID(email: string, password: string): Promise<any>;
    UPDATEBYID(email: string, password: string): Promise<any>;
    DELETEBYID(email: string, password: string): Promise<any>;
    CREATE(any :any): Promise<string>;

}
