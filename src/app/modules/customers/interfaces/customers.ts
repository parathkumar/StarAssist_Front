// export interface Icustomer{
//     id?:string;
//     customer_name?:string;
//     customer_email?:string;
//     customer_business_occupation?:string;
//     customer_business_landmark?:string;
//     customer_GST?:string;
//     customer_pan_number?:string;
//     customer_terms?:string;
//     customer_single_point_contact?:string;
//     customer_addresses?:any;
//     customer_mobile_numbers?:any;
// }

export interface Icustomer{
    id?:string;
    name?:string;
    gst?:string;
    businessLandmark?:string;
    panNumber?:string;
    terms?:string;
    businessOccupation?:string;
    singlePointOfContact?:string;
    isDeleted?:boolean;
    addresses?:any;
    email?:any;    
    phoneNumbers?:any;
    representatives?:any;
}