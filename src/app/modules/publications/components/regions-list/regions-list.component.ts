import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { ConfirmationAlertComponent } from 'src/app/shared/modules/alerts/confirmation-alert/confirmation-alert.component';
import { IRegionCreate } from '../../interfaces/regionModels';
import { RegionsService } from '../../services/regions.service';
import { RegionsActionModalComponent } from './regions-action-modal/regions-action-modal.component';

@Component({
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html',
  styleUrls: ['./regions-list.component.scss']
})
export class RegionsListComponent implements OnInit {

  constructor(private _regionsService:RegionsService,private _modalService:MatDialog,private dialog:MatDialog) { }
  regions:any[];
  regionsFiltered:any[];
  showDelete:boolean=false;
  ngOnInit(): void {
    this.getRegions();
  }
  applyfilter(event){
    this.regionsFiltered = this.regions.filter(rec =>rec.regionName.toLowerCase().includes(event.target.value.toLowerCase()));
  }
  getRegions(){
    this._regionsService.getRegionsList().subscribe((res)=>{
      this.regions = res.result;
      this.regionsFiltered = res.result;
    },err=>{

    })
  }
  addRegionClicked(){
    let modelRef = this._modalService.open(RegionsActionModalComponent,{
      height:"170px",
      width:"300px",
      data:{
        type:actionConstants.create,data:{}
      }
    })
    modelRef.afterClosed().subscribe(res=>{
      if(res && res.RegionName){
        this.callCreateRegions_api(res);
      }
      else{
        
      }
    })
  }
  editRegion(region){
    console.log(region);
    let modelRef = this._modalService.open(RegionsActionModalComponent,{
      height:"170px",
      width:"300px",
      data:{
        type:actionConstants.edit,data:region
      }
    })
    modelRef.afterClosed().subscribe(res=>{
      if(res && res.RegionName){
        let postObj = {
          RegionID:region.regionID,
          RegionName:res.RegionName
        }
        this._regionsService.updateRegion(postObj).subscribe(res=>{
          console.log(res)
        },
        err=>{
          
        },()=>{
          this.getRegions();
        })
        console.log(postObj)
      }
      else{
        
      }
    })
  }
  deleteRegion(region){
    let isDeleted:boolean;
    let dialogRef = this.dialog.open(ConfirmationAlertComponent,{
      width:'350px',
      height:'120px',
      data:{
        text:"Are sure you want to delete region "+region.regionName +'?',
        isDelete:true
      }
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        this._regionsService.deleteRegion(region.regionID).subscribe((res)=>{
          console.log(res);
        },err=>{},
        ()=>{
          this.getRegions();
        })
      }
    })
    
  }
  
  callCreateRegions_api(Region){
    let postObj:IRegionCreate={
      RegionName:Region.RegionName
    }
    this._regionsService.createRegion(postObj).subscribe((res)=>{
      console.log(res);
    },err=>{},
    ()=>{
      this.getRegions();
    })
  }
}
