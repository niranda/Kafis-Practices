import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { StudentsService } from '@practice/common';
import { Student } from '@practice/interfaces';
import { DeleteConfirmationDialogComponent } from '@practice/ui/components/dialogs';
import { EntityTypes } from '@practice/enums';

@Component({
  selector: 'practice-students-table',
  styleUrls: ['./students-table.component.scss'],
  templateUrl: './students-table.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px'})),
        state('expanded', style({ height: '*' })),
        transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]})
export class StudentsTable implements OnInit {
  private readonly translateDeleted = this.translateService.instant('NOTIFICATIONS.DELETE_SUCCESS');
  private readonly translateDeleteFailed = this.translateService.instant('NOTIFICATIONS.DELETE_FAILED');

  public studentGradeLevels: {};
  public students: Student[];

  displayedColumns: string[] = ['fullName', 'year', 'teacher.fullName', 'organization.name', 'grade'];
  dataSource: MatTableDataSource<Student>;
  expandedElement: Student | null;

  @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    if(this.dataSource) {
      this.dataSource.paginator = value;
      this.dataSource.paginator._intl.itemsPerPageLabel = '';
      this.dataSource.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        return `${page+1} / ${Math.ceil(length / pageSize)}`;
      };
    }
  }
  @ViewChild(MatSort, {static: false}) set sort(value: MatSort) {
    if(this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  constructor(private studentService: StudentsService,
              public translateService: TranslateService,
              private toastrService: ToastrService,
              private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.studentGradeLevels = this.studentService.getStudentGradeLevel();
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.students = students;
      this.initDataSource();
    });
  }

  public initDataSource(): void {
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch(property) {
        case 'teacher.fullName': return item.teacher.fullName;
        case 'organization.name': return item.organization.name;
        default: return item[property];
      }
    };
    this.dataSource.sortData = (data: Student[], sort: MatSort) => {
      this.expandedElement = null;
      return data.sort((a: Student, b: Student) => {
        if(sort.direction !== 'asc' && sort.direction !== 'desc') {
          return this.compareNumber(a.id, b.id, true);
        }
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'fullName': return this.compareString(a.fullName, b.fullName, isAsc);
          case 'year': return this.compareNumber(a.year, b.year, isAsc);
          case 'teacher.fullName': return this.compareString(a.teacher?.fullName, b.teacher?.fullName, isAsc);
          case 'organization.name': return this.compareString(a.organization?.name, b.organization?.name, isAsc);
          case 'grade': return this.compareNumber(a.grade, b.grade, isAsc);
          default: return 0;
        }
      });
    };

    this.dataSource.filterPredicate = (data, filter)  => {
      return data.fullName.toLowerCase().includes(filter) ||
        data.specialty.toLowerCase().includes(filter) && filter.length > 1 ||
        this.studentGradeLevels[data.gradeLevel].toLowerCase().includes(filter) && filter.length > 1 ||
        data.groupCode.toLowerCase().startsWith(filter) ||
        data.year === +filter ||
        data.organization?.name.toLowerCase().includes(filter) ||
        data.teacher?.fullName.toLowerCase().includes(filter);
    };
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onDelete(student: Student): void {
    const index = this.dataSource.filteredData.indexOf(student)
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {data: {entityType : EntityTypes.Student}});

    dialogRef.afterClosed().subscribe(isDeleteButtonClicked => {
      if (isDeleteButtonClicked) {
        this.studentService.deleteStudent(student.id).subscribe((isDeleteSuccessful: boolean) => {
          if (isDeleteSuccessful) {
            this.toastrService.success('', this.translateDeleted);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
          else {
            this.toastrService.error('', this.translateDeleteFailed);
          }
        });
      }
    });

  }

  private compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private compareString(a: string, b: string, isAsc: boolean) {
    if(!a && b) {
      return 1 * (isAsc ? 1 : -1);
    }
    else if(a && !b) {
      return -1 * (isAsc ? 1 : -1);
    }
    return a.localeCompare(b, 'uk') * (isAsc ? 1 : -1);
  }
}
