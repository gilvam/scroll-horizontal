import { Component } from '@angular/core';
import { SliderSelectCenterScrollDirective } from './directives/slider-select-center-scroll.directive';

@Component({
	selector: 'app-slider-select',
	standalone: true,
	imports: [SliderSelectCenterScrollDirective],
	templateUrl: './slider-select.component.html',
	styleUrl: './slider-select.component.scss'
})
export class SliderSelectComponent {
	images: string[] = [
		// `https://picsum.photos/400/500`,
		'https://fastly.picsum.photos/id/794/401/500.jpg?hmac=Oy1UuAwEqLCdqzWJ7Ui4EwhcVFwP0_bBQTtVAnUGRX4',
		'https://fastly.picsum.photos/id/323/400/500.jpg?hmac=OwqqXxIyaOWAYJHtJKMMganeCNN6Oj9ydMV3NVq1Ot0'
	];
	selected = 0;

	select(item: number): void {
		this.selected = item;
	}
}
