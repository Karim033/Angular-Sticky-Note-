import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "https://routeegypt.herokuapp.com/";
  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    if (localStorage.getItem("userToken")) {
      this.saveCurrentUser();
    }
  }

  register(data: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signup', data)
  }

  login(data: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + "signin", data)
  }

  saveCurrentUser() {
    let token: any = JSON.stringify(localStorage.getItem("userToken"));
    let decoded: any = jwtDecode(token);
    this.currentUser.next(decoded);
  }

  logOut() {
    localStorage.removeItem("userToken");
    this.currentUser.next(null);
    this._Router.navigate(['/login']);
  }
}
