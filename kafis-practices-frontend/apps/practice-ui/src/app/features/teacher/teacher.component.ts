import { Component, OnInit } from '@angular/core';

import { Teacher } from '@practice/interfaces';
import { TeacherService, StudentsService } from '@practice/common';
import { JWTService } from '@practice/feature-login';

@Component({
  selector: 'practice-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  public teacher: Teacher;
  public studentGradeLevels: {};

  constructor(private teacherService: TeacherService,
              private studentService: StudentsService,
              private jwtService: JWTService) { }

  public ngOnInit(): void {
    this.studentGradeLevels = this.studentService.getStudentGradeLevel();
    this.teacherService.getTeacherByUserId(this.jwtService.getUserId())
    .subscribe((teacher: Teacher) => {
      this.teacher = teacher;
    });
  }

}
