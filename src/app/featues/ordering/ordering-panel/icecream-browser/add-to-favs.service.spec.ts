import { TestBed } from '@angular/core/testing';

import { AddToFavsService } from '../../../../features/ordering/ordering-panel/icecream-browser/ice-cream-card/add-to-favs.service';

describe('AddToFavsService', () => {
  let service: AddToFavsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddToFavsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
