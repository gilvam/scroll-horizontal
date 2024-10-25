import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appImageLoading]',
	standalone: true
})
export class ImageLoadingDirective {
	@HostBinding('class.loading') isLoading = true;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {
		this.renderer.addClass(this.el.nativeElement, 'loading');
	}

	@HostListener('load', ['$event.target'])
	onLoad(target: HTMLImageElement) {
		if (target.complete) {
			this.isLoading = false;
			this.renderer.removeClass(this.el.nativeElement, 'loading');
		}
	}
}
