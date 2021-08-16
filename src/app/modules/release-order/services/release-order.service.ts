import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { ApiService } from 'src/app/shared/services/api.service';
import { releaseOrderUrls } from '../urls/releaseOrderUrls';

@Injectable({
  providedIn: 'root'
})
export class ReleaseOrderService {

  constructor(private apiService:ApiService) { }
  getReleaseOrdersList():Observable<IApiResponse>{
    return this.apiService.getData(releaseOrderUrls.readReleaseOrderList);
  }
  createReleaseOrder(roObject):Observable<IApiResponse>{
    return this.apiService.postData(releaseOrderUrls.createReleaseOrder,roObject);
  }
  deleteReleaseOrder(RoId: Number):Observable<IApiResponse>{
    return this.apiService.deleteData(releaseOrderUrls.deleteReleaseOrder,RoId);
  }
  editReleaseOrder(roObject):Observable<IApiResponse>{
    return this.apiService.putData(releaseOrderUrls.editReleaseOrder,roObject);
  }
}
