import { analyzeAndValidateNgModules, DYNAMIC_TYPE, ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { PublicationsService } from '../../services/publications.service';
import {ConfirmationAlertComponent} from '../../../../shared/modules/alerts/confirmation-alert/confirmation-alert.component';
import {SuccessAlertComponent} from '../../../../shared/modules/alerts/success-alert/success-alert.component';
import {ErrorAlertComponent} from '../../../../shared/modules/alerts/error-alert/error-alert.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { PublicationActionsModalComponent } from './publication-actions-modal/publication-actions-modal.component';
import { actionConstants } from 'src/app/shared/constants/common-constants';
@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {

  constructor(private publicationsService:PublicationsService,private dialog : MatDialog) { }
  matcards = [1,2,3];
  publications:any[] = [];
  ngOnInit(): void {
    this.ResolveData();
  }
  ResolveData(){
    let calls=[
      this.publicationsService.getPublicationsList()
    ];
    forkJoin(calls).subscribe((resp:IApiResponse[])=>{
      this.publications = resp[0].result.map(rec=>{
        rec.publicationLogo = 'data:image/jpg;base64,'+rec.publicationLogo;
        return rec;
      });
    },err=>{
      console.log(err);
    })
  }
  onEdit(publication)
  {
    let dialogRef=this.dialog.open(PublicationActionsModalComponent,{
      width:'750px',
      height:'490px',
      data:{type:actionConstants.edit,data:publication }

    }).afterClosed().subscribe((res)=>{
      if(res.result)
      {
        let successdialogref=this.dialog.open(SuccessAlertComponent,{
          width:'350px',
          height:'125px',
          data:{
            text:res.message
          }
        })
        this.ResolveData();
      }
    })
  }
 onDelete(publication)
 {
    let dialogref=this.dialog.open(ConfirmationAlertComponent,{
      width:'350px',
    height:'120px',
    data:{
      text:"Are you sure want to Delete publication: "+publication.publicationName +"?"
    }
  });
dialogref.afterClosed().subscribe(result=>{
  if(result)
  {
  this.publicationsService.deletePublication(publication.publicationId).subscribe((res:IApiResponse)=>
  {
    if(res.result)
    {
      let diaogref=this.dialog.open(SuccessAlertComponent,{
        width:'350px',
        height:'125px',
        data:{
          text: res.message
        }
      }).afterClosed().subscribe(res=>{
        this.ResolveData();
      })
    }
    else
    {
      let dialogRef=this.dialog.open(ErrorAlertComponent,{
        width:'350px',
        height:'125px',
        data:{
          text: res.message
        }
      })
    }
  })
 }
 else
 {
return;
 }
  })
}

}
