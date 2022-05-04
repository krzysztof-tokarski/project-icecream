import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteIceCreamListComponent } from './favourite-ice-cream-list.component';

describe('FavouriteIceCreamListComponent', () => {
  let component: FavouriteIceCreamListComponent;
  let fixture: ComponentFixture<FavouriteIceCreamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteIceCreamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteIceCreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
