import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { MatPaginator } from '@angular/material/paginator';
import { Icustomer } from '../../interfaces/customers';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationAlertComponent } from 'src/app/shared/modules/alerts/confirmation-alert/confirmation-alert.component';
import { CustomerActionsModalComponent } from '../customer-actions-modal/customer-actions-modal.component';
import { customMethods } from 'src/app/shared/methods/shared-methods';
import { CustomerMultipleFields } from '../../constants/constants';
import { actionConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-customers-container',
  templateUrl: './customers-container.component.html',
  styleUrls: ['./customers-container.component.scss']
})
export class CustomersContainerComponent implements OnInit{

  constructor(private customerService:CustomersService,private dialog:MatDialog) { }
  customers:Icustomer[];
  ngOnInit(): void {
    this.getCustomersList()
  }
  displayedColumns: string[] = ['Name','Email','Phone Number','Landmark','Actions'];
  dataSource:MatTableDataSource<Icustomer>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  applyFilter(event){
    console.log(event.target.value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddCustomer(){
    let dialogRef = this.dialog.open(CustomerActionsModalComponent,{
      width:'1000px',
      height:'510px',
      data:{type:actionConstants.create,data:{}}
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getCustomersList();
      }
    });
  }

  onEditCustomer(customer:Icustomer){
    let customerData = customMethods.reduceToPrimary(customer,CustomerMultipleFields.fields);
    let dialogRef = this.dialog.open(CustomerActionsModalComponent,{
      width:'1000px',
      height:'510px',
      data:{type:actionConstants.edit,data:customerData}
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.getCustomersList();
      }
    });
  }

  onDelete(customer:Icustomer){
    let isDeleted:boolean;
    let dialogRef = this.dialog.open(ConfirmationAlertComponent,{
      width:'350px',
      height:'120px',
      data:{
        text:"Are sure you want to delete customer "+customer.name +'?',
        isDelete:true
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this.customerService.deleteCustomer(customer.id).subscribe((res)=>{
          isDeleted = res.result;
        },()=>{},
        ()=>{
          if(isDeleted){
            this.getCustomersList();
          }
        })
        
      }
    })
  }
  
  // api call functions
  getCustomersList(){
    this.customerService.getCustomersList().subscribe((res)=>{      
      this.customers = res.result;
    },
    ()=>{},
    ()=>{
      for(let i=0;i<this.customers.length;i++){
        this.customers[i] = customMethods.reduceToPrimary(this.customers[i],CustomerMultipleFields.fields);
      }
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
    })
  }


}
