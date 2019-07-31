import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPsswordComponent } from './forgot-pssword.component';

describe('ForgotPsswordComponent', () => {
  let component: ForgotPsswordComponent;
  let fixture: ComponentFixture<ForgotPsswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPsswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPsswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
