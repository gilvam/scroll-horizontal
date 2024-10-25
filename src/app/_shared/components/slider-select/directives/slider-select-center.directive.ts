import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appSliderSelectCenter]',
	standalone: true
})
export class SliderSelectCenterDirective implements AfterViewInit {
	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit(): void {
		const list: HTMLCollection = this.el.nativeElement.children;
		console.log(`el: `, list);
		console.log(`el: `, this.el.nativeElement);

		// this.renderer.setStyle(this.el.nativeElement, 'left', `${this.el.nativeElement.clientWidth / 2}px`);
	}
}
