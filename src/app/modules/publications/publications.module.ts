import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicationsRoutingModule } from './publications-routing.module';
import { PublicationsContainerComponent } from './components/publications-container/publications-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedImportsModule } from 'src/app/shared/modules/shared-imports/shared-imports.module';
import { PublicationActionsModalComponent } from './components/publications-list/publication-actions-modal/publication-actions-modal.component';
import { PublicationsListComponent } from './components/publications-list/publications-list.component';
import { RegionsListComponent } from './components/regions-list/regions-list.component';


@NgModule({
  declarations: [PublicationsContainerComponent, PublicationsListComponent, RegionsListComponent, PublicationActionsModalComponent],
  imports: [
    CommonModule,
    PublicationsRoutingModule,
    SharedImportsModule,
    ReactiveFormsModule,
  ]
})
export class PublicationsModule { }
