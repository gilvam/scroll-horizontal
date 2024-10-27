import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription } from 'rxjs';

@Directive({
	selector: '[appSliderSelectCenterScroll]',
	standalone: true
})
export class SliderSelectCenterScrollDirective implements OnDestroy, AfterViewInit {
	@Input() appSliderSelectCenterScroll = 0;
	@Output() appSliderSelectCenterScrollChange = new EventEmitter<number>();
	private elListQuerySelector = '.gallery-item';
	private elList: Element[] = [];
	private time = 30;
	private timerSubscription!: Subscription;

	constructor(private el: ElementRef) {}

	ngAfterViewInit(): void {
		this.updateList();
		this.onScroll();
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

	clear(): void {
		if (!this.timerSubscription) {
			return;
		}
		this.timerSubscription.unsubscribe();
	}
}
