import { TestBed } from '@angular/core/testing';

import { CopyLastOrderFormProcessorService } from './copy-last-order-form-processor.service';

describe('CopyLastOrderFormProcessorService', () => {
  let service: CopyLastOrderFormProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CopyLastOrderFormProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
