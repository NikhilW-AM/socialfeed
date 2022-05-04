import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _userDetails = new Subject<Object>()
  editUser$ = this._userDetails.asObservable()
  constructor() { }

  sendUserDetails(userObj: any) {
    this._userDetails.next(userObj)
  }
}
