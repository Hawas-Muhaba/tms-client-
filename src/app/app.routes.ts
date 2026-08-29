import { Routes } from '@angular/router';

import { roleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard.component').then(
        (m) => m.InstructorDashboardComponent,
      ),
  },
  {
    path: 'student-dashboard',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent,
      ),
  },
  {
    path: 'courses/:id',
    loadComponent: () => import('./features/course-detail/course-detail').then(
      (m) => m.CourseDetailComponent,
    ),
  },
  {
    path: 'enroll',
    loadComponent: () => import('./features/enrollment-form/enrollment-form').then(
      (m) => m.EnrollmentFormComponent,
    ),
  },
  {
    path: 'enrollments',
    loadComponent: () => import('./features/enrollment-list/enrollment-list.component').then(
      (m) => m.EnrollmentListComponent,
    ),
  },
  {
    path: 'grade-submission',
    loadComponent: () => import('./features/grade-submission/grade-submission.component').then(
      (m) => m.GradeSubmissionComponent,
    ),
  },
  {
    path: 'admin/courses',
    loadComponent: () =>
      import('./features/instructor-dashboard/instructor-dashboard.component').then(
        (m) => m.InstructorDashboardComponent,
      ),
    canActivate: [roleGuard('Admin')],
  },
  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/student-dashboard/student-dashboard.component').then(
        (m) => m.StudentDashboardComponent,
      ),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
