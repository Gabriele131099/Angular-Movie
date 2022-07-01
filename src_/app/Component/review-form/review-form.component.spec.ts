import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewForm } from './review-form.component';

describe('CardComponent', () => {
  let component: ReviewForm;
  let fixture: ComponentFixture<ReviewForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewForm ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
