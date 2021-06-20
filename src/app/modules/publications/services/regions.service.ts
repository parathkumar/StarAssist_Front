import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { ApiService } from 'src/app/shared/services/api.service';
import { regionUrls } from '../urls/regionUrls';

@Injectable({
  providedIn: 'root'
})
export class RegionsService {

  constructor(private _apiService:ApiService) { }

  getRegionsList():Observable<IApiResponse>{
    return this._apiService.getData(regionUrls.readRegionList);
  }
  createRegion(postObj):Observable<IApiResponse>{
    return this._apiService.postData(regionUrls.createRegion,postObj);
  }
  updateRegion(postObj):Observable<IApiResponse>{
    return this._apiService.putData(regionUrls.updateRegion,postObj)
  }
  deleteRegion(postObj):Observable<IApiResponse>{
    return this._apiService.deleteData(regionUrls.deleteRegion,postObj)
  }
}
