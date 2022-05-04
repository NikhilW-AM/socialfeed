import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  private header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZiYjdjMzM1YTgwMWIzZTc5ZmI5NDUiLCJpYXQiOjE2NTE2NDcwMjgsImV4cCI6MTY1MTczMzQyOH0.w8-zfghIWzlIxmZmsMyMHlfOjllmmDZI55XjUtrZV5o'
  constructor(private _http: HttpClient) { }

  postSignupData(value: any) {
    return this._http.post(`http://localhost:3000/signup`, value)
  }

  loginData(value: any) {
    return this._http.post('http://localhost:3000/login', value)
  }

  getAllPosts() {
    return this._http.get('http://localhost:3000?page=1&limit=2', {
      headers: {
        Authorization: this.header
      }
    })
  }

  getCurrectUser(userId: any) {
    return this._http.get(`http://localhost:3000/user/${userId}`, {
      headers: {
        Authorization: this.header
      }
    })
  }

  postEditProfile(userObj: any, userId: any) {
    return this._http.put(`http://localhost:3000/edit-profile/${userId}`, userObj, {
      headers: {
        Authorization: this.header
      }
    })
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem("token")) {
      return true
    }
    return false
  }
}
