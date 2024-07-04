import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductHttpService } from '../../../services/product/product-http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductValidatorsService implements AsyncValidator  {

  constructor(private productHttpService: ProductHttpService) { }

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.productHttpService.verificationId(control.value).pipe(
      map((existId)=> (existId? {invalidId: true} : null)),
      catchError(() => of(null))
    );
  }

}

