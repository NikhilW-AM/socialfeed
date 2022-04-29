import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private _http: HttpClient) { }

  postSignupData(value: any) {
    return this._http.post(`http://localhost:3000/signup`, value)
  }

  loginData(value: any) {
    return this._http.post('http://localhost:3000/login', value)
  }
}
