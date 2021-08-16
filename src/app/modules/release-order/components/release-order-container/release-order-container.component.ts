import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IReleaseOrder } from '../../interfaces/IReleaseOrder';
import { MatPaginator } from '@angular/material/paginator';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { forkJoin } from 'rxjs';
import { ReleaseOrderService } from '../../services/release-order.service';
import { ConfirmationAlertComponent } from 'src/app/shared/modules/alerts/confirmation-alert/confirmation-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { RoActionsModalComponent } from '../ro-actions-modal/ro-actions-modal.component';
import { actionConstants } from 'src/app/shared/constants/common-constants';

@Component({
  selector: 'app-release-order-container',
  templateUrl: './release-order-container.component.html',
  styleUrls: ['./release-order-container.component.scss']
})
export class ReleaseOrderContainerComponent implements OnInit {

  constructor(private _releaseOrderService:ReleaseOrderService,private dialog:MatDialog) { }
  displayedColumns: string[] = ['roNumber','customer','publication','region','Actions'];
  dataSource:MatTableDataSource<IReleaseOrder>;
  releaseOrders:IReleaseOrder[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  //Table Actions - Edit,Delete,Print,Mail
  ngOnInit(): void {
    this.ResolveData();
  }
  applyFilter(event){
  }
  onAddRO(){
    let dialogRef = this.dialog.open(RoActionsModalComponent,{
      width:'1700px',
      height:'550px',
      data:{type:actionConstants.create,data:{}}
    })
    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        this.ResolveData();
      }
    });
  }
  ResolveData(){
    let calls=[
      this._releaseOrderService.getReleaseOrdersList()
    ];
    forkJoin(calls).subscribe((resp:IApiResponse[])=>{
      this.releaseOrders = resp[0].result;
      console.log('release orders',this.releaseOrders)
      this.dataSource = new MatTableDataSource(this.releaseOrders);
      this.dataSource.paginator = this.paginator;
    },err=>{
      console.log(err);
    })
    
  }
  onPrintRO(element){

  }
  onMailRO(element){

  }
  onEditRO(element){
    console.log(element);
    let dialogRef = this.dialog.open(RoActionsModalComponent,{
      width:'1400px',
      height:'520px',
      data:{type:actionConstants.edit,data:element}
    })
    // dialogRef.afterClosed().subscribe(res=>{
    //   if(res){
    //     this.ResolveData();
    //   }
    // });
  }
  onDelete(ro:IReleaseOrder){
    console.log(ro);
    let isDeleted:boolean;
    let dialogRef = this.dialog.open(ConfirmationAlertComponent,{
      width:'350px',
      height:'120px',
      data:{
        text:"Are sure you want to delete ro "+ro.roNumber +'?',
        isDelete:true
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this._releaseOrderService.deleteReleaseOrder(ro.roId).subscribe((res)=>{
          isDeleted = res.result;
        },()=>{},
        ()=>{
          if(isDeleted){
            this.ResolveData();
          }
        })
        
      }
    })
  }
}


