import { HttpClient, httpResource } from '@angular/common/http';
import { effect, inject, Injectable, signal} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductInterface } from '../../interfaces/product.interface';
import { Observable, shareReplay} from 'rxjs';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { ProductResponse } from '../../interfaces/response-products.interface';



@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {


  private urlBackendProducts = environment.URL_BACKEND + '/bp/products';
  private http = inject(HttpClient)

  private readonly productResource = httpResource<ProductResponse>(() => this.urlBackendProducts, { defaultValue: { data: [] }})

  private productsStore = signal<ProductInterface[]>([]);

  constructor() {
    effect(() => {
      const response = this.productResource.value() as ProductResponse;
      if (response && response.data) {
        this.productsStore.set(response.data)
      }
    })
  }

  getProductsStore() {
    return this.productsStore();
  }

  removeProductoFromStore(id: string): void {
    this.productsStore.update((p) => p.filter(itemProd => itemProd.id !== id))
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
