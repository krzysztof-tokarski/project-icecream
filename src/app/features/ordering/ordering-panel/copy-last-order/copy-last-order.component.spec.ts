import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyLastOrderComponent } from './copy-last-order.component';

describe('CopyLastOrderComponent', () => {
  let component: CopyLastOrderComponent;
  let fixture: ComponentFixture<CopyLastOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyLastOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyLastOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
