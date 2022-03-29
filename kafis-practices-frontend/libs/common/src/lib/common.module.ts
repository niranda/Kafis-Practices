import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsService } from './services/students.service';
import { FileService } from './services/file.service';
import { TeacherService } from './services/teacher.service';
import { OrganizationService } from './services/organization.service';

@NgModule({
  imports: [CommonModule],
})
export class CommonServiceModule {
  static forRoot(): ModuleWithProviders<CommonServiceModule> {
    return {
      ngModule: CommonServiceModule,
      providers: [
        StudentsService,
        FileService,
        TeacherService,
        OrganizationService
      ]
    };
  }
}
