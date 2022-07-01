import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUserdataComponent } from './insert-userdata.component';

describe('InsertUserdataComponent', () => {
  let component: InsertUserdataComponent;
  let fixture: ComponentFixture<InsertUserdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertUserdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertUserdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
