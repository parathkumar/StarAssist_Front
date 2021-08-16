import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { PublicationActionsModalComponent } from '../publications-list/publication-actions-modal/publication-actions-modal.component';
import { PublicationsListComponent } from '../publications-list/publications-list.component';
import { RegionsListComponent } from '../regions-list/regions-list.component';

@Component({
  selector: 'app-publications-container',
  templateUrl: './publications-container.component.html',
  styleUrls: ['./publications-container.component.scss']
})
export class PublicationsContainerComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  @ViewChild('tabGroup') tabGroup;
  @ViewChild(PublicationsListComponent) listComp:PublicationsListComponent;
  tabs:string[]=['Publication','Region'];
  ngOnInit(): void {
  }
  openAddPublicationsModal(){
        let dialogRef = this.dialog.open(PublicationActionsModalComponent,{
          width:'750px',
          height:'500px',
          data:{type:actionConstants.create,data:{}}
        })
        dialogRef.afterClosed().subscribe(res=>{
          if(res){
            this.listComp.ResolveData();
          }
        });
  }
  openRegionModal(){
    this.dialog.open(RegionsListComponent,{
      width:'350px',
      height:'600px',
    })
  }
}
