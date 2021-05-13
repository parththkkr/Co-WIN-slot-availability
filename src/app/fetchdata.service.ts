import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private http: HttpClient) {

   }
  getData(params: HttpParams) {
    let _url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin";

    return this.http.get(_url, { params });

  }


}
