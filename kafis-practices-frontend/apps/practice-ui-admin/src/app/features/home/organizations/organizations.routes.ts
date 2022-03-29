import { Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';

export const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    data: { state: 'organizations' }
  }
];
