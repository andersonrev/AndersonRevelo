import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductValidatorsService } from './product-validators.service';

describe('ProductValidatorsService', () => {
  let service: ProductValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[provideHttpClientTesting]
    });
    service = TestBed.inject(ProductValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
