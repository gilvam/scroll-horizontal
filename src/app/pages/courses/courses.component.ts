import { Component } from '@angular/core';
import { BodyComponent } from '../../core/components/body/body.component';

@Component({
	selector: 'app-courses',
	standalone: true,
	imports: [BodyComponent],
	templateUrl: './courses.component.html',
	styleUrl: './courses.component.scss'
})
export class CoursesComponent {}
