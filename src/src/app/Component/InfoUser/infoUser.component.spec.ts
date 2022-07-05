import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUser } from './infoUser.component';

describe('infoUser', () => {
  let component: InfoUser;
  let fixture: ComponentFixture<InfoUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoUser ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
