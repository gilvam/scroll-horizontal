import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSelectComponent } from './slider-select.component';

describe('SliderSelectComponent', () => {
  let component: SliderSelectComponent;
  let fixture: ComponentFixture<SliderSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
