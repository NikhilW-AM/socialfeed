import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  private header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjZiYjdjMzM1YTgwMWIzZTc5ZmI5NDUiLCJpYXQiOjE2NTE3MjQzNjAsImV4cCI6MTY1MTgxMDc2MH0.6wpDx6zwUSCJiep1UmbgF21CJHwd9qhMI8UHTs_i48o'
  constructor(private _http: HttpClient) { }

  postSignupData(value: any) {
    return this._http.post(`http://localhost:3000/signup`, value)
  }

  loginData(value: any) {
    return this._http.post('http://localhost:3000/login', value)
  }

  getAllPosts() {
    return this._http.get('http://localhost:3000?page=1&limit=50', {
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

  likeDislike(postId: any, userId: any) {
    let data = { userId: userId }
    return this._http.put(`http://localhost:3000/${postId}/like`, data, {
      headers: {
        Authorization: this.header
      }
    })
  }

  uploadPost(postObj: any) {
    return this._http.post('http://localhost:3000/uploadImage', postObj, {
      headers: {
        Authorization: this.header
      }
    })
  }

  postComment(postId: any, commentObj: any) {
    return this._http.put(`http://localhost:3000/${postId}/comment`, commentObj, {
      headers: {
        Authorization: this.header
      }
    })
  }

  changePassword(changePassObj: any, userId: any) {
    return this._http.put(`http://localhost:3000/changePassword/${userId}`, changePassObj, {
      headers: {
        Authorization: this.header
      }
    })
  }
}
