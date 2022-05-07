import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFromFavouritesComponent } from './order-from-favourites.component';

describe('OrderFromFavouritesComponent', () => {
  let component: OrderFromFavouritesComponent;
  let fixture: ComponentFixture<OrderFromFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFromFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFromFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
