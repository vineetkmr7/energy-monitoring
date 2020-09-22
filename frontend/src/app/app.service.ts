import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { BaseResponse } from '../app/models/response.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  user: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private token: string;
  private baseUrl: string = "http://localhost:3000";
  constructor(private _http: HttpClient) { }
  login(email, password) {
    return this._http.post(this.baseUrl + '/users/login', {
      email,
      password
    }).pipe(
      tap((response: BaseResponse) => {
        console.log("response in tap", response);
        if (response.code == 200) {
          const user = { token: response.response.token, ...response.response.user };
          this.token = user.token;
          this.user.next(user);
        }
      })
    );
  }
  logout() {
    return this._http.post(this.baseUrl + '/users/logout', {}, {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  getAllDevices() {
    return this._http.get(this.baseUrl + '/devices', {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }

  getPowerStats() {
    return this._http.get(this.baseUrl + '/energy/stats', {
      headers: {
        Authorization: 'Bearer ' + this.token
      }
    });
  }
}
