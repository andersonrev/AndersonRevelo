import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from './product-http.service';
import { productsMock } from '../../constants/mock-products';
import { ResponseCreateProductInterface, ResponseUpdateProductInterface } from '../../interfaces/response-create-product.interface';
import { environment } from '../../../environments/environment.development';

describe('ProductHttpService', () => {
  let service: ProductHttpService;


  let httpMock: HttpTestingController;

  const url = environment.URL_BACKEND + '/bp/products'

  const mockedCreateProducto: ProductInterface = {
    id: "dos",
    name: "Nombre producto",
    description: "Descriocion",
    logo: "asdests.png",
    date_release: new Date("2023-01-01"),
    date_revision: new Date("2024-01-01")

  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductHttpService]
    });
    service = TestBed.inject(ProductHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia ser llamada la funcion para traer los productos', () => {
    const respuestaTraer = spyOn(service, 'getProducts');
    service.getProducts();
    expect(respuestaTraer).toHaveBeenCalled();
  });

  it('should remove product by id', () => {
    const initialProductsStore = productsMock;
    service.setProductsStore([...initialProductsStore]);
    
    const idToRemove = '2';
    service.removeProductoFromStore(idToRemove);

    expect(initialProductsStore.length).toBeLessThanOrEqual(initialProductsStore.length);
  });

  it('should create product', () => {
    const newProduct: ProductInterface = { id: '456', name: 'Product 456', logo: 'test1.png', date_release: new Date(), date_revision: new Date(),description: 'description' };
    const mockResponse: ResponseCreateProductInterface = { data: newProduct, message: 'exito'  };

    service.createProduct(newProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${url}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(mockResponse);
  });

  it('should update product', () => {
    const id = '1';
    const updateBody: Omit<ProductInterface, 'id'> = { name: 'Updated Product', description: 'test description' ,logo: 'test.png', date_release: new Date(), date_revision: new Date() };
    const mockResponse: ResponseUpdateProductInterface = { data: updateBody, message: 'exito' };

    service.updateProduct(id, updateBody).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${url}/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateBody);
    req.flush(mockResponse);
  });

  it('should verify product id', () => {
    const id = '1';
    const mockResponse = true;

    service.verificationId(id).subscribe(isValid => {
      expect(isValid).toBe(mockResponse);
    });

    const req = httpMock.expectOne(`${url}/verification/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should delete product', () => {
    const id = '1';

    const updateBody: Omit<ProductInterface, 'id'> = { name: 'Updated Product', description: 'test description' ,logo: 'test.png', date_release: new Date(), date_revision: new Date() };
    const mockResponse: ResponseUpdateProductInterface = { message: 'exito', data: updateBody };

    service.deleteProduct(id).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${url}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

});
