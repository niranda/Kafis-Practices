import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { environment } from '@practice/environment';
import { Student, User, UpdateStudentResult, AddStudentResult, SpecialtiesRequestParams } from '@practice/interfaces';
import { DegreeLevel, GradeLevel } from '@practice/enums';
import { convertToHttpParams } from '@practice/utils';

const studentApiRequest = environment.API.student;

@Injectable()
export class StudentsService {

  constructor(
    private http: HttpClient,
    private translate: TranslateService,) { }

  public getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${studentApiRequest}/${id}`, { withCredentials: true });
  }

  public getStudentByUserId(userId: string): Observable<Student> {
    const params = convertToHttpParams({ userId });
    return this.http.get<Student>(`${studentApiRequest}/ByUserId`, { withCredentials: true, params });
  }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${studentApiRequest}`, { withCredentials: true });
  }

  public getStudentsWithCredentials(): Observable<User[]> {
    return this.http.get<User[]>(`${studentApiRequest}/credentials`, { withCredentials: true });
  }

  public createStudent(student: Student): Observable<AddStudentResult> {
    return this.http.post<AddStudentResult>(`${studentApiRequest}`, student, { withCredentials: true });
  }

  public updateStudent(student: Student): Observable<UpdateStudentResult> {
    return this.http.put<UpdateStudentResult>(`${studentApiRequest}`, student, { withCredentials: true });
  }

  public updateStudentGrade(studentId: number, grade: number): Observable<Student> {
    const params = convertToHttpParams({ studentId, grade });
    return this.http.get<Student>(`${studentApiRequest}/grade`, { withCredentials: true, params });
  }

  public sendStudentReportFile(studentId: number, file: File): Observable<void> {
    const params = convertToHttpParams({ id: studentId });
    const options = {
      headers: new HttpHeaders().append('Content-Disposition', 'multipart/form-data'),
      withCredentials: true,
      params
    }
    const formData = new FormData();
    formData.append('File', file);
    return this.http.post<void>(`${studentApiRequest}/report`, formData, options);
  }

  public deleteStudent(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${studentApiRequest}/${id}`, { withCredentials: true });
  }

  public getStudentGradeLevel() {
    return {
      [GradeLevel.FirstFull]: this.translate.instant('STUDENTS.FIRST_FULL_GRADE'),
      [GradeLevel.FirstReduced]: this.translate.instant('STUDENTS.FIRST_REDUCED_GRADE'),
      [GradeLevel.Second]: this.translate.instant('STUDENTS.SECOND_GRADE')
    };
  }

  public getSpecialties(requestParams: SpecialtiesRequestParams): Observable<string[]> {
    return this.http.post<string[]>(`${studentApiRequest}/specialties`, requestParams, { withCredentials: true });
  }

  public getSpecialtiesByDegree(degreeLevel: DegreeLevel): Observable<string[]> {
    const params = convertToHttpParams({ degreeLevel })
    return this.http.post<string[]>(`${studentApiRequest}/specialtiesByDegree`, {}, { withCredentials: true, params });
  }
}
