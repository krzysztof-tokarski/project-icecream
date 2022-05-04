import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IcecreamBrowserComponent } from './icecream-browser.component';

describe('IcecreamBrowserComponent', () => {
  let component: IcecreamBrowserComponent;
  let fixture: ComponentFixture<IcecreamBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IcecreamBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IcecreamBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
