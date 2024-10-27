import {
	AfterViewInit,
	Directive,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnDestroy,
	Output,
	Renderer2,
	SimpleChanges
} from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription } from 'rxjs';

@Directive({
	selector: '[appSliderSelectCenter]',
	standalone: true
})
export class SliderSelectCenterDirective implements OnChanges, OnDestroy, AfterViewInit {
	@Input() select = 0;
	@Output() selectChange = new EventEmitter<number>();
	private elList: Element[] = [];
	private time = 20;
	private timerSubscription!: Subscription;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {}

	ngAfterViewInit(): void {
		this.elList = Array.from(this.el.nativeElement.querySelectorAll('.gallery-item'));
		this.observeScroll();
	}

	ngOnChanges(changes: SimpleChanges): void {
		this.clear();
		this.observeScroll();
	}

	ngOnDestroy(): void {
		this.clear();
	}

	private observeScroll(): void {
		this.clear();
		this.timerSubscription = fromEvent(this.el.nativeElement, 'scroll')
			.pipe(debounceTime(this.time), distinctUntilChanged())
			.subscribe(() => this.emitSelected());
	}

	private clear(): void {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
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
}
