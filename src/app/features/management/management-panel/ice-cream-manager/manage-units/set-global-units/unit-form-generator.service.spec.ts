import { TestBed } from '@angular/core/testing';

import { UnitFormGeneratorService } from './unit-form-generator.service';

describe('UnitFormGeneratorService', () => {
  let service: UnitFormGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitFormGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
