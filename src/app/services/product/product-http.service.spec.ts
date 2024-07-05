import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductInterface } from '../../interfaces/product.interface';
import { ProductHttpService } from './product-http.service';

describe('ProductHttpService', () => {
  let service: ProductHttpService;


  let httpMock: HttpTestingController;

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

  xit('deberia ser llamada la fucnion para editar un producto', () => {

  });

  xit('deberia ser llamada la fucnion para eliminar un producto', () => {

  });
});
