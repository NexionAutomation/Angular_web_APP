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
export interface RightsModule {
    groupID: number;
    moduleID: number;
    userID: number;
   

    canCreate: number;
    canUpdate: number;
    canDelete: number;
    canshow: number;
    canImportExcel: number;
    canExport: number;
}
