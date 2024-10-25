import { AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NumberUtil } from '../../utils/number.util';
import { SliderSelectCenterDirective } from './directives/slider-select-center.directive';

@Component({
	selector: 'app-slider-select',
	standalone: true,
	imports: [SliderSelectCenterDirective],
	templateUrl: './slider-select.component.html',
	styleUrl: './slider-select.component.scss'
})
export class SliderSelectComponent implements AfterViewInit {
	@ViewChild('gallery', { static: true }) gallery!: ElementRef<HTMLDivElement>;
	images: string[] = [`https://picsum.photos/${401}/500`, `https://picsum.photos/${402}/500`];
	selected = 0;
	private style!: CSSStyleDeclaration;
	private width = 0;
	private scrollLeftPos = 0;
	private padding = 0;
	private gap = 0;

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngAfterViewInit(): void {
		this.getStyled();
	}

	private getStyled(): void {
		this.width = this.gallery.nativeElement.clientWidth;
		this.scrollLeftPos = this.gallery.nativeElement.scrollLeft;
		this.style = this.document.defaultView!.getComputedStyle(this.gallery.nativeElement);
		this.padding = NumberUtil.onlyNumber(this.style.paddingLeft);
		this.gap = NumberUtil.onlyNumber(this.style.gap);
	}

	select(item: number): void {
		this.selected = item;

		if (this.selected) {
			this.scrollLeft();
			return;
		}
		this.scrollRight();
	}

	scrollLeft(): void {
		let newScroll = this.scrollLeftPos - this.width + this.padding + this.gap * 4;
		if (newScroll < 0) {
			newScroll = this.gallery.nativeElement.scrollWidth - this.gallery.nativeElement.clientWidth;
		}
		this.gallery.nativeElement.scroll({ left: newScroll, behavior: 'smooth' });
	}

	scrollRight(): void {
		let newScroll = this.scrollLeftPos + this.width - this.padding - this.gap * 4;
		if (this.scrollLeftPos + this.width >= this.gallery.nativeElement.scrollWidth) {
			newScroll = 0;
		}
		this.gallery.nativeElement.scroll({ left: newScroll, behavior: 'smooth' });
	}

	private centerNearestImage(): void {
		const scrollLeft = this.gallery.nativeElement.scrollLeft;
		const itemWidth = this.width + this.gap;
		const nearestIndex = Math.round(scrollLeft / itemWidth);
		const nearestPosition = nearestIndex * itemWidth;

		console.log(`nearestPosition: `, nearestPosition);

		this.gallery.nativeElement.scrollTo({ left: nearestPosition, behavior: 'smooth' });
	}

	@HostListener('mouseup')
	@HostListener('touchend')
	@HostListener('touchcancel')
	onMouseUp(): void {
		this.centerNearestImage();
	}
}
