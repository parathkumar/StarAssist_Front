import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { PublicationsService } from '../../services/publications.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.scss']
})
export class PublicationsListComponent implements OnInit {

  constructor(private publicationsService:PublicationsService) { }
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
}
