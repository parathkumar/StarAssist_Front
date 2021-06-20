import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { Observable } from 'rxjs';
import { customerUrls } from '../urls/customerUrls';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private apiService:ApiService) { }
  getCustomersList():Observable<IApiResponse>{
    return this.apiService.getData(customerUrls.readCustomersList);
  }
  createCustomer(postObj):Observable<IApiResponse>{
    return this.apiService.postData(customerUrls.createCustomer,postObj);
  }
  updateCustomer(putObj):Observable<IApiResponse>{
    return this.apiService.putData(customerUrls.updateCustomer,putObj);
  }
  deleteCustomer(customerId):Observable<IApiResponse>{
    return this.apiService.deleteData(customerUrls.deleteCustomer,customerId);
  }
}
