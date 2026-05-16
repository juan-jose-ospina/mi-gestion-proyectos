import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: 'users',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES),
  },
  {
    path: 'projects',
    canActivate: [authGuard],
    loadChildren: () => import('./features/projects/projects.routes').then(m => m.PROJECTS_ROUTES),
  },
  {
    path: 'assignments',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/assignments/assignments.routes').then(m => m.ASSIGNMENTS_ROUTES),
  },
  { path: '**', redirectTo: 'auth/login' },
];
