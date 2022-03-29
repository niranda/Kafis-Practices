import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';

import { StudentsService, TeacherService } from '@practice/common';
import { User } from '@practice/interfaces';
import { UserRoles } from '@practice/enums';

@Component({
  selector: 'practice-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  public users: User[];

  displayedColumns: string[] = ['fullName', 'userRole', 'userName', 'password'];
  dataSource: MatTableDataSource<User>;
  expandedElement: User | null;

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
              private teacherService: TeacherService,
              public translateService: TranslateService) {}

  public ngOnInit(): void {
    this.studentService.getStudentsWithCredentials().subscribe((users: User[]) => {
      users.forEach(u => u.userRole = UserRoles.Student)
      this.users = users;
      this.teacherService.getTeachersWithCredentials().subscribe((users: User[]) => {
        users.forEach(u => u.userRole = UserRoles.Teacher)
        this.users.unshift(...users);
        this.initDataSource();
      });
    });
  }

  public initDataSource(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sortData = (data: User[], sort: MatSort) => {
      this.expandedElement = null;
      return data.sort((a: User, b: User) => {
        if(sort.direction !== 'asc' && sort.direction !== 'desc') {
          return this.compareNumber(a.id, b.id, true);
        }
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'fullName': return this.compareString(a.fullName, b.fullName, isAsc);
          case 'userRole': return this.compareNumber(+Object.keys(a.userRole)[0], +Object.keys(b.userRole)[0], isAsc);
          default: return 0;
        }
      });
    };

    this.dataSource.filterPredicate = (data, filter)  => {
      return data.fullName.toLowerCase().includes(filter) ||
             data.specialty?.toLowerCase().includes(filter) && filter.length > 1 ||
             data.groupCode?.toLowerCase().startsWith(filter) ||
             this.translateService.instant(UserRoles[data.userRole]).toLowerCase().startsWith(filter);
    };
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
