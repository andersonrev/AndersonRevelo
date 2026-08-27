import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductInterface } from '../../interfaces/product.interface';
import { Observable, map, shareReplay, tap } from 'rxjs';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';


type respProducto = { data: ProductInterface[] }

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {

  private productsStore = signal<ProductInterface[]>([]);

  private urlBackendProducts = environment.URL_BACKEND + '/bp/products';
  private http = inject(HttpClient)


  getProductsStore() {
    return this.productsStore();
  }

  removeProductoFromStore(id: string): void {
    this.productsStore.update((p) => p.filter(itemProd => itemProd.id !== id))
  }

  setProductsStore(products: ProductInterface[]){
    this.productsStore.set(products);
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<respProducto>(`${this.urlBackendProducts}`).pipe(
      map(
        (resp: respProducto) => resp.data
      ),
      tap((products) => this.productsStore.set(products)));
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
