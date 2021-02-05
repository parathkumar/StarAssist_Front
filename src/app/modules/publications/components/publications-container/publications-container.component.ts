import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { actionConstants } from 'src/app/shared/constants/common-constants';
import { PublicationActionsModalComponent } from '../publications-list/publication-actions-modal/publication-actions-modal.component';

@Component({
  selector: 'app-publications-container',
  templateUrl: './publications-container.component.html',
  styleUrls: ['./publications-container.component.scss']
})
export class PublicationsContainerComponent implements OnInit,AfterViewInit {

  constructor(private dialog:MatDialog) { }

  @ViewChild('tabGroup') tabGroup;
  tabs:string[]=['Publication','Region'];
  selectedTab:string = this.tabs[0];
  ngOnInit(): void {
  }
  ngAfterViewInit(){
    this.setAddButton();
  }
  setAddButton(){
    this.selectedTab = this.tabs[this.tabGroup.selectedIndex];
  }
  openAddModal(){
    switch(this.selectedTab){
      case 'Publication':
        let dialogRef = this.dialog.open(PublicationActionsModalComponent,{
          width:'750px',
          height:'500px',
          data:{type:actionConstants.create,data:{}}
        })

        break;
      case 'Region':
        break;
    }
  }
}
