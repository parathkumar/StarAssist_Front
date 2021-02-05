import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { ApiService } from 'src/app/shared/services/api.service';
import { publicationUrls } from '../urls/publicationsUrl';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(private apiService:ApiService) { }
  getPublicationsList():Observable<IApiResponse>{
    return this.apiService.getData(publicationUrls.readPublicationList);
  }
}
