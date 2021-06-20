export interface IReleaseOrder {
    roId?:Number;
    roNumber?:Number;
    insertionDateDesc?:string;
    insertionDates?:any[];//Date[];
    width?:Number;
    height?:Number;
    cost?:Number;
    costPer?:string;
    caption?:string;
    position?:string;
    specialInstruction?:string;
    enclosed?:string;
    remarks?:string;
    details?:string;
    billedToCustomer?:string;
    customer?:string;
    publication?:string;
    region?:string;
}