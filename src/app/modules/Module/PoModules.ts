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
	public groupId: number;
	public moduleId: number;
	public subModuleId: number;
	public canView: boolean;
	public canSave: boolean;
	public canSearch: boolean;
	public canUpdate: boolean;
	public canDelete: boolean;
	public cUserId: number;
	public mUserId: number;
	public userCode: number;
	public canExport: boolean;
	public rID: number;
}

export class TM_CityMaster
{
	public cITYCODE: number;
	public cITYNAME: string;
	public sTATECODE: number;
	public uSERCODE: number;
	public deleted: string;
	public editable: string;
}

export class TM_StateMaster
{
	public sTATECODE: number;
	public sTATENAME: string;
	public displayAs: string;
	public cOUNTRYCODE: number;
	public uSERCODE: number;
	public deleted: string;
	public editable: string;
}
export class TM_CountryMaster
{
	public cOUNTRYCODE: number;
	public cOUNTRYNAME: string;
	public displayAs: string;
	public uSERCODE: number;
	public deleted: string;
	public editable: string;
}

export class TM_CompanyMaster
{
	public iD: number;
	public companyName: string;
	public cAddress1: string;
	public cAddress2: string;
	public cAddress3: string;
	public cEmailID: string;
	public cMobileNo: string;
	public cWebsite: string;
	public cPhoto: string;
	public iName: string;
	public iAddress1: string;
	public iAddress2: string;
	public iAddress3: string;
	public iGST: string;
	public iMobileNo: string;
	public iPanNo: string;
	public sName: string;
	public sAddress1: string;
	public sAddress2: string;
	public sAddress3: string;
	public sAttendentName: string;
	public sMobileNo: string;
	public sPanNo: string;
	public cUserId: number;
	public mUserId: number;
	public recordstatus: string;
	public reasonForDeletion: string;
	public dUserCode: number;
}

export class ExpenseGroup
{
	public eGroupName: string;
	public createdBy: number;
	public updateBy: number;
	public eGroupId: number;
}

export class ExpenseTypes
{
	public expenseTypeId: number;
	public typeName: string;
	public eGroupId: number;
	public createdOn: Date;
	public createdBy: number;
	public updateOn: Date;
	public updateBy: number;
	public rate: number;
	public amt: boolean;
	public km: boolean;
	public park: boolean;
}

export class ExpenseStatusMaster
{
	public statusName: string;
	public createdBy: number;
	public updateBy: number;
	public statusId: number;
}
export class TM_FinaicalYear
{
	public id: number;
	public fYname: string;
	public startDate: Date;
	public enddate: Date;
	public poNumber: number;
	public cUserId: number;
	public mUserId: number;
	public eXPENSEid: number;
}

export class Tm_supplierMaster
{
	public iD: number;
	public supplierName: string;
	public address1: string;
	public address2: string;
	public address3: string;
	public contactPerson: string;
	public cMobileNo: string;
	public gST: string;
	public recordStatus: string;
	public cUserId: number;
	public mUserId: number;
}

export class LEmp_Leavemaster
{
	public lmId: number;
	public leaveType: string;
	public createdBy: Date;
	public createdOn: string;
	public alloted: number;
	public color: string;
}

export class ResponseStatus
{
	public code: string;
	public detail: string;
	public iD: string;
	public message:string;
	public status: string;
}

export class ExpenseItems
{
	public expenseId: number;
	public expenseTypeId: number;
	public amount: number;
	public approvedAmount: number;
	public createdBy: number;
	public updateBy: number;
	public description: string;
	public paidBy: string;
	public distance: number;
	public parkingAmt: number;
	public aMt: number;
	public expenseItemsId: number;
	public Date: Date;
}

export class TM_PurchaseHead
{
	public pOId: number;
	public companyID: number;
	public supplierID: number;
	public orderDate: Date;
	public paymentTerms: string;
	public indentNo: string;
	public freightTerms: string;
	public workOrderNo: string;
	public gst: string;
	public deliveryDate: Date;
	public remarks: string;
	public total: number;
	public enduser: string;
	public creationDate: Date;
	public cUserId: number;
	public modificationDate: Date;
	public mUserId: number;
	public deliveryMode: string;
	public iD: number;
}


export class pOTmPurchaseBodies
{
	public poId: number;
	public description: string;
	public uom: string;
	public qty: number;
	public listPrice: number;
	public dis: number;
	public unitPrice: number;
	public netPrice: number;
	public cuserId: number;
	public muserId: number;
	public catname: string;
	public id: number;




}