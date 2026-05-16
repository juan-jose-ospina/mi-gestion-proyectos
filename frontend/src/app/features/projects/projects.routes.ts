import { Routes } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list';
import { ProjectFormComponent } from './project-form/project-form';
import { MyProjectsComponent } from './my-projects/my-projects';
import { adminGuard } from '../../core/guards/admin-guard';

export const PROJECTS_ROUTES: Routes = [
  { path: '', canActivate: [adminGuard], component: ProjectListComponent },
  { path: 'new', canActivate: [adminGuard], component: ProjectFormComponent },
  { path: 'edit/:id', canActivate: [adminGuard], component: ProjectFormComponent },
  { path: 'my', component: MyProjectsComponent },
];
