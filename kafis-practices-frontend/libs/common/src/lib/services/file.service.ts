import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@practice/environment';
import { convertToHttpParams } from '@practice/utils';

const fileApiRequest = environment.API.file;

@Injectable()
export class FileService {

  constructor(
    private http: HttpClient
  ) { }

  public getReportFile(fileName: string): Observable<any> {
    const params = convertToHttpParams({ fileName });
    return this.http.get<any>(`${fileApiRequest}`, { responseType: 'arraybuffer' as 'json',  params, withCredentials: true });
  }
}
