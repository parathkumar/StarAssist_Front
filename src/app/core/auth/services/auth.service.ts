import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from 'src/app/shared/Interfaces/IApiResponse';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiService:ApiService) { }
  getLoggedInUserDetails(data):Observable<IApiResponse>{
    return this.apiService.postData('Auth/login',data);
  }
  forgotPassword(data):Observable<IApiResponse>{
    return this.apiService.postData('Auth/ForgotPassword',data);
  }
}
