import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationGirisResponse } from '../../../projects/api-client-lib/src';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _currentUser: BehaviorSubject<AuthenticationGirisResponse | null> = new BehaviorSubject<AuthenticationGirisResponse | null>(null)

  constructor() { }

  // get currentUser() {
  //   return this._currentUser.subscribe(res => {

  //   })
  // }

  setUser(user: AuthenticationGirisResponse) {
    this._currentUser.next(user);
  }
}
