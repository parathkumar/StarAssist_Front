import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}
  //private base_api = 'https://localhost:44395/api/';
  private base_api = 'https://starassistdev.azurewebsites.net/api/';
  getData(targetPath:string):Observable<any>{
    return this.http.get(this.base_api+targetPath);
  }
  postData(targetpath:string,postObj:any):Observable<any>{
    return this.http.post(this.base_api+targetpath,postObj);
  }
  putData(targetpath:string,postObj:any):Observable<any>{
    return this.http.put(this.base_api+targetpath,postObj);
  }
  deleteData(targetPath:string,id:any):Observable<any>{
    return this.http.delete(this.base_api+targetPath+"?id="+id);
  }
}
