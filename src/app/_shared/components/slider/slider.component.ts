import { AfterViewInit, Component, ElementRef, HostListener, Inject, Input, signal, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NumberUtil } from '../../utils/number.util';
import { HomeCourse } from '../../../pages/home/models/home-course.model';

@Component({
	selector: 'app-slider',
	standalone: true,
	templateUrl: './slider.component.html',
	imports: [MatCardModule, MatButtonModule, MatIcon],
	styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
	@ViewChild('slider') slider!: ElementRef;
	@Input() homeCourse = new HomeCourse('', []);
	private cardWidth = 0;
	private gap = 0;
	private elItems?: HTMLCollectionOf<HTMLElement>;
	isScreenLessThanCards = signal(false);

	constructor(@Inject(DOCUMENT) private document: Document) {}

	ngAfterViewInit(): void {
		this.calculateDimensions();
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this.calculateDimensions();
	}

	private calculateDimensions() {
		this.elItems = this.slider.nativeElement.children;
		if (!this.elItems?.length) {
			return;
		}

		const elItemFirst = this.elItems[0];
		this.cardWidth = elItemFirst.offsetWidth || 0;

		const countCards = this.homeCourse.items.length;
		const windowWidth = NumberUtil.onlyNumber(this.document.defaultView?.window.innerWidth);
		this.gap = NumberUtil.onlyNumber(this.document.defaultView?.getComputedStyle(this.slider.nativeElement).gap);
		const marginLeft = NumberUtil.onlyNumber(this.document.defaultView?.getComputedStyle(elItemFirst).marginLeft);
		const gapTotal = this.gap ? this.gap * (countCards - 1) : 0;
		const totalItemsWidth = gapTotal + marginLeft * 2 + countCards * this.cardWidth;

		if (windowWidth > totalItemsWidth) {
			this.isScreenLessThanCards.set(true);
			return;
		}
		this.isScreenLessThanCards.set(false);
	}

	scrollPrev(): void {
		this.slider.nativeElement.scrollLeft -= this.cardWidth + this.gap;
	}

	scrollNext(): void {
		const maxScrollLeft = this.slider.nativeElement.scrollWidth - this.slider.nativeElement.clientWidth;
		if (this.slider.nativeElement.scrollLeft < maxScrollLeft) {
			this.slider.nativeElement.scrollLeft += this.cardWidth + this.gap;
		}
	}
}
