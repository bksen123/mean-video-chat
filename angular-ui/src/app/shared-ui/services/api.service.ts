import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { JwtService } from '..';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiBase = environment.baseUrl;
  headers: any = {};
  constructor(private httpClient: HttpClient, private jwtService: JwtService) { }

  post(url: string, param?: any): Observable<any> {
    const apiURL = this.apiBase + url;
    // let headers = this.getHeader();
    return this.httpClient
      .post(apiURL, param, { withCredentials: true })
      .pipe(map((res) => res));
  }

  get(url: string): Observable<any> {
    const apiUrl = this.apiBase + url;
    // let headers = this.getHeader();
    return this.httpClient
      .get(apiUrl, { withCredentials: true })
      .pipe(map((res) => res));
  }

  delete(url: string, param?: any): Observable<any> {
    // let headers = this.getHeader();
    const apiURL = this.apiBase + url;
    return this.httpClient
      .post(apiURL, param, { withCredentials: true })
      .pipe(map((res) => res));
  }

  /*  getHeader() {
    return new HttpHeaders({
      authorization: this.jwtService.getToken()
        ? this.jwtService.getToken()
        : environment.cookieToken,
    });
  } */
}
