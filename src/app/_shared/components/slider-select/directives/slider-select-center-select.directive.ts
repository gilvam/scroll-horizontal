import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[appSliderSelectCenterSelect]',
	standalone: true
})
export class SliderSelectCenterSelectDirective implements OnChanges {
	@Input('appSliderSelectCenterSelect') select = 0;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		this.click(changes);
	}

	get scrollableWidth(): number {
		return this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth;
	}

	click(changes: SimpleChanges): void {
		const { select } = changes;
		if (select.firstChange) {
			return;
		}

		const distance = this.select ? this.scrollableWidth : 0;
		this.scrollLeft(distance);
	}

	scrollLeft(distance = 0): void {
		const property = 'scrollLeft';
		const scrollLeft = Math.ceil(this.el.nativeElement.scrollLeft);

		if (this.select === 0 && scrollLeft) {
			this.renderer.setProperty(this.el.nativeElement, property, distance);
		}

		if (this.select === 1 && !scrollLeft) {
			this.renderer.setProperty(this.el.nativeElement, property, distance);
		}
	}
}
