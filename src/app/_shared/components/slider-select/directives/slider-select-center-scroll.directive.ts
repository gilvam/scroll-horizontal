import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	Renderer2,
	SimpleChanges
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription, timer } from 'rxjs';

@Directive({
	selector: '[appSliderSelectCenterScroll]',
	standalone: true
})
export class SliderSelectCenterScrollDirective implements OnDestroy, AfterViewInit, OnChanges {
	@Input() appSliderSelectCenterScroll = 0;
	@Output() appSliderSelectCenterScrollChange = new EventEmitter<number>();
	private elListQuerySelector = 'img';
	private elList: Element[] = [];
	private time = 30;
	private timerSubscription!: Subscription;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit(): void {
		this.updateList();
		this.setPadding();
		this.onScroll();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.changeByButton(changes);
	}

	ngOnDestroy(): void {
		this.clear();
	}

	onScroll(): void {
		this.clear();
		this.timerSubscription = fromEvent(this.el.nativeElement, 'scroll')
			.pipe(debounceTime(this.time), distinctUntilChanged())
			.subscribe(() => this.emitSelected());
	}

	get scrollableWidth(): number {
		return this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth;
	}

	get choiceItem(): number {
		const widthPerImage = this.scrollableWidth / this.elList.length;
		const widthInTheMoment = this.el.nativeElement.scrollLeft;
		return widthPerImage < widthInTheMoment ? 1 : 0;
	}

	emitSelected(): void {
		this.appSliderSelectCenterScrollChange.emit(this.choiceItem);
	}

	updateList(): void {
		this.elList = Array.from(this.el.nativeElement.querySelectorAll(this.elListQuerySelector)) || [];
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this.setPadding();
	}

	setPadding(): void {
		this.renderer.setStyle(this.el.nativeElement, 'padding', `0`);
		this.renderer.setStyle(this.el.nativeElement, 'gap', `0`);

		timer(this.time).subscribe(() => {
			const firstImage = this.elList[0];
			const screenWidth = this.el.nativeElement.closest('body').clientWidth;
			const padding = (screenWidth - firstImage.scrollWidth) / 2;
			const gap = screenWidth - (padding + firstImage.scrollWidth) - 40;

			this.renderer.setStyle(this.el.nativeElement, 'padding', `0 ${padding}px`);
			this.renderer.setStyle(this.el.nativeElement, 'gap', `${gap}px`);
		});
	}

	clear(): void {
		if (!this.timerSubscription) {
			return;
		}
		this.timerSubscription.unsubscribe();
	}

	changeByButton(changes: SimpleChanges): void {
		const { select } = changes;
		if (select?.firstChange) {
			return;
		}

		const distance = this.appSliderSelectCenterScroll ? this.scrollableWidth : 0;
		this.setScrollLeft(distance);
	}

	setScrollLeft(distance = 0): void {
		const property = 'scrollLeft';
		const scrollLeft = Math.ceil(this.el.nativeElement.scrollLeft);

		if (this.appSliderSelectCenterScroll === 0 && scrollLeft) {
			this.renderer.setProperty(this.el.nativeElement, property, distance);
		}

		if (this.appSliderSelectCenterScroll === 1 && !scrollLeft) {
			this.renderer.setProperty(this.el.nativeElement, property, distance);
		}
	}
}
