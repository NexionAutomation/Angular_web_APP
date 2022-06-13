export class CMAdminSubModuleMaster {
    moduleId: number;
    subModuleId: number;
    subModuleName: string;
    creationDate: string;
    cuserId: number;
    modificationDate: string;
    muserId: number;
    subModuleOrder: number;
    navigationUrl: string;
    targetModule: string;
    rid: number;
}
export interface TmGroupMaster {
    rid: number;
    groupId: number;
    groupName: string;
    creationDate?: string;
    cuserId?: number;
    modificationDate?: string;
    muserId?: number;
}
export interface TmUserMaster {
    userName: string;
    userId: string;
    upassword: string;
    emailId: string;
    mobileNo: string;
    groupId?: number;
    accountStatus: string;
    fromTime: string;
    fromTimeAmPm: string;
    toTime: string;
    toTimeAmPm: string;
    userImage: string;
    creationDate?: string;
    cuserId?: number;
    modificationDate?: string;
    muserId?: number;
    recordstatus: string;
    reasonForDeletion: string;
    deletedDate?: string;
    duserCode?: number;
    userCode?: number;
    lastLoginDateTime?: string;
    reportingManager?: number;
    rid: number;
}
export interface CMAdminModuleMasterUser {
    moduleId: number;
    moduleName: string;
    moduleOrder: number;
    creationDate: string;
    cuserId: number;
    modificationDate: string;
    muserId: number;
    rid: number;
}
export class CM_Web_UserRightsMaster
{
	public group_Id: number;
	public module_Id: number;
	public subModule_Id: number;
	public canView: boolean;
	public canSave: boolean;
	public canSearch: boolean;
	public canUpdate: boolean;
	public canDelete: boolean;
	public cUser_Id: number;
	public mUser_Id: number;
	public user_Code: number;
	public canExport: boolean;
	public rID: number;
}