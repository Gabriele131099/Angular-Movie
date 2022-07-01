import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCarousel } from './reviewCarousel.component';

describe('ReviewCarousel', () => {
  let component: ReviewCarousel;
  let fixture: ComponentFixture<ReviewCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCarousel ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
