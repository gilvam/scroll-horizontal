import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ImageLoadingDirective } from './image-loading.directive';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
	template: '<div><img class="image" [src]="img" alt="" appImageLoading /></div>'
})
class TestComponent {
	img = `./assets/images/${environment.type}/header-logo.png`;
}

describe('ImageLoadingDirective', () => {
	let directive: ImageLoadingDirective;
	let fixture: ComponentFixture<TestComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ImageLoadingDirective],
			declarations: [TestComponent]
		});
		fixture = TestBed.createComponent(TestComponent);
		fixture.detectChanges();
		const directiveDebugElement = fixture.debugElement.query(By.directive(ImageLoadingDirective));
		directive = directiveDebugElement.injector.get(ImageLoadingDirective);
	});

	it('should create an instance', () => {
		expect(directive).toBeTruthy();
	});

	it('should remove the "loading" class from the element when the image is loaded', () => {
		const imageElement = fixture.debugElement.query(By.css('div')).nativeElement;
		imageElement.complete = true;
		imageElement.dispatchEvent(new Event('load'));
		fixture.detectChanges();
		expect(imageElement.classList).not.toContain('loading');
	});
});
