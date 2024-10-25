import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const PAGE_ROUTES: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'cursos', loadComponent: () => import('./courses/courses.component').then((m) => m.CoursesComponent) }
];
