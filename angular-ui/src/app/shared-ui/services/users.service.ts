import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = environment.baseUrl;
  users = 'users';
  constructor(private apiService: ApiService) { }

  public saveUserInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/saveUserInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public doSignIn(param: object): any {
    return this.apiService.post(`${this.users}/doSignIn`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public emailAlreadyExists(param: any): any {
    return this.apiService.post(`${this.users}/emailAlreadyExists`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public forgotPassword(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/forgotPassword`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public authentication(param?: object): Observable<any> {
    return this.apiService.post(`${this.users}/authentication`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public logout(param?: object): Observable<any> {
    return this.apiService.get(`${this.users}/logout`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public deleteUser(param: object): Observable<any> {
    return this.apiService.delete(`${this.users}/deleteUser`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getUsersList(): Observable<any> {
    return this.apiService.get(`${this.users}/getUsersList`).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public searchUserData(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/searchUserData`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getUserInfo(param: object): Observable<any> {
    return this.apiService.post(`${this.users}/getUserInfo`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
