import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExample } from './dialog.component';

describe('dialog', () => {
  let component: DialogExample;
  let fixture: ComponentFixture<DialogExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExample ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
