import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@practice/environment';
import { Teacher, User } from '@practice/interfaces';
import { convertToHttpParams } from '@practice/utils';

const teacherApiRequest = environment.API.teacher;

@Injectable()
export class TeacherService {

  constructor(
    private http: HttpClient) { }

  public getTeacherById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${teacherApiRequest}/${id}`, { withCredentials: true });
  }

  public getTeacherByUserId(userId: string): Observable<Teacher> {
    const params = convertToHttpParams({ userId });
    return this.http.get<Teacher>(`${teacherApiRequest}/ByUserId`, { withCredentials: true, params });
  }

  public getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${teacherApiRequest}`, { withCredentials: true });
  }

  public getTeachersWithCredentials(): Observable<User[]> {
    return this.http.get<User[]>(`${teacherApiRequest}/credentials`, { withCredentials: true });
  }

  public createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${teacherApiRequest}`, teacher, { withCredentials: true });
  }

  public updateTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${teacherApiRequest}`, teacher, { withCredentials: true });
  }

  public deleteTeacher(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${teacherApiRequest}/${id}`, { withCredentials: true });
  }
}
