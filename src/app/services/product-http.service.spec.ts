import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';
import { ProductHttpService } from './product-http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProductHttpService', () => {
  let service: ProductHttpService;

  let httpMock: HttpTestingController;

  const mockedCreateProducto: ProductInterface = {
    id: "dos",
    name: "Nombre producto",
    description: "Descriocion",
    logo: "asdests.png",
    data_release: "2020-04-30T00:00:00.000",
    data_revision:"2020-04-30T00:00:00.000"

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

  xit('deberia ser llamada la funcion para traer los productos', () => {
    const respuestaTraer = spyOn(service, 'getProducts')

    expect(respuestaTraer).toHaveBeenCalled();


  });

  xit('deberia ser llamada la fucnion para editar un producto', () => {

  });

  xit('deberia ser llamada la fucnion para eliminar un producto', () => {

  });
});
