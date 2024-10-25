import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { SidenavService } from '../../services/sidenav.service';
import { ActivatedRoute } from '@angular/router';

describe('SidenavComponent', () => {
	let component: SidenavComponent;
	let fixture: ComponentFixture<SidenavComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [BrowserAnimationsModule, BrowserDynamicTestingModule, SidenavComponent],
			providers: [
				SidenavService,
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							data: {}
						}
					}
				}
			]
		}).compileComponents();

		fixture = TestBed.createComponent(SidenavComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
