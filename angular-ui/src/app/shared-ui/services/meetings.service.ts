import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class MeetingsService {
  baseUrl: string = environment.baseUrl;
  meetings = 'meetings';
  constructor(private apiService: ApiService) { }

  public saveMeetings(param: object): Observable<any> {
    return this.apiService.post(`${this.meetings}/saveMeetings`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public acknowledgement(param: object): Observable<any> {
    return this.apiService.post(`${this.meetings}/acknowledgement`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }


  public emailAlreadyExists(param: any): any {
    return this.apiService.post(`${this.meetings}/emailAlreadyExists`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }



  public deleteUser(param: object): Observable<any> {
    return this.apiService.delete(`${this.meetings}/deleteUser`, param).pipe(
      map((data) => {
        return data;
      })
    );
  }

  public getmeetingsList(): Observable<any> {
    return this.apiService.get(`${this.meetings}/getmeetingsList`).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
