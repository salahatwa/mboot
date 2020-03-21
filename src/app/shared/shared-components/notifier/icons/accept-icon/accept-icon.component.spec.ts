import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptIconComponent } from './accept-icon.component';

describe('AcceptIconComponent', () => {
  let component: AcceptIconComponent;
  let fixture: ComponentFixture<AcceptIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
