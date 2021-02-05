import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { customMethods } from 'src/app/shared/methods/shared-methods';
import { SuccessAlertComponent } from 'src/app/shared/modules/alerts/success-alert/success-alert.component';
import { CustomerMultipleFields } from '../../constants/constants';
import { Icustomer } from '../../interfaces/customers';
import { CustomersService } from '../../services/customers.service';
@Component({
  selector: 'app-customer-actions-modal',
  templateUrl: './customer-actions-modal.component.html',
  styleUrls: ['./customer-actions-modal.component.scss']
})
export class CustomerActionsModalComponent implements OnInit {

  CustomerActionsformValues:Icustomer={}
  modalType:string;
  form:FormGroup;
  constructor(private formBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) data,private customerService:CustomersService,private dialog:MatDialog,private customerActionModalRef:MatDialogRef<CustomerActionsModalComponent>) {

    this.CustomerActionsformValues = data.data;
    this.modalType = data.type;
    console.log(this.CustomerActionsformValues)
  }
  ngOnInit(): void {
    this.setupForm();
  }
  setupForm(){
    this.form = this.formBuilder.group({
      name:[this.CustomerActionsformValues.name,Validators.required],
      email:[this.CustomerActionsformValues.email,Validators.required],
      businessOccupation:[this.CustomerActionsformValues.businessOccupation,Validators.required],
      businessLandmark:[this.CustomerActionsformValues.businessLandmark,Validators.required],
      singlePointOfContact:[this.CustomerActionsformValues.singlePointOfContact,Validators.required],
      panNumber:[this.CustomerActionsformValues.panNumber,Validators.required],
      gst:[this.CustomerActionsformValues.gst,Validators.required],
      terms:[this.CustomerActionsformValues.terms,Validators.required],
      addresses:[this.CustomerActionsformValues.addresses,Validators.required],
      phoneNumbers:[this.CustomerActionsformValues.phoneNumbers,Validators.required],
      representatives:[this.CustomerActionsformValues.representatives,Validators.required],
    })
  }
  onSubmit(values){
      let customerObj:Icustomer = customMethods.convertToArray(values,CustomerMultipleFields.fields)
      console.log(customerObj);
      if(this.modalType == actionConstants.create){
        this.callCreateCustomer_api(customerObj);
      }
      else if(this.modalType == actionConstants.edit){
        this.callEditCustomer_api(customerObj);
      }
  }
  callCreateCustomer_api(customerObj:Icustomer){
    let apiResult:IApiResponse;
    this.customerService.createCustomer(customerObj).subscribe((res:IApiResponse)=>{
      console.log(res);
      apiResult = res;
    },()=>{},()=>{
      if(apiResult.statusCode === 1){
        let dialogRef = this.dialog.open(SuccessAlertComponent,{
          width:'350px',
          height:'120px',
          data:{
            text:apiResult.message
          }
        })
        dialogRef.afterClosed().subscribe(result=>{
          if(result){
            console.log(result);
            this.customerActionModalRef.close(result);
          }
        })
      }
    });
  }
  callEditCustomer_api(customerObj:Icustomer){
    let apiResult:IApiResponse;
    customerObj.id = this.CustomerActionsformValues.id;
    this.customerService.updateCustomer(customerObj).subscribe((res:IApiResponse)=>{
      console.log(res);
      apiResult = res;
    },()=>{},()=>{
      if(apiResult.statusCode === 1){
        let dialogRef = this.dialog.open(SuccessAlertComponent,{
          width:'350px',
          height:'120px',
          data:{
            text:apiResult.message
          }
        })
        dialogRef.afterClosed().subscribe(result=>{
          if(result){
            console.log(result);
            this.customerActionModalRef.close(result);
          }
        })
      }
    });
  }
}
