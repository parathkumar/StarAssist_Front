import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Icustomer } from 'src/app/modules/customers/interfaces/customers';
import { CustomersService } from 'src/app/modules/customers/services/customers.service';
import { PublicationsService } from 'src/app/modules/publications/services/publications.service';
import { RegionsService } from 'src/app/modules/publications/services/regions.service';
import { IReleaseOrder } from '../../interfaces/IReleaseOrder';
import { ReleaseOrderService } from '../../services/release-order.service';
import { AdvancedDatepickerComponent } from './advanced-datepicker/advanced-datepicker.component';

@Component({
  selector: 'app-ro-actions-modal',
  templateUrl: './ro-actions-modal.component.html',
  styleUrls: ['./ro-actions-modal.component.scss']
})
export class RoActionsModalComponent implements OnInit {

  modalType:string;
  roFormValues:IReleaseOrder=null;
  form:FormGroup;
  customerList:any;
  publicationList:any;
  regionList:any;
  constructor(private formBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) data,private releaseOrderService:ReleaseOrderService,private dialog:MatDialog,private roActionsModalRef:MatDialogRef<RoActionsModalComponent>,private customerService:CustomersService,private publicationService:PublicationsService,private regionService:RegionsService) { 
    this.modalType=data.type;
    this.roFormValues=data.data;
    console.log('data',this.roFormValues);
  }

  ngOnInit(): void {
    this.setupForm();
    this.resolveData();
  }
  setupForm(){
    this.form = this.formBuilder.group({
      customer:[this.roFormValues.customer,Validators.required],
      billTo:[this.roFormValues.billedToCustomer,Validators.required],
      publication:[this.roFormValues.publication,Validators.required],
      region:[this.roFormValues.region,Validators.required],
      width:[this.roFormValues.width,Validators.required],//yet to complete
      height:[this.roFormValues.height,Validators.required],//yet to complete
      rate:[this.roFormValues.cost,Validators.required],//yet to complete
      ratePer:[this.roFormValues.costPer,Validators.required],//yet to complete
      captions:[this.roFormValues.caption,Validators.required],
      position:[this.roFormValues.position,Validators.required],
      specialInstruction:[this.roFormValues.specialInstruction,Validators.required],
      enclosed:[this.roFormValues.enclosed,Validators.required],
      remarks:[this.roFormValues.remarks,Validators.required],
      details:[this.roFormValues.details,Validators.required],
      insertionDates:[new Date(),Validators.required],
    })
  }

  resolveData(){
    let calls=[
      this.customerService.getCustomersList(),
      this.publicationService.getPublicationsList(),
      this.regionService.getRegionsList()
    ];
    forkJoin(calls).subscribe((res)=>{
      this.customerList = res[0].result;
      this.publicationList = res[1].result;
      this.regionList = res[2].result;
    });
  }
  OpenAdvancedDatePicker(){
    this.dialog.open(AdvancedDatepickerComponent,{
      width:'800px',
      height:'500px',
      data:{}
    })
  }
  onSubmit(value){

  }
}
