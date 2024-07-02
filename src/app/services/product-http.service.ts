import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductInterface } from '../interfaces/product.interface';
import { Observable, map } from 'rxjs';


type respProducto = { data: ProductInterface[] }

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  private urlBackend = environment.URL_BACKEND;
  constructor(private http: HttpClient) {
  }
  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<respProducto>(`${this.urlBackend}/db/products`).pipe(
      map(
        (resp: respProducto) => resp.data
      ));
  }
}
