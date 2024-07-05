import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductInterface } from '../../interfaces/product.interface';
import { BehaviorSubject, Observable, map, shareReplay, tap } from 'rxjs';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';


type respProducto = { data: ProductInterface[] }

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  private productsStore: ProductInterface[] = [];

  private urlBackendProducts = environment.URL_BACKEND + '/bp/products';

  constructor(private http: HttpClient) {
  }

  getProductsStore() {
    return this.productsStore;
  }

  removeProductoFromStore(id: string): void {
    this.productsStore = this.productsStore.filter(itemProd => itemProd.id !== id)
  }

  setProductsStore(products: ProductInterface[]){
    this.productsStore = products;
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<respProducto>(`${this.urlBackendProducts}`).pipe(
      map(
        (resp: respProducto) => resp.data
      ),
      tap((products) => this.productsStore = products));
  }

  createProduct(newProduct: ProductInterface) {
    return this.http.post<ResponseCreateProductInterface>(`${this.urlBackendProducts}`, newProduct).pipe(shareReplay());
  }

  updateProduct(id: string, body: Omit<ProductInterface, 'id'>) {

    return this.http.put<ResponseUpdateProductInterface>(`${this.urlBackendProducts}/${id}`, body);
  }

  verificationId(id: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.urlBackendProducts}/verification/${id}`);
  }

  deleteProduct(id: string) {
    return this.http.delete<ResponseUpdateProductInterface>(`${this.urlBackendProducts}/${id}`);
  }

}
