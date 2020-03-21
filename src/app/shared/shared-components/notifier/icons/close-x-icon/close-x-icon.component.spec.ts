import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseXIconComponent } from './close-x-icon.component';

describe('CloseXIconComponent', () => {
  let component: CloseXIconComponent;
  let fixture: ComponentFixture<CloseXIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseXIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseXIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
