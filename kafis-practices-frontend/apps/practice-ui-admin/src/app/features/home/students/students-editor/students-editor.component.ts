import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { produce } from 'immer';
import { isNil } from 'lodash-es'

import { Student, Teacher, Organization, UpdateStudentResult, AddStudentResult } from '@practice/interfaces';
import { StudentsService, TeacherService, OrganizationService } from '@practice/common';
import { GradeLevel } from '@practice/enums';

@Component({
  selector: 'practice-news-editor',
  templateUrl: './students-editor.component.html',
  styleUrls: ['./students-editor.component.scss']
})
export class StudentsEditorComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  public student: Student;
  public updatedStudent: Student;
  public studentGradeLevels: {};
  public teachers: Teacher[];
  public organizations: Organization[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService,
    private organizationService: OrganizationService,
    private teacherService: TeacherService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService
  ) { }

  public studentFormGroup = this.fb.group({
    fullName: ['', [Validators.required]],
    year: ['', [Validators.required]],
    gradeLevel: ['', [Validators.required]],
    specialty: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    groupCode: ['', [Validators.required]],
    grade: ['', [Validators.min(0), Validators.max(100)]],
    teacher: [''],
    organization: ['']
  }, { validators: this.ValidateIntegerGroups });

  public ValidateIntegerGroups(fb: FormGroup): void {
    var control = fb.get('grade');
    !Number.isInteger(+control.value) ? control.setErrors({ invalidType: true }) : null;
  }

  public isInvalid(id: string): boolean {
    return (this.studentFormGroup.get(id).touched && this.studentFormGroup.get(id).invalid);
  }

  public compareCategoryObjects(object1: any, object2: any): boolean {
    return object1 && object2 && object1.id == object2.id;
  }

  public getGradeLevels(): string[] {
    var keys = Object.keys(GradeLevel).map(key => GradeLevel[key]);
    return keys.slice(keys.length / 2);
  }

  public ngOnInit(): void {
    this.activatedRoute.parent.queryParamMap
      .pipe(takeUntil(this.destroy$), switchMap((params) => {
        const studentId = Number(params.get('studentId'));
        return studentId ? this.studentsService.getStudentById(studentId) : of(null);
      }))
      .subscribe((student: Student) => {
        this.teacherService.getTeachers().subscribe((teachers: Teacher[]) => {
          this.teachers = teachers;
        })
        this.organizationService.getOrganizations().subscribe((organizations: Organization[]) => {
          this.organizations = organizations;
        })
        this.student = student;
        this.studentGradeLevels = this.studentsService.getStudentGradeLevel();
        if (!this.student) { return; }
        this.studentFormGroup.patchValue({
          fullName: this.student.fullName,
          year: this.student.year,
          gradeLevel: this.student.gradeLevel,
          specialty: this.student.specialty,
          specialization: this.student.specialization,
          groupCode: this.student.groupCode,
          grade: this.student.grade,
          teacher: this.student.teacher,
          organization: this.student.organization,
        });
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(): void {
    if (!this.studentFormGroup.valid) { return; }
    this.updatedStudent = produce(this.student, () => {
      const teacher = this.studentFormGroup.get('teacher')?.value;
      const organization = this.studentFormGroup.get('organization')?.value;
      return {
        ...this.student,
        fullName: this.studentFormGroup.get('fullName').value,
        year: this.studentFormGroup.get('year').value,
        gradeLevel: this.studentFormGroup.get('gradeLevel').value,
        specialty: this.studentFormGroup.get('specialty').value,
        specialization: this.studentFormGroup.get('specialization').value,
        groupCode: this.studentFormGroup.get('groupCode').value,
        grade: this.studentFormGroup.get('grade')?.value,
        teacherId: !isNil(teacher) ? teacher.id : null,
        teacher: null,
        organizationId: !isNil(organization) ? organization.id : null,
        organization: null
      };
    });

    if (this.student) {
      this.studentsService.updateStudent(this.updatedStudent).subscribe((result: UpdateStudentResult) => {
        if (result.isSuccess) {
          this.toastr.success('', this.translateService.instant('NOTIFICATIONS.UPDATE_SUCCESS'));
          this.router.navigate(['/students']);
        }
        else {
          this.toastr.error(this.translateService.instant('NOTIFICATIONS.STUDENTS_OVERLOAD'),
          this.translateService.instant('NOTIFICATIONS.UPDATE_FAILED'));
        }
      });
    } else {
      this.studentsService.createStudent(this.updatedStudent).subscribe((result: AddStudentResult) => {
        if (result.isSuccess) {
          this.toastr.success('', this.translateService.instant('NOTIFICATIONS.CREATE_SUCCESS'));
          this.updatedStudent = null;
          this.studentFormGroup.controls['fullName'].setValue(null);
          window.scroll(0, 0);
        }
        else {
          this.toastr.error(this.translateService.instant('NOTIFICATIONS.STUDENTS_OVERLOAD'),
          this.translateService.instant('NOTIFICATIONS.CREATE_FAILED'));
        }
      });
    }
  }
}
