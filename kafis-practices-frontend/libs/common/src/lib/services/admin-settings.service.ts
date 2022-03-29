import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@practice/environment';
import { convertToHttpParams } from '@practice/utils';
import {
  AdminReportRequestParams,
  AdminReportResponse,
  PracticeDates,
  AttorneyResponse,
  AdminOrderResponse,
  AdminOrderRequestParams
} from '@practice/interfaces';

const practiceDatesApiRequest = environment.API.practiceDates;
const adminApiRequest = environment.API.admin;

@Injectable({
  providedIn: 'root'
})
export class AdminSettingsService {

  constructor(
    private http: HttpClient
  ) { }

  public getDates(): Observable<PracticeDates[]> {
    return this.http.get<PracticeDates[]>(`${practiceDatesApiRequest}`, { withCredentials: true });
  }

  public saveDates(dates: PracticeDates[]): Observable<void> {
    return this.http.put<void>(`${practiceDatesApiRequest}`, dates, { withCredentials: true });
  }

  public clearDataBase(): Observable<void> {
    return this.http.get<void>(`${adminApiRequest}/clearDB`, { withCredentials: true });
  }

  public getAttorney(): Observable<AttorneyResponse> {
    return this.http.get<AttorneyResponse>(`${adminApiRequest}/getAttorney`, { withCredentials: true });
  }

  public updateAttorney(newAttorney: string): Observable<void> {
    const params = convertToHttpParams({ newAttorney });
    return this.http.get<void>(`${adminApiRequest}/updateAttorney`, { params, withCredentials: true });
  }

  public getReportData(requestBody: AdminReportRequestParams): Observable<AdminReportResponse> {
    return this.http.post<AdminReportResponse>(`${adminApiRequest}/report`, requestBody, { withCredentials: true });
  }

  public getOrderData(requestBody: AdminOrderRequestParams): Observable<AdminOrderResponse[]> {
    return this.http.post<AdminOrderResponse[]>(`${adminApiRequest}/order`, requestBody, { withCredentials: true });
  }

}
