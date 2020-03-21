import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailIconComponent } from './fail-icon.component';

describe('FailIconComponent', () => {
  let component: FailIconComponent;
  let fixture: ComponentFixture<FailIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
