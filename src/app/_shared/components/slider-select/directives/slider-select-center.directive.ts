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
import { fromEvent, merge, retry, Subscription, switchMap, take, timer } from 'rxjs';

@Directive({
	selector: '[appSliderSelectCenter]',
	standalone: true
})
export class SliderSelectCenterDirective implements OnChanges, OnDestroy, AfterViewInit {
	@Input() select = 0;
	@Output() selectChange = new EventEmitter<number>();
	private elList: Element[] = Array.from(this.el.nativeElement.querySelectorAll('.gallery-item')) || [];
	private time = 500;
	private takeMax = 20;
	private timerSubscription!: Subscription;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit(): void {
		this.observeScroll();
	}

	ngOnChanges(changes: SimpleChanges): void {
		// this.observeClear();
	}

	ngOnDestroy(): void {
		this.observeClear();
	}

	private observeScroll(): void {
		const events$ = [fromEvent(this.el.nativeElement, 'touchend')];
		this.timerSubscription = merge(...events$)
			.pipe(
				switchMap(() => timer(0, this.time)),
				take(this.takeMax)
			)
			.subscribe(() => this.emitSelected());
	}

	private observeClear(): void {
		if (!this.timerSubscription) {
			return;
		}
		this.timerSubscription.unsubscribe();
	}

	private emitSelected(): void {
		console.log('emitSelected');
		this.selectChange.emit(this.choiceItem);
	}

	get choiceItem(): number {
		const widthPerImage = (this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth) / this.elList.length;
		const widthInTheMoment = this.el.nativeElement.scrollLeft;
		return widthPerImage < widthInTheMoment ? 1 : 0;
	}

	@HostListener('mouseup')
	@HostListener('touchend')
	@HostListener('touchcancel')
	forceListenerOnSafari(): void {
		this.observeScroll();
	}
}
