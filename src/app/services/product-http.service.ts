import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductInterface } from '../interfaces/product.interface';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../interfaces/response-create-product.interface';


type respProducto = { data: ProductInterface[] }

@Injectable({
  providedIn: 'root'
})
export class ProductHttpService {


  private products = new BehaviorSubject<ProductInterface[]>([]);

  private productsStore: ProductInterface[] = [];

  private urlBackendProducts = environment.URL_BACKEND + '/bp/products';

  constructor(private http: HttpClient) {
  }

  get getProductsValue() {
    return this.products.asObservable();
  }

  get getProductsStore() {
    return this.productsStore;
  }

  storeProducts(products: ProductInterface[]) {
    this.productsStore = [...products];
  }

  set setProducts(products: ProductInterface[]) {
    this.products.next(products);
  }

  getProducts(): Observable<ProductInterface[]> {
    return this.http.get<respProducto>(`${this.urlBackendProducts}`).pipe(
      map(
        (resp: respProducto) => resp.data
      ),
      tap((products) => this.storeProducts(products))
    );
  }

  createProduct(newProduct: ProductInterface) {
    return this.http.post<ResponseCreateProductInterface>(`${this.urlBackendProducts}`, { ...newProduct, id: this.randomString(4) });
  }

  updateProduct(id: string, body: Omit<ProductInterface, 'id'>) {

    return this.http.put<ResponseUpdateProductInterface>(`${this.urlBackendProducts}/${id}`, body);
  }

  randomString(length: number) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

}
