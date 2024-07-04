import { TestBed } from '@angular/core/testing';

import { ProductValidatorsService } from './product-validators.service';

describe('ProductValidatorsService', () => {
  let service: ProductValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
