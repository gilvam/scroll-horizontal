import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { NumberUtil } from '../../utils/number.util';
import { DOCUMENT } from '@angular/common';

@Component({
	selector: 'app-image-gallery',
	standalone: true,
	imports: [],
	templateUrl: './image-gallery.component.html',
	styleUrl: './image-gallery.component.scss'
})
export class ImageGalleryComponent {
	@ViewChild('gallery', { static: true }) gallery!: ElementRef<HTMLDivElement>;

	images = Array.from({ length: 30 }, (_, i) => `https://picsum.photos/${400 + i}/500`);

	private style!: CSSStyleDeclaration;
	private width = 0;
	private scrollLeftPos = 0;
	private padding = 0;
	private gap = 0;

	constructor(@Inject(DOCUMENT) private document: Document) {}

	getStyle(): void {
		this.width = this.gallery.nativeElement.clientWidth;
		this.scrollLeftPos = this.gallery.nativeElement.scrollLeft;
		this.style = this.document.defaultView!.getComputedStyle(this.gallery.nativeElement);
		this.padding = NumberUtil.onlyNumber(this.style.paddingLeft);
		this.gap = NumberUtil.onlyNumber(this.style.gap);
	}

	scrollLeft() {
		this.getStyle();

		let newScroll = this.scrollLeftPos - this.width + this.padding + this.gap * 4;
		if (newScroll < 0) {
			newScroll = this.gallery.nativeElement.scrollWidth - this.gallery.nativeElement.clientWidth;
		}

		this.gallery.nativeElement.scroll({ left: newScroll, behavior: 'smooth' });
	}

	scrollRight() {
		this.getStyle();

		let newScroll = this.scrollLeftPos + this.width - this.padding - this.gap * 4;
		if (this.scrollLeftPos + this.width >= this.gallery.nativeElement.scrollWidth) {
			newScroll = 0;
		}

		this.gallery.nativeElement.scroll({ left: newScroll, behavior: 'smooth' });
	}
}
