import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@practice/environment';
import { Organization } from '@practice/interfaces';
import { RunRequestParams } from '../models/run-request-model';

const organizationApiRequest = environment.API.organization;

@Injectable()
export class OrganizationService {
  runRequestParams: RunRequestParams = new RunRequestParams();
  ngOnInit() {
    this.runRequestParams.startDate = parseInt(
      localStorage.getItem('startDate')
    );
    this.runRequestParams.endDate = parseInt(localStorage.getItem('endDate'));
    this.runRequestParams.gradeLevel = parseInt(
      localStorage.getItem('gradeLevel')
    );
  }

  constructor(private http: HttpClient) {}

  public getOrganizationById(id: number): Observable<Organization> {
    return this.http.get<Organization>(`${organizationApiRequest}/${id}`, {
      withCredentials: true,
    });
  }

  public getOrganizations(): Observable<Organization[]> {
    return this.http.post<Organization[]>(`${organizationApiRequest}/all`,
    this.runRequestParams,
    {
      withCredentials: true,
    });
  }

  public createOrganization(
    organization: Organization
  ): Observable<Organization> {
    return this.http.post<Organization>(
      `${organizationApiRequest}`,
      organization,
      { withCredentials: true }
    );
  }

  public updateOrganization(
    organization: Organization
  ): Observable<Organization> {
    return this.http.put<Organization>(
      `${organizationApiRequest}`,
      organization,
      { withCredentials: true }
    );
  }

  public deleteOrganization(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${organizationApiRequest}/${id}`, {
      withCredentials: true,
    });
  }
}
