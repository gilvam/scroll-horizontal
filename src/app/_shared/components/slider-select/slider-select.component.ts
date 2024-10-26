import { Component, ElementRef, ViewChild } from '@angular/core';
import { SliderSelectCenterDirective } from './directives/slider-select-center.directive';

@Component({
	selector: 'app-slider-select',
	standalone: true,
	imports: [SliderSelectCenterDirective],
	templateUrl: './slider-select.component.html',
	styleUrl: './slider-select.component.scss'
})
export class SliderSelectComponent {
	@ViewChild('gallery', { static: true }) gallery!: ElementRef<HTMLDivElement>;
	// `https://picsum.photos/400/500`,
	images: string[] = [
		'https://fastly.picsum.photos/id/794/401/500.jpg?hmac=Oy1UuAwEqLCdqzWJ7Ui4EwhcVFwP0_bBQTtVAnUGRX4',
		'https://fastly.picsum.photos/id/323/400/500.jpg?hmac=OwqqXxIyaOWAYJHtJKMMganeCNN6Oj9ydMV3NVq1Ot0'
	];
	selected = 0;

	constructor() {}

	select(item: number): void {
		this.selected = item;
	}
}
