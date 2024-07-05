import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductValidatorsService } from './product-validators.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';

describe('ProductValidatorsService', () => {
  let service: ProductValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideHttpClientTesting]
    });
    service = TestBed.inject(ProductValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if control value is falsy', (done) => {
    const control: AbstractControl = {} as AbstractControl;
    const obs$ = service.validate(control) as Observable<ValidationErrors | null>;
    obs$.subscribe((result: any) => {
      expect(result).toBeNull();
      done();
    });
  });

  it('should return { invalidId: true } if verificationId returns true', (done) => {
    const control: AbstractControl = { value: '123' } as AbstractControl;
    spyOn(service.productHttpService, 'verificationId').and.returnValue(of(true));

    const obs$ = service.validate(control) as Observable<ValidationErrors | null>;
    obs$.subscribe((result: any) => {
      expect(result).toEqual({ invalidId: true });
      done();
    });
  });
  it('should return null if verificationId throws an error', (done) => {
    const control: AbstractControl = { value: '123' } as AbstractControl;

    spyOn(service.productHttpService, 'verificationId').and.returnValue(throwError('error'));

    const obs$ = service.validate(control) as Observable<ValidationErrors | null>;
    obs$.subscribe((result: any) => {
      expect(result).toBeNull();
      done();
    });
  });
});
